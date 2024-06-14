from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

# User Schemas
class UserBase(BaseModel):
    username: str 

class UserCreate(UserBase):
    email: EmailStr 
    password: str

class UserIn(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool
    class Config:
        orm_mode = True

# Resource Schemas
class ResourceBase(BaseModel):
    asset_name: Optional[str] = None
    team: Optional[str] = None
    type: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    link: str = None
    tags: Optional[List[str]] = None
    date: Optional[date] = None

class ResourceCreate(ResourceBase):
    pass  # Inherits all from ResourceBase for resource creation

class ResourceUpdate(BaseModel):
    id: int 
    asset_name: str 
    description: str 
    category: str
    tags: List[str] 
    team: str 
    type: str

class ResourceOut(ResourceBase):
    id: int 
    user_id: int 
    addedBy: str
    class Config:
        orm_mode = True

# URL Base Model
class UrlBase(BaseModel):
    link: str 

# Authentication Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str
