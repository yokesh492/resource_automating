from sqlalchemy import Column, Integer, String, Text, Date, ARRAY, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    resources = relationship("Resource", back_populates="owner")

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    asset_name = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(Text)
    link = Column(String, unique=True, index=True)
    tags = Column(ARRAY(String))
    date = Column(Date, default=func.current_date())
    user_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="resources")
