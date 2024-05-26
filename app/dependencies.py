from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import User
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from .database import SessionLocal
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import User
from .auth import verify_password

# Your secret key and algorithm used to sign the JWT
SECRET_KEY = "hjnnk23_rtypmnybd-32468ffgt5yyhhAwSDggA1xxZNEElko90NDGfsgnon3355"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise credentials_exception
    return user
