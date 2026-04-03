from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal
from auth import create_token
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- REGISTER ----------------
@app.post("/register")
def register(user: schemas.Register, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password[:72])

    new_user = models.User(
        email=user.email,
        password=hashed_password,
        is_admin=user.is_admin
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}

# ---------------- LOGIN ----------------
@app.post("/login")
def login(user: schemas.Login, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        return {"error": "Invalid email or password"}

    token = create_token({
        "user_id": db_user.id,
        "is_admin": db_user.is_admin
    })

    return {"token": token}

# ---------------- ADD TRAIN ----------------
@app.post("/admin/add_train")
def add_train(train: schemas.TrainCreate, db: Session = Depends(get_db)):
    new_train = models.Train(**train.dict())

    db.add(new_train)
    db.commit()

    return {"message": "New train added!"}

# ---------------- GET TRAIN ----------------
@app.post("/user/get_train")
def get_train(data: schemas.TrainSearch, db: Session = Depends(get_db)):
    trains = db.query(models.Train).filter(
        models.Train.starting == data.starting,
        models.Train.destination == data.destination
    ).all()

    if not trains:
        return {"message": "Trains are not found"}

    return trains

# ---------------- BOOK SEAT ----------------
@app.post("/user/book_seat")
def book_seat(data: schemas.BookSeat, db: Session = Depends(get_db)):
    train = db.query(models.Train).filter(models.Train.id == data.train_id).first()

    if not train:
        return {"message": "Train not found"}

    if train.seats <= 0:
        return {"message": "No seats left"}

    train.seats -= 1

    booking = models.Booking(
        user_id=data.user_id,
        train_id=train.id,
        status="Booked",
        seat_number=train.seats + 1
    )

    db.add(booking)
    db.commit()

    return {
        "message": "Booking finished successfully",
        "booking_id": booking.id
    }

# ---------------- BOOKING DETAILS ----------------
@app.post("/user/booking_details")
def booking_details(data: schemas.BookingDetails, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == data.booking_id).first()

    if not booking:
        return {"message": "Booking not found"}

    return booking