from jose import jwt, JWTError

SECRET = "secret123"
ALGORITHM = "HS256"

def create_token(data: dict):
    return jwt.encode(data.copy(), SECRET, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
    except JWTError:
        return None