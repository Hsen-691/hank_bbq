"""Database engine, session factory, and the declarative Base."""
import os
from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import NullPool

from .config import settings

if os.environ.get("VERCEL"):
    # Serverless: each function instance is short-lived, so don't hold a pool open.
    # Use the database's *pooled* connection string (Neon: host with "-pooler").
    engine = create_engine(settings.database_url, poolclass=NullPool, future=True)
else:
    engine = create_engine(settings.database_url, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


class Base(DeclarativeBase):
    pass


def get_db() -> Iterator[Session]:
    """FastAPI dependency: one database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
