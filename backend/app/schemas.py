from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

from .models import StatusEnum, PriorityEnum


class TicketCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=120)
    description: Optional[str] = Field(None, max_length=1000)
    priority: PriorityEnum = PriorityEnum.normal


class TicketUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=120)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Optional[PriorityEnum] = None


class TicketStatusUpdate(BaseModel):
    status: StatusEnum


class TicketOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    status: StatusEnum
    priority: PriorityEnum
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TicketListOut(BaseModel):
    items: list[TicketOut]
    total: int
    page: int
    page_size: int

class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str