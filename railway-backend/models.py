from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_admin = Column(Boolean, default=False)

class Train(Base):
    __tablename__ = "trains"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    starting = Column(String)
    destination = Column(String)
    seats = Column(Integer)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    train_id = Column(Integer)
    status = Column(String)
    seat_number = Column(Integer)