from fastapi import FastAPI, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, database, dependencies
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests
from bs4 import BeautifulSoup
from datetime import date, datetime, timedelta
from typing import List
from .database import engine
from .models import Base
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

origins =['*']



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"]

)
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

@app.post("/login")
def login(user: schemas.UserIn, db: Session = Depends(dependencies.get_db)):
    user = auth.authenticate_user(db, user.username, user.password)
    return user


@app.post("/token", response_model=schemas.Token)
def login_for_access_token(db: Session = Depends(dependencies.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(days=auth.ACCESS_TOKEN_EXPIRE_DAYS)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}




@app.get("/resources/", response_model=List[schemas.Resource])
def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(dependencies.get_db)):
    return crud.get_resources(db,skip=skip, limit=limit)

@app.post("/resources/", response_model=schemas.Resource)
def create_resource(resource_data: schemas.ResourceCreate, userid: int, db: Session = Depends(dependencies.get_db)):
    try:
        resource_data = resource_data.dict()
        print(resource_data)
        resource_data.pop('date', None)
        print(resource_data)
        resource = crud.create_resource(db, resource_data, user_id=userid)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred while creating the resource: {str(e)}")
    return resource


@app.get("/resources/category/", response_model=List[schemas.Resource])
def read_resources_by_categories(categories: List[str] = Query(None), db: Session = Depends(dependencies.get_db)):
    resources = crud.get_resources_by_categories(db, categories=categories)
    return resources

@app.get("/resources/types/", response_model=List[schemas.Resource])
def read_resources_by_types(types: List[str] = Query(None), db: Session = Depends(dependencies.get_db)):
    resources = crud.get_resources_by_types(db, types=types)
    return resources

@app.get("/resources/tags/", response_model=List[schemas.Resource])
def read_resources_by_tags(tags: List[str] = Query(None), db: Session = Depends(dependencies.get_db)):
    resources = crud.get_resources_by_tags(db, tags=tags)
    return resources


@app.post("/scrape/", response_model=schemas.ResourceBase)
def scrape(url_data: schemas.UrlBase, db: Session = Depends(dependencies.get_db)):
    url = url_data.link
    name, description = scrape_metadata(url)
    if not name and not description:
        raise HTTPException(status_code=404, detail="Failed to retrieve data from the URL.")
    return schemas.ResourceBase(asset_name=name, description=description, link=url)




@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)