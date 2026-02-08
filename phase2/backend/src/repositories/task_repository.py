from sqlalchemy.orm import Session
from models.task import TaskDB, TaskCreate, TaskUpdate
from typing import List


def get_task(db: Session, task_id: int):
    return db.query(TaskDB).filter(TaskDB.id == task_id).first()


def get_tasks(db: Session, skip: int = 0, limit: int = 100, user_id: int = None):
    query = db.query(TaskDB)
    if user_id:
        query = query.filter(TaskDB.user_id == user_id)
    return query.offset(skip).limit(limit).all()


def create_task(db: Session, task: TaskCreate):
    db_task = TaskDB(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: int, task_update: TaskUpdate):
    db_task = db.query(TaskDB).filter(TaskDB.id == task_id).first()
    if db_task:
        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_task, field, value)
        db.commit()
        db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    db_task = db.query(TaskDB).filter(TaskDB.id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task