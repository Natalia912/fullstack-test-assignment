from fastapi import APIRouter, HTTPException
from .. import schemas, auth

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=schemas.LoginResponse)
def login(body: schemas.LoginRequest):
    try:
        token = auth.login(body.username, body.password)
    except ValueError:
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")
    return {"token": token}