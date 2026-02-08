# Phase 2: Todo App with Frontend and Backend

This phase implements a full-stack todo application with a Next.js frontend and a FastAPI backend connected to a Neon PostgreSQL database.

## Project Structure

```
phase2/
├── backend/
│   ├── src/
│   │   ├── main.py          # FastAPI application entry point
│   │   ├── database.py      # Database configuration
│   │   ├── models/          # SQLAlchemy models
│   │   ├── routes/          # API routes
│   │   ├── repositories/    # Database operations
│   │   └── services/        # Business logic
│   ├── requirements.txt     # Python dependencies
│   ├── alembic.ini         # Alembic configuration
│   ├── alembic/            # Migration scripts
│   └── .env               # Environment variables
└── frontend/
    ├── src/
    │   ├── app/            # Next.js app directory
    │   ├── components/     # React components
    │   └── services/       # API service
    ├── package.json        # Node.js dependencies
    └── ...
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd phase2/backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up your Neon database credentials in the `.env` file:
```env
NEON_DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```

4. Run the application:
```bash
uvicorn src.main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd phase2/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/{id}` - Get a specific task
- `PUT /api/v1/tasks/{id}` - Update a specific task
- `DELETE /api/v1/tasks/{id}` - Delete a specific task
- `GET /health` - Health check endpoint

## Database Migrations

To run database migrations:

```bash
cd phase2/backend
alembic upgrade head
```

To create a new migration:

```bash
alembic revision --autogenerate -m "Description of migration"
```

## Features

- Full CRUD operations for tasks
- Responsive UI with Next.js
- FastAPI backend with automatic API documentation
- PostgreSQL database with Neon
- Real-time synchronization between frontend and backend