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
    user = db.query(User).filter(User.id == user_id).one()
    added_by_username = user.username
    db_resource = Resource(**resource, user_id=user_id, addedBy=added_by_username)
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

def get_resources(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Resource).offset(skip).limit(limit).all()

def get_resources_by_team(db: Session, team_name: str):
    try:
        resources = db.query(Resource).filter(Resource.team == team_name).all()
        if not resources:
            raise Exception("No resources")
        return resources
    except Exception as e:
        return "NO resource"

def get_resources_by_categories(db: Session, categories: list):
    try:
        resources =db.query(Resource).filter(Resource.category.in_(categories)).all()
        if not resources:
            raise Exception("No resources")
        return resources
    except Exception as e:
        return "NO resource"

def get_resources_by_types(db: Session, types: list):
    try:
        resources = db.query(Resource).filter(Resource.type.in_(types)).all()
        if not resources:
            raise Exception("No resources")
        return resources
    except Exception as e:
        return "NO resource"

def get_resources_by_tags(db: Session, tags: list):
    try:
        resources = db.query(Resource).filter(Resource.tags.any(tags)).all()
        if not resources:
            raise Exception("No resources")
        return resources
    except Exception as e:
        return "NO resource"
    
def read_resource_by_filter(db: Session, tags: list, categories: str, types: str, team: str = None):
    if team is not None:
        try:
            resource = db.query(Resource).filter(Resource.tags.any(tags), Resource.category == categories, Resource.type == types).all()
            if not resource:
                return "No resource"
            return resource
        except Exception as e:
            return "No resource"
    else:
        try:
            resource = db.query(Resource).filter(Resource.tags.any(tags), Resource.category == categories, Resource.type == types, Resource.team == team).all()
            if not resource:
                return "No resource"
            return resource
        except Exception as e:
            return "No resource"
        
def delete_resource(db: Session, resource_id: int):
    db_resource = db.query(Resource).filter(Resource.id == resource_id).one_or_none()
    if db_resource:
        db.delete(db_resource)
        db.commit()
        return True
    else:
        return False
    
def edit_resource(db: Session,  updated_resource: ResourceUpdate):
    resource = db.query(Resource).filter(Resource.id == updated_resource.id).one_or_none()
    if resource:
        resource.asset_name = updated_resource.asset_name
        resource.category = updated_resource.category
        resource.type = updated_resource.type
        resource.tags = updated_resource.tags
        resource.team = updated_resource.team
        resource.description = updated_resource.description
        db.commit()
        db.refersh(resource)
        return resource
    

