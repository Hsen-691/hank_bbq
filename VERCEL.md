# Free deploy: Vercel (website + API) + Neon (Postgres)

Everything here uses free plans:
- **Vercel Hobby**: hosts the site and the FastAPI backend (`index.py` is the entrypoint).
- **Neon free**: the Postgres database (0.5 GB). You add it from inside Vercel.
- **Vercel Blob free**: stores product photos uploaded from the admin page.

> Vercel's Hobby plan is meant for non-commercial use. For a real restaurant taking
> orders, Vercel may ask you to move to Pro later. Neon's free plan has no such rule.

## 1. Push the code to GitHub
Push this repo (`main` branch) to https://github.com/Hsen-691/Hanks_BBQ.
`.env` files are in `.gitignore`, so no secrets go up.

## 2. Create the Vercel project
1. Sign in at https://vercel.com with GitHub.
2. **Add New → Project**, import `Hanks_BBQ`.
3. Framework preset: **FastAPI** (or "Other"). Leave build settings empty. Don't deploy yet.

## 3. Add the database (Neon)
1. In the project: **Storage → Create Database → Neon (Serverless Postgres)** → free plan.
2. Connect it to the project. Vercel adds `DATABASE_URL` (and others) to the env vars.
   `DATABASE_URL` is Neon's **pooled** URL (host has `-pooler`), which is what the app needs.

## 4. Add photo storage (Blob)
**Storage → Create → Blob**, connect it. Vercel adds `BLOB_READ_WRITE_TOKEN`.

## 5. Add the other env vars
**Settings → Environment Variables**:

| Name | Value |
|---|---|
| `JWT_SECRET` | output of `python -c "import secrets; print(secrets.token_urlsafe(48))"` |
| `DOCS_ENABLED` | `false` |

Leave `CORS_ORIGINS` unset. Then **Deployments → Redeploy**.

## 6. Create the tables (run once, from your PC)
Copy Neon's **direct** (non-pooled) connection string: Vercel → Storage → your Neon DB →
`DATABASE_URL_UNPOOLED`. Then in PowerShell, from the `backend` folder:

```powershell
$env:DATABASE_URL = "postgresql://...neon.tech/neondb?sslmode=require"
$env:JWT_SECRET = "<the same JWT_SECRET as on Vercel>"
python -m pip install -r requirements.txt
python -m alembic upgrade head
python seed.py            # loads the menu (only on a fresh database)
python create_admin.py --name "Owner" --phone 70XXXXXX
```

Run these again (`alembic upgrade head`) whenever you add a migration.

## 7. Check it
- `https://<your-project>.vercel.app/health` → `{"status":"ok"}`
- Open the site, log in to `/admin.html` with the admin you created.

## Limits to know
- Each request can be at most 4.5 MB (photos are capped at 4 MB).
- Neon free pauses the DB when idle; the first request after a pause takes a second or two.
- Photos already in `img/uploads/` (committed to git) are deployed with the site.
  New photos uploaded on Vercel go to Blob.
- `seed.py` wipes and refills the menu. Run it only once, on the empty database.
