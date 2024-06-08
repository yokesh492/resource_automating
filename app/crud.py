from sqlalchemy.orm import Session
from .models import User, Resource
from .schemas import ResourceCreate, ResourceUpdate
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
            #raise Exception("No resources")
            return "NO resource"
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
    
def read_resource_by_filter(db: Session, tags: list = None, categories: str = None, types: str = None, team: str = None):
    try:
        query = db.query(Resource)
        if categories:
            query = query.filter(Resource.category == categories)
        if types:
            query = query.filter(Resource.type == types)
        if tags:
            query = query.filter(Resource.tags.op('&&')(tags))
        if team:
            query = query.filter(Resource.team == team)
        
        results = query.all()  
        return results if results else []
    except Exception as e:
        print(f"An error occurred: {e}")
        return [] 
    
        
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
        resource.type = updated_resource.types
        resource.tags = updated_resource.tags
        resource.team = updated_resource.teams
        resource.description = updated_resource.description
        db.commit()
        db.refresh(resource)
        return resource
    

#Refactorization for crud applications
# from fastapi import HTTPException, status
# from sqlalchemy.orm import Session
# from .models import User, Resource
# from .schemas import ResourceCreate, ResourceUpdate
# from .auth import get_password_hash

# def get_user_by_username(db: Session, username: str):
#     user = db.query(User).filter(User.username == username).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# def create_user(db: Session, user):
#     hashed_password = get_password_hash(user.password)
#     db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# def create_resource(db: Session, resource_data: ResourceCreate, user_id: int):
#     user = get_user_by_username(db, resource_data.username)  # Assuming username is part of ResourceCreate
#     db_resource = Resource(**resource_data.dict(), user_id=user_id, addedBy=user.username)
#     db.add(db_resource)
#     db.commit()
#     db.refresh(db_resource)
#     return db_resource

# def get_resources(db: Session, skip: int = 0, limit: int = 100):
#     resources = db.query(Resource).offset(skip).limit(limit).all()
#     if not resources:
#         raise HTTPException(status_code=404, detail="No resources found")
#     return resources

# def get_resources_by_team(db: Session, team_name: str):
#     resources = db.query(Resource).filter(Resource.team == team_name).all()
#     if not resources:
#         raise HTTPException(status_code=404, detail="No resources found for the team")
#     return resources

# def get_resources_by_categories(db: Session, categories: list):
#     resources = db.query(Resource).filter(Resource.category.in_(categories)).all()
#     if not resources:
#         raise HTTPException(status_code=404, detail="No resources found for the categories")
#     return resources

# def get_resources_by_types(db: Session, types: list):
#     resources = db.query(Resource).filter(Resource.type.in_(types)).all()
#     if not resources:
#         raise HTTPException(status_code=404, detail="No resources found for these types")
#     return resources

# def get_resources_by_tags(db: Session, tags: list):
#     resources = db.query(Resource).filter(Resource.tags.any(tags)).all()
#     if not resources:
#         raise HTTPException(status_code=404, detail="No resources found with these tags")
#     return resources

# def read_resource_by_filter(db: Session, tags: list = None, categories: str = None, types: str = None, team: str = None):
#     query = db.query(Resource)
#     if categories:
#         query = query.filter(Resource.category == categories)
#     if types:
#         query = query.filter(Resource.type == types)
#     if tags:
#         query = query.filter(Resource.tags.op('&&')(tags))
#     if team:
#         query = query.filter(Resource.team == team)

#     results = query.all()
#     if not results:
#         raise HTTPException(status_code=404, detail="No resources found with the specified filters")
#     return results

# def delete_resource(db: Session, resource_id: int):
#     db_resource = db.query(Resource).filter(Resource.id == resource_id).one_or_none()
#     if not db_resource:
#         raise HTTPException(status_code=404, detail="Resource not found")
#     db.delete(db_resource)
#     db.commit()
#     return {"message": "Resource deleted successfully"}

# def edit_resource(db: Session, updated_resource: ResourceUpdate):
#     resource = db.query(Resource).filter(Resource.id == updated_resource.id).one_or_none()
#     if not resource:
#         raise HTTPException(status_code=404, detail="Resource not found")
    
#     for var, value in vars(updated_resource).items():
#         setattr(resource, var, value) if value is not None else None
    
#     db.commit()
#     db.refresh(resource)
#     return resource

