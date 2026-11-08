"""Hank's BBQ API. Serves the JSON API and the static website.

SECURITY: only an explicit allow-list of website files is public -- the HTML pages
and the css/, js/ and img/ folders. Everything else in the project folder (.env,
backups, backend source, venv, .DS_Store ...) returns 404.
"""
import base64
import hashlib
import re
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from .config import settings
from .ratelimit import limiter
from .routers import (
    admin,
    admin_branches,
    admin_catalog,
    admin_uploads,
    admin_users,
    auth,
    cart,
    catalog,
    guest,
    orders,
)

# The UI folder is the project root that holds index.html, two levels up from this file:
#   <root>/backend/app/main.py  ->  <root>
UI_DIR = Path(__file__).resolve().parents[2]

MAX_BODY_BYTES = 4_500_000  # 4 MB image + multipart overhead; also Vercel's hard request limit

docs_on = settings.docs_enabled
app = FastAPI(
    title="Hank's BBQ API",
    docs_url="/docs" if docs_on else None,
    redoc_url=None,
    openapi_url="/openapi.json" if docs_on else None,
)

# ---------------------------------------------------------------- rate limiting
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def _rate_limited(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many attempts. Please wait a moment and try again."},
    )


app.add_middleware(SlowAPIMiddleware)

# ------------------------------------------------------------------------ CORS
# Same-origin only unless CORS_ORIGINS lists real sites ("*" cannot even load).
if settings.cors_origin_list:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
        allow_headers=["Authorization", "Content-Type"],
    )

# ----------------------------------------------------------- security headers
_BASE_CSP = (
    "default-src 'self'; "
    "img-src 'self' data: blob: https:; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; "
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; "
    "connect-src 'self'; "
    "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
)
_STATIC_PREFIXES = ("/css/", "/js/", "/img/", "/audio/")


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    h = response.headers
    h.setdefault("Content-Security-Policy", _BASE_CSP + "; script-src 'self'")
    h["X-Content-Type-Options"] = "nosniff"
    h["X-Frame-Options"] = "DENY"
    h["Referrer-Policy"] = "strict-origin-when-cross-origin"
    h["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=()"
    if request.url.scheme == "https":
        h["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    path = request.url.path
    if path.startswith(_STATIC_PREFIXES):
        # Make browsers always revalidate JS/CSS so an edit is never served stale.
        if path.endswith((".js", ".css")):
            h["Cache-Control"] = "no-cache, must-revalidate"
        elif response.status_code == 200:
            if path.startswith("/img/uploads/"):
                # Uploaded photos get a new random name each time, so they never change.
                h["Cache-Control"] = "public, max-age=31536000, s-maxage=31536000, immutable"
            else:
                # Logo, hero, sounds: phones keep them a day; Vercel's CDN keeps them
                # until the next deploy (a deploy clears the CDN cache).
                h["Cache-Control"] = "public, max-age=86400, s-maxage=31536000"
    elif path in _PAGES:
        h["Cache-Control"] = "no-cache, must-revalidate"
    else:
        h["Cache-Control"] = "no-store"  # API responses: never cached
    return response


class BodyLimitMiddleware:
    """Reject request bodies over MAX_BODY_BYTES (by Content-Length, and by
    counting bytes for chunked uploads) before they are written anywhere."""

    def __init__(self, app, max_bytes: int):
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)

        started = False

        async def tracking_send(message):
            nonlocal started
            if message["type"] == "http.response.start":
                started = True
            await send(message)

        async def too_large():
            if not started:
                await JSONResponse(
                    {"detail": "That request is too large."}, status_code=413
                )(scope, receive, tracking_send)

        for name, value in scope.get("headers", []):
            if name == b"content-length":
                try:
                    if int(value) > self.max_bytes:
                        return await too_large()
                except ValueError:
                    return await JSONResponse({"detail": "Bad request."}, status_code=400)(
                        scope, receive, send
                    )

        received = 0

        async def limited_receive():
            nonlocal received
            message = await receive()
            if message["type"] == "http.request":
                received += len(message.get("body", b""))
                if received > self.max_bytes:
                    raise _BodyTooLarge()
            return message

        try:
            await self.app(scope, limited_receive, tracking_send)
        except _BodyTooLarge:
            await too_large()


class _BodyTooLarge(Exception):
    pass


app.add_middleware(BodyLimitMiddleware, max_bytes=MAX_BODY_BYTES)

# ---- JSON API (registered before the static routes so these paths win) ----
app.include_router(auth.router)
app.include_router(catalog.router)
app.include_router(cart.router)
app.include_router(guest.router)
app.include_router(orders.router)
app.include_router(admin.router)
app.include_router(admin_catalog.router)
app.include_router(admin_users.router)
app.include_router(admin_uploads.router)
app.include_router(admin_branches.router)


@app.get("/health", tags=["meta"])
def health() -> dict:
    return {"status": "ok"}


# ------------------------------------------------------------- the website
# Only these pages are public. Add a new page here if you create one.
_PAGES = {
    "/": "index.html",
    "/index.html": "index.html",
    "/admin.html": "admin.html",
    "/privacy.html": "privacy.html",
    "/terms.html": "terms.html",
    "/reset.html": "reset.html",
}
_INLINE_SCRIPT = re.compile(r"<script(?![^>]*\bsrc\s*=)[^>]*>(.*?)</script>", re.S | re.I)


def _page_response(name: str) -> HTMLResponse:
    """Serve one HTML page with a CSP that allows only our own scripts plus the
    page's own inline <script> blocks (allowed by hash, so injected scripts fail)."""
    text = (UI_DIR / name).read_text(encoding="utf-8")
    hashes = {
        "'sha256-" + base64.b64encode(hashlib.sha256(m.encode("utf-8")).digest()).decode() + "'"
        for m in _INLINE_SCRIPT.findall(text)
        if m.strip()
    }
    csp = _BASE_CSP + "; script-src 'self' " + " ".join(sorted(hashes))
    return HTMLResponse(text, headers={"Content-Security-Policy": csp.strip()})


def _register_page(url: str, name: str) -> None:
    app.add_api_route(
        url, lambda: _page_response(name), methods=["GET"], include_in_schema=False
    )


for _url, _name in _PAGES.items():
    _register_page(_url, _name)


class SafeStaticFiles(StaticFiles):
    """StaticFiles that only serves normal website assets: no dotfiles (.DS_Store,
    .env ...) and only known file extensions."""

    _ALLOWED = {
        ".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg",
        ".ico", ".woff", ".woff2", ".ttf", ".mp4", ".webm", ".mp3",
    }

    async def get_response(self, path, scope):
        parts = Path(path).parts
        if any(p.startswith(".") or p == ".." for p in parts) or Path(path).suffix.lower() not in self._ALLOWED:
            raise HTTPException(status_code=404)
        return await super().get_response(path, scope)


for _d in ("css", "js", "img", "audio"):
    (UI_DIR / _d).mkdir(exist_ok=True)
    app.mount("/" + _d, SafeStaticFiles(directory=str(UI_DIR / _d)), name="site-" + _d)
