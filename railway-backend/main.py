from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import bcrypt
import models, schemas
from database import engine, SessionLocal
from auth import create_token, decode_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload

# ---------------- REGISTER ----------------
@app.post("/register")
def register(user: schemas.Register, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        return {"error": "Email already registered"}

    new_user = models.User(
        email=user.email,
        password=hash_password(user.password),
        is_admin=user.is_admin
    )
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}

# ---------------- LOGIN ----------------
@app.post("/login")
def login(user: schemas.Login, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        return {"error": "Invalid email or password"}

    token = create_token({
        "user_id": db_user.id,
        "is_admin": db_user.is_admin
    })
    return {"token": token}

# ---------------- ADD TRAIN (Admin) ----------------
@app.post("/admin/add_train")
def add_train(
    train: schemas.TrainCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")

    new_train = models.Train(**train.dict())
    db.add(new_train)
    db.commit()
    return {"message": "New train added!"}

# ---------------- SEARCH TRAINS ----------------
@app.post("/user/get_train")
def get_train(
    data: schemas.TrainSearch,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    trains = db.query(models.Train).filter(
        models.Train.starting.ilike(data.starting),
        models.Train.destination.ilike(data.destination)
    ).all()
    return trains if trains else []

# ---------------- BOOK SEAT ----------------
@app.post("/user/book_seat")
def book_seat(
    data: schemas.BookSeat,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    train = db.query(models.Train).filter(models.Train.id == data.train_id).first()

    if not train:
        return {"message": "Train not found"}
    if train.seats <= 0:
        return {"message": "No seats available"}

    seat_num = train.seats
    train.seats -= 1

    booking = models.Booking(
        user_id=current_user["user_id"],
        train_id=train.id,
        status="Booked",
        seat_number=seat_num
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return {"message": "Booking successful!", "booking_id": booking.id}

# ---------------- MY BOOKINGS ----------------
@app.get("/user/my_bookings")
def my_bookings(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return db.query(models.Booking).filter(
        models.Booking.user_id == current_user["user_id"]
    ).all()

# ---------------- CANCEL BOOKING ----------------
@app.post("/user/cancel_booking")
def cancel_booking(
    data: schemas.BookingDetails,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    booking = db.query(models.Booking).filter(
        models.Booking.id == data.booking_id,
        models.Booking.user_id == current_user["user_id"]
    ).first()

    if not booking:
        return {"error": "Booking not found"}
    if booking.status == "Cancelled":
        return {"error": "Already cancelled"}

    # Restore the seat
    train = db.query(models.Train).filter(models.Train.id == booking.train_id).first()
    if train:
        train.seats += 1

    booking.status = "Cancelled"
    db.commit()
    return {"message": "Booking cancelled successfully"}

# ---------------- ALL TRAINS (Admin) ----------------
@app.get("/admin/all_trains")
def all_trains(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    return db.query(models.Train).all()

# ---------------- DELETE TRAIN (Admin) ----------------
@app.delete("/admin/delete_train/{train_id}")
def delete_train(
    train_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    train = db.query(models.Train).filter(models.Train.id == train_id).first()
    if not train:
        return {"error": "Train not found"}
    db.delete(train)
    db.commit()
    return {"message": "Train deleted"}

# ---------------- BOOKING DETAILS ----------------
@app.post("/user/booking_details")
def booking_details(
    data: schemas.BookingDetails,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    booking = db.query(models.Booking).filter(models.Booking.id == data.booking_id).first()
    if not booking:
        return {"message": "Booking not found"}
    return booking