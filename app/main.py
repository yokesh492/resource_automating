from fastapi import FastAPI, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, database, dependencies
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests
from bs4 import BeautifulSoup
from datetime import date, datetime, timedelta
from typing import List, Optional
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
    title = soup.title.string if soup.title else None
    if not title:  
        og_title_tag = soup.find('meta', attrs={'property': 'og:title'})
        title = og_title_tag['content'] if og_title_tag else 'No title found'

    
    description_tag = soup.find('meta', attrs={'name': 'description'})
    description = description_tag['content'] if description_tag else None
    if not description:  
        og_description_tag = soup.find('meta', attrs={'property': 'og:description'})
        description = og_description_tag['content'] if og_description_tag else 'No description found'

    return title, description


@app.post("/signup/")
def create_user(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        return {"error" : "Username already registered"}
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User created successfully"}

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

@app.post("/create_resources/", response_model=schemas.Resource)
def create_resource(resource_data: schemas.ResourceCreate, userid: int, db: Session = Depends(dependencies.get_db)):
    try:
        resource_data = resource_data.dict()
        print(resource_data)
        resource_data.pop('date', None)
        print(resource_data)
        resource = crud.create_resource(db, resource_data, user_id=userid)
    except Exception as e:
        #raise HTTPException(status_code=400, detail=f"An error occurred while creating the resource: {str(e)}")
        return {"error": "resource already exists"}
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


@app.get("/resources/filter/", response_model = List[schemas.Resource])
def read_resource_by_filter(
    category: Optional[str] = Query(None),
    types: Optional[str] = Query(None),
    tags: List[str] = Query(None),
    teams: Optional[str] = Query(None),
    db: Session = Depends(dependencies.get_db)
):
    if teams == "All":
        resource = crud.read_resource_by_filter(db, categories=category, types=types, tags=tags)
        return resource
    else:
        resource = crud.read_resource_by_filter(db, categories=category, types=types, tags=tags, team=teams)
        return resource
    
@app.delete("/resources/")
def delete_resource(id:int, db: Session = Depends(dependencies.get_db)):
    response = crud.delete_resource(db, id)
    return response

@app.put("/resources/")
def edit_resource(update_resource : schemas.ResourceUpdate, db: Session = Depends(dependencies.get_db)):
    response = crud.edit_resource(db, update_resource)
    return response

@app.post("/scrape/", response_model=schemas.ResourceBase)
def scrape(url_data: schemas.UrlBase, db: Session = Depends(dependencies.get_db)):
    url = url_data.link
    name, description = scrape_metadata(url)
    if not name and not description:
        return {"error": "please check the URL"}
    return schemas.ResourceBase(asset_name=name, description=description, link=url)

@app.get("/resources/sort/", response_model=List[schemas.Resource])
def sort_resources(
    sort: Optional[str] = Query("asc", description="Sort order: 'asc' or 'desc'"),
    db: Session = Depends(dependencies.get_db)
):
    resources = crud.get_resources(db,skip=0, limit=100)
    resources.sort(key=lambda r: r.asset_name, reverse=(sort.lower() == "desc"))
    return resources


@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)


# refactoring code

# from fastapi import FastAPI, Depends, HTTPException, status, Query
# from fastapi import APIRouter
# from sqlalchemy.orm import Session
# import os
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from fastapi.middleware.cors import CORSMiddleware
# from datetime import timedelta
# from typing import List, Optional

# from . import dependencies, crud
# from .database import engine
# from .models import Base
# from .schemas import schemas

# app = FastAPI(title='Resource Management API')

# # CORS configuration
# origins = os.getenv("CORS_ORIGINS", "*").split(",")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_methods=["*"],
#     allow_credentials=True,
#     allow_headers=["*"]
# )

# # Dependency Injection
# def get_db():
#     db = dependencies.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Router definition
# router = APIRouter()

# @router.post("/signup/", response_model=schemas.UserOut)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.create_user(db, user)
#     if db_user is None:
#         raise HTTPException(status_code=400, detail="Username already registered")
#     return db_user

# @router.post("/login", response_model=schemas.Token)
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = crud.authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
#     access_token = crud.create_access_token(data={"sub": user.username}, expires_delta=timedelta(days=3))
#     return {"access_token": access_token, "token_type": "bearer"}

# # Resource CRUD operations
# @router.get("/resources/", response_model=List[schemas.Resource])
# def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return crud.get_resources(db, skip=skip, limit=limit)

# @router.post("/resources/", response_model=schemas.Resource)
# def create_resource(resource_data: schemas.ResourceCreate, db: Session = Depends(get_db)):
#     return crud.create_resource(db, resource_data)

# # Additional Routes and Operations...

# app.include_router(router)

# @app.on_event("startup")
# async def startup():
#     Base.metadata.create_all(bind=engine)
