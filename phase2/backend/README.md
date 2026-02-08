# TodoAI Backend

This is the backend for the TodoAI application, built with FastAPI and PostgreSQL. It provides a secure API for managing tasks with user authentication and authorization.

## Features

- **User Authentication**: JWT-based authentication with secure token handling
- **User Registration**: Secure registration with password hashing
- **Task Management**: Full CRUD operations for tasks with user-specific access
- **Role-Based Access Control**: Ensures users can only access their own tasks
- **RESTful API**: Well-designed endpoints following REST principles
- **Database Integration**: PostgreSQL with SQLAlchemy ORM
- **Security**: Password hashing, input validation, and protection against common vulnerabilities

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/token` - Login and get access token
- `GET /api/v1/auth/users/me` - Get current user's information
- `GET /api/v1/auth/users/me/tasks` - Get current user's tasks

### Task Management
- `POST /api/v1/tasks` - Create a new task (requires authentication)
- `GET /api/v1/tasks` - Get all tasks for the current user (requires authentication)
- `GET /api/v1/tasks/{id}` - Get a specific task (requires authentication and ownership)
- `PUT /api/v1/tasks/{id}` - Update a specific task (requires authentication and ownership)
- `DELETE /api/v1/tasks/{id}` - Delete a specific task (requires authentication and ownership)

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.13+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Environment Management**: python-dotenv
- **Database Migrations**: Alembic

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Role-based access control (users can only access their own tasks)
- Input validation using Pydantic models
- Protection against SQL injection through ORM usage

## Environment Variables

Create a `.env` file in the backend root with the following variables:

```env
SECRET_KEY=your-super-secret-key-change-in-production
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
```

## Setup

1. Install dependencies: `pip install -r requirements.txt`
2. Set environment variables in `.env` file
3. Run database migrations: `alembic upgrade head`
4. Start the server: `uvicorn src.main:app --reload --port 8000`

## Database Migrations

To create a new migration:
```bash
alembic revision --autogenerate -m "Description of migration"
```

To apply migrations:
```bash
alembic upgrade head
```

## API Documentation

The API includes automatic interactive documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Authentication Flow

1. Register a new user via `/api/v1/auth/register`
2. Login via `/api/v1/auth/token` to get an access token
3. Include the token in the Authorization header for protected endpoints: `Authorization: Bearer <token>`

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Deployment

The application is ready for deployment to cloud platforms like Heroku, AWS, or Google Cloud Platform.