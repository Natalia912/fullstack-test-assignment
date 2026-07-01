from typing import Optional, Literal
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud, schemas, models
from ..database import get_db
from ..auth import require_admin

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.post("", response_model=schemas.TicketOut, status_code=201)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.create_ticket(db, ticket)


@router.get("", response_model=schemas.TicketListOut)
def list_tickets(
    status: Optional[models.StatusEnum] = None,
    priority: Optional[models.PriorityEnum] = None,
    search: Optional[str] = None,
    sort_by: Literal["created_at", "priority"] = "created_at",
    order: Literal["asc", "desc"] = "desc",
    page: int = 1,
    page_size: int = 20,
    db: Session = Depends(get_db),
):
    items, total = crud.list_tickets(
        db, status, priority, search, sort_by, order, page, page_size
    )
    return {"items": items, "total": total, "page": page, "page_size": page_size}

@router.get("/{ticket_id}", response_model=schemas.TicketOut)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = crud.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    return ticket


@router.patch("/{ticket_id}", response_model=schemas.TicketOut)
def update_ticket(ticket_id: str, updates: schemas.TicketUpdate, db: Session = Depends(get_db)):
    try:
        return crud.update_ticket(db, ticket_id, updates)
    except ValueError:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    except PermissionError:
        raise HTTPException(status_code=409, detail="Заявка в статусе done недоступна для редактирования")


@router.patch("/{ticket_id}/status", response_model=schemas.TicketOut)
def update_status(ticket_id: str, body: schemas.TicketStatusUpdate, db: Session = Depends(get_db)):
    try:
        return crud.update_ticket_status(db, ticket_id, body.status)
    except ValueError:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    except PermissionError:
        raise HTTPException(status_code=409, detail="Заявка в статусе done не может менять статус")


@router.delete("/{ticket_id}", status_code=204)
def delete_ticket(
    ticket_id: str,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),   # <-- blocks non-admins
):
    try:
        crud.delete_ticket(db, ticket_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    except PermissionError:
        raise HTTPException(status_code=409, detail="Заявка в статусе done недоступна для удаления")