import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Text, DateTime, Enum as SAEnum
from .database import Base


class StatusEnum(str, enum.Enum):
    new = "new"
    in_progress = "in_progress"
    done = "done"


class PriorityEnum(str, enum.Enum):
    low = "low"
    normal = "normal"
    high = "high"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(120), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(SAEnum(StatusEnum), nullable=False, default=StatusEnum.new)
    priority = Column(SAEnum(PriorityEnum), nullable=False, default=PriorityEnum.normal)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                         onupdate=lambda: datetime.now(timezone.utc))