from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class ResourceBase(BaseModel):
    asset_name: Optional[str] = None
    team: Optional[str] = None
    type: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    link: str
    tags: Optional[List[str]] = None
    # addedBy: Optional[str] = None
    date: Optional[date] = None

class ResourceCreate(ResourceBase):
    pass


class Resource(ResourceBase):
    id: int
    user_id: int
    addedBy: str
    date: date
    
    
    class Config:
        orm_mode = True

class UrlBase(BaseModel):
    url: str

class Token(BaseModel):
    access_token: str
    token_type: str