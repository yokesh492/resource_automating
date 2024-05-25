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
    category: Optional[str] = None
    description: Optional[str] = None
    link: Optional[str] = None
    tags: Optional[List[str]] = None
    date: Optional[date] = None

class ResourceCreate(ResourceBase):
    asset_name: str
    link: str

class Resource(ResourceBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class UrlBase(BaseModel):
    url: str