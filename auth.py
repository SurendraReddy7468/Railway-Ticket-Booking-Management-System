from jose import jwt

SECRET = "secret123"

def create_token(data):
    return jwt.encode(data, SECRET, algorithm="HS256")