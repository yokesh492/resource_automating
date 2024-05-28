from sqlalchemy.orm import Session
from .models import User, Resource
from .schemas import ResourceCreate
from .auth import get_password_hash

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user):
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_resource(db: Session, resource: ResourceCreate, user_id: int):
    db_resource = Resource(**resource, user_id=user_id)
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

def get_user_resources(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(Resource).offset(skip).limit(limit).all()

def get_resources_by_team(db: Session, team_name: str):
    return db.query(Resource).filter(Resource.team == team_name).all()

def get_resources_by_categories(db: Session, categories: list):
    return db.query(Resource).filter(Resource.category.in_(categories)).all()

def get_resources_by_types(db: Session, types: list):
    return db.query(Resource).filter(Resource.type.in_(types)).all()

def get_resources_by_tags(db: Session, tags: list):
    return db.query(Resource).filter(Resource.tags.any(tags)).all()