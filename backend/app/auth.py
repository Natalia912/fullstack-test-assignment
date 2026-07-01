import secrets
from fastapi import Header, HTTPException

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin"

active_tokens: set[str] = set()


def login(username: str, password: str) -> str:
    if username != ADMIN_USERNAME or password != ADMIN_PASSWORD:
        raise ValueError("INVALID_CREDENTIALS")
    token = secrets.token_hex(16)
    active_tokens.add(token)
    return token


def require_admin(authorization: str = Header(None)):
    """
    Dependency: expects header  Authorization: Bearer <token>
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Требуется авторизация администратора")

    token = authorization.removeprefix("Bearer ")
    if token not in active_tokens:
        raise HTTPException(status_code=401, detail="Неверный или истёкший токен")