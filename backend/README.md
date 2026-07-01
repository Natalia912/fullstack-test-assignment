# Ticket Tracker — Backend

FastAPI + SQLite backend for internal ticket tracking.

## Stack

- Python 3.x + FastAPI
- SQLAlchemy ORM
- SQLite (file-based, created automatically on first run)

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
Interactive API docs (Swagger UI): `http://127.0.0.1:8000/docs`

The SQLite database file (`tickets.db`) is created automatically on first run in the `backend/` folder.

## Admin credentials

Delete operations require admin authentication:

- **Username:** `admin`
- **Password:** `admin`
