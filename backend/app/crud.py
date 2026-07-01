import uuid
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from sqlalchemy import or_, case

from . import models, schemas

PRIORITY_ORDER = {
    models.PriorityEnum.low: 1,
    models.PriorityEnum.normal: 2,
    models.PriorityEnum.high: 3,
}


def create_ticket(db: Session, ticket: schemas.TicketCreate) -> models.Ticket:
    db_ticket = models.Ticket(
        id=str(uuid.uuid4()),
        title=ticket.title,
        description=ticket.description,
        priority=ticket.priority,
        status=models.StatusEnum.new,
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def get_ticket(db: Session, ticket_id: str) -> models.Ticket | None:
    return db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()

def list_tickets(
    db: Session,
    status: models.StatusEnum | None = None,
    priority: models.PriorityEnum | None = None,
    search: str | None = None,
    sort_by: str = "created_at",
    order: str = "desc",
    page: int = 1,
    page_size: int = 20,
):
    query = db.query(models.Ticket)

    if status:
        query = query.filter(models.Ticket.status == status)
    if priority:
        query = query.filter(models.Ticket.priority == priority)
    if search:
        like = f"%{search}%"
        query = query.filter(
            or_(models.Ticket.title.ilike(like), models.Ticket.description.ilike(like))
        )

    total = query.count()

    if sort_by == "priority":
        sort_column = case(
            {p.value: rank for p, rank in PRIORITY_ORDER.items()},
            value=models.Ticket.priority,
        )
    else:
        sort_column = models.Ticket.created_at

    query = query.order_by(sort_column.desc() if order == "desc" else sort_column.asc())

    items = query.offset((page - 1) * page_size).limit(page_size).all()
    return items, total

def update_ticket_status(
    db: Session, ticket_id: str, new_status: models.StatusEnum
) -> models.Ticket:
    ticket = get_ticket(db, ticket_id)
    if not ticket:
        raise ValueError("NOT_FOUND")

    if ticket.status == models.StatusEnum.done:
        raise PermissionError("LOCKED")  # done tickets can't change status at all

    ticket.status = new_status
    db.commit()
    db.refresh(ticket)
    return ticket


def update_ticket(
    db: Session, ticket_id: str, updates: schemas.TicketUpdate
) -> models.Ticket:
    ticket = get_ticket(db, ticket_id)
    if not ticket:
        raise ValueError("NOT_FOUND")

    if ticket.status == models.StatusEnum.done:
        raise PermissionError("LOCKED")

    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(ticket, field, value)

    db.commit()
    db.refresh(ticket)
    return ticket


def delete_ticket(db: Session, ticket_id: str) -> None:
    ticket = get_ticket(db, ticket_id)
    if not ticket:
        raise ValueError("NOT_FOUND")

    if ticket.status == models.StatusEnum.done:
        raise PermissionError("LOCKED")

    db.delete(ticket)
    db.commit()