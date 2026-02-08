from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from models.task import Task, TaskCreate, TaskUpdate
from database import get_db
from auth.auth_handler import get_current_active_user
from auth.models import User
from repositories.task_repository import get_task, get_tasks, create_task, update_task, delete_task

router = APIRouter()


@router.post("/tasks", response_model=Task)
async def create_task_endpoint(
    task: TaskCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Add the current user's ID to the task
    task_with_user = task.model_copy()
    task_with_user.user_id = current_user.id
    db_task = create_task(db, task_with_user)
    return db_task


@router.get("/tasks", response_model=List[Task])
async def get_tasks_endpoint(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Only return tasks for the current user
    tasks = get_tasks(db, skip=skip, limit=limit, user_id=current_user.id)
    return tasks


@router.get("/tasks/{task_id}", response_model=Task)
async def get_task_endpoint(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    task = get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Check if the task belongs to the current user
    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")
    return task


@router.put("/tasks/{task_id}", response_model=Task)
async def update_task_endpoint(
    task_id: int, 
    task_update: TaskUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    task = get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Check if the task belongs to the current user
    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    updated_task = update_task(db, task_id, task_update)
    return updated_task


@router.delete("/tasks/{task_id}")
async def delete_task_endpoint(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    task = get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Check if the task belongs to the current user
    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")
    
    delete_task(db, task_id)
    return {"message": "Task deleted successfully"}