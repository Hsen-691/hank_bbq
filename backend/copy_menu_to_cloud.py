"""Copy the menu from your local database to the cloud (Neon) database.

Copies branches, categories, items, their branch links and photo links.
Users, carts and orders are NOT copied. The cloud menu is replaced.

The photo files themselves are in img/uploads/ (committed to git), so they are
already deployed with the site; only the links are copied here.

Run from the backend/ folder:
    python copy_menu_to_cloud.py "postgresql://...neon.tech/neondb?sslmode=require"

The local database is read from DATABASE_URL in backend/.env (or your
hanks-secrets file), not from the $env:DATABASE_URL variable.
"""
import sys

from sqlalchemy import create_engine, delete, func, insert, select

from app.config import ENV_FILE
from app.database import Base
from app import models  # noqa: F401  (registers the tables)

MENU_TABLES = ["branches", "categories", "category_branches", "products", "product_branches"]


def sqlalchemy_url(url: str) -> str:
    url = url.strip().strip('"').strip("'")
    if url.startswith("postgres://"):
        return "postgresql+psycopg2://" + url[len("postgres://"):]
    return url


def local_url() -> str:
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        if line.strip().startswith("DATABASE_URL="):
            return sqlalchemy_url(line.split("=", 1)[1])
    sys.exit(f"No DATABASE_URL in {ENV_FILE}")


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src_url, dst_url = local_url(), sqlalchemy_url(sys.argv[1])
    if src_url == dst_url:
        sys.exit("Source and target are the same database.")

    tables = {t.name: t for t in Base.metadata.sorted_tables}
    src, dst = create_engine(src_url), create_engine(dst_url)

    with src.connect() as s:
        rows = {name: [dict(r._mapping) for r in s.execute(select(tables[name]))] for name in MENU_TABLES}

    with dst.begin() as d:
        used = d.scalar(select(func.count()).select_from(tables["order_items"])) + d.scalar(
            select(func.count()).select_from(tables["cart_items"])
        )
        if used:
            sys.exit("The cloud database already has orders or cart items; not replacing its menu.")
        for name in reversed(MENU_TABLES):
            d.execute(delete(tables[name]))
        for name in MENU_TABLES:
            if rows[name]:
                d.execute(insert(tables[name]), rows[name])

    for name in MENU_TABLES:
        print(f"  {name}: {len(rows[name])} rows")
    print("Menu copied to the cloud database.")


if __name__ == "__main__":
    main()
