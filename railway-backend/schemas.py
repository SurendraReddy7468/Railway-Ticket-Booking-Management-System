from pydantic import BaseModel
from typing import Optional

class Register(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = ""
    is_admin: bool = False

class Login(BaseModel):
    email: str
    password: str

class TrainCreate(BaseModel):
    train_name: str
    train_number: str
    source: str
    destination: str
    total_seats: int

class TrainSearch(BaseModel):
    source: str
    destination: str

class BookSeat(BaseModel):
    train_id: int
    journey_date: str
    seats_booked: int = 1

class BookingDetails(BaseModel):
    booking_id: int

class FeedbackCreate(BaseModel):
    user_name: str
    email: str
    message: str