from sqlalchemy import Column, Integer, String, Text, Date, ARRAY, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, unique=True)
    hashed_password = Column(String)
    email = Column(String, index=True, unique=True)
    is_active = Column(Boolean, default=True)
    resources = relationship("Resource", back_populates="owner", cascade="all, delete-orphan")

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    asset_name = Column(String, index=True)
    team = Column(String, index=True)
    category = Column(String, index=True)
    type = Column(String, index=True)
    description = Column(Text)
    link = Column(String, index=True, unique=True)
    tags = Column(ARRAY(String))
    addedBy = Column(String, index=True)
    date = Column(Date, default=func.current_date())
    user_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="resources")
