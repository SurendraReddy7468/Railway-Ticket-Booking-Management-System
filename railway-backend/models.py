from sqlalchemy import Column, Integer, String, Boolean, DateTime, Date, DECIMAL, Text, ForeignKey
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(100))
    email      = Column(String(100), unique=True, index=True)
    password   = Column(String(255))
    phone      = Column(String(15))
    is_admin   = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

class Train(Base):
    __tablename__ = "trains"
    id              = Column(Integer, primary_key=True, index=True)
    train_name      = Column(String(100))
    train_number    = Column(String(20))
    source          = Column(String(100))
    destination     = Column(String(100))
    total_seats     = Column(Integer)
    available_seats = Column(Integer)

class Reservation(Base):
    __tablename__ = "reservations"
    id           = Column(Integer, primary_key=True, index=True)
    user_id      = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    train_id     = Column(Integer, ForeignKey("trains.id", ondelete="CASCADE"))
    journey_date = Column(Date)
    seats_booked = Column(Integer, default=1)
    status       = Column(String(50), default="Booked")
    booking_time = Column(DateTime, default=func.now())

class Payment(Base):
    __tablename__ = "payments"
    id             = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(Integer, ForeignKey("reservations.id", ondelete="CASCADE"))
    amount         = Column(DECIMAL(10, 2))
    payment_status = Column(String(50), default="Paid")
    payment_date   = Column(DateTime, default=func.now())

class Feedback(Base):
    __tablename__ = "feedback"
    id           = Column(Integer, primary_key=True, index=True)
    user_name    = Column(String(100))
    email        = Column(String(100))
    message      = Column(Text)
    submitted_at = Column(DateTime, default=func.now())