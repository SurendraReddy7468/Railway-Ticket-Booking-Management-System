from pydantic import BaseModel

class Register(BaseModel):
    email: str
    password: str
    is_admin: bool

class Login(BaseModel):
    email: str
    password: str

class TrainCreate(BaseModel):
    name: str
    starting: str
    destination: str
    seats: int

class TrainSearch(BaseModel):
    starting: str
    destination: str

class BookSeat(BaseModel):
    train_id: int

class BookingDetails(BaseModel):
    booking_id: int