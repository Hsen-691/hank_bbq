"""Vercel entrypoint. Vercel looks for a FastAPI `app` in index.py at the project root."""
from backend.app.main import app  # noqa: F401
