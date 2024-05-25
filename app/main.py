from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, database, dependencies
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests
from bs4 import BeautifulSoup
from datetime import date
from typing import List
from .database import engine
from .models import Base

app = FastAPI()
router = APIRouter()

def scrape_metadata(url: str):
    response = requests.get(url)
    if response.status_code != 200:
        return None, None

    soup = BeautifulSoup(response.content, 'html.parser')
    name = soup.title.string if soup.title else 'No title found'
    description_tag = soup.find('meta', attrs={'name': 'description'})
    description = description_tag['content'] if description_tag else 'No description found'

    return name, description


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/resources/", response_model=List[schemas.Resource])
def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(dependencies.get_db), current_user: schemas.User = Depends(dependencies.get_current_user)):
    return crud.get_user_resources(db, user_id=current_user.id, skip=skip, limit=limit)

@app.post("/scrape/", response_model=schemas.ResourceBase)
def scrape(url_data: schemas.UrlBase, db: Session = Depends(dependencies.get_db)):
    url = url_data.url
    name, description = scrape_metadata(url)
    if not name and not description:
        raise HTTPException(status_code=404, detail="Failed to retrieve data from the URL.")
    return schemas.ResourceBase(asset_name=name, description=description, link=url)




@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)