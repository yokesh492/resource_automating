from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import date

# User Schemas
class UserBase(BaseModel):
    username: str = Field(..., description="The unique username of the user")

class UserCreate(UserBase):
    email: EmailStr = Field(..., description="The email address of the user")
    password: str = Field(..., description="The password for the user account")

class UserIn(UserBase):
    password: str = Field(..., description="The password for user authentication")

class UserOut(UserBase):
    id: int = Field(..., description="The unique identifier of the user")
    is_active: bool = Field(..., description="Status showing whether the user is active or not")
    class Config:
        orm_mode = True

# Resource Schemas
class ResourceBase(BaseModel):
    asset_name: Optional[str] = Field(None, description="Name of the asset")
    team: Optional[str] = Field(None, description="Team responsible for the resource")
    type: Optional[str] = Field(None, description="Type of resource")
    category: Optional[str] = Field(None, description="Category of the resource")
    description: Optional[str] = Field(None, description="Description of the resource")
    link: str = Field(..., description="Link to the resource")
    tags: Optional[List[str]] = Field(None, description="Tags associated with the resource")
    date: Optional[date] = Field(None, description="Date of addition or creation")

class ResourceCreate(ResourceBase):
    pass  # Inherits all from ResourceBase for resource creation

class ResourceUpdate(BaseModel):
    id: int = Field(..., description="Identifier of the resource")
    asset_name: str = Field(..., description="Name of the asset")
    description: str = Field(..., description="Description of the resource")
    category: str = Field(..., description="Category of the resource")
    tags: List[str] = Field(..., description="Tags associated with the resource")
    team: str = Field(..., description="Team responsible for the resource")
    type: str = Field(..., description="Type of resource")

class ResourceOut(ResourceBase):
    id: int = Field(..., description="The unique identifier of the resource")
    user_id: int = Field(..., description="The identifier of the user who owns this resource")
    addedBy: str = Field(..., description="Username of the user who added the resource")
    class Config:
        orm_mode = True

# URL Base Model
class UrlBase(BaseModel):
    link: str = Field(..., description="Link to a specific resource or location")

# Authentication Token Schema
class Token(BaseModel):
    access_token: str = Field(..., description="JWT access token for authentication")
    token_type: str = Field(..., description="Type of the token, typically 'bearer'")
