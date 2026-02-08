from sqlalchemy.orm import Session
from auth.models import UserDB, UserCreate, UserUpdate
from auth.auth_handler import get_password_hash
from typing import List, Optional


def get_user_by_username(db: Session, username: str):
    return db.query(UserDB).filter(UserDB.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(UserDB).filter(UserDB.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserDB).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = UserDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user_update: UserUpdate):
    db_user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if db_user:
        update_data = user_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_user, field, value)
        db.commit()
        db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user


def deactivate_user(db: Session, user_id: int):
    db_user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if db_user:
        db_user.is_active = False
        db.commit()
        db.refresh(db_user)
    return db_user