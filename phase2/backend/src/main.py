from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks
from auth.routes import router as auth_router
from database import engine
from models.task import TaskDB
from auth.models import UserDB

# Create database tables
TaskDB.metadata.create_all(bind=engine)
UserDB.metadata.create_all(bind=engine)

app = FastAPI(
    title="Todo API",
    description="A simple todo application API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}