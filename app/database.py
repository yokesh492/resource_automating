from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# PostgreSQL connection string local
#SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Pokemon492#@localhost/Resource"

#for production
SQLALCHEMY_DATABASE_URL = "postgresql://yoke492:Pokemon492#@91.108.104.64:5432/mydatabase"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()