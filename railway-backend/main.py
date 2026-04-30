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

def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()

def verify_password(pw: str, hashed: str) -> bool:
    return bcrypt.checkpw(pw.encode(), hashed.encode())

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(authorization.split(" ")[1])
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload

@app.post("/register")
def register(user: schemas.Register, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        return {"error": "Email already registered"}
    db.add(models.User(
        name=user.name, email=user.email,
        password=hash_password(user.password),
        phone=user.phone, is_admin=user.is_admin
    ))
    db.commit()
    return {"message": "Registered successfully"}

@app.post("/login")
def login(user: schemas.Login, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        return {"error": "Invalid email or password"}
    token = create_token({
        "user_id": db_user.id,
        "is_admin": db_user.is_admin,
        "name": db_user.name or db_user.email
    })
    return {"token": token, "name": db_user.name, "is_admin": db_user.is_admin}

@app.get("/trains")
def get_all_trains(db: Session = Depends(get_db),
                   cu: dict = Depends(get_current_user)):
    return db.query(models.Train).all()

@app.post("/user/get_train")
def search_trains(data: schemas.TrainSearch, db: Session = Depends(get_db),
                  cu: dict = Depends(get_current_user)):
    trains = db.query(models.Train).filter(
        models.Train.source.ilike(data.source),
        models.Train.destination.ilike(data.destination)
    ).all()
    return trains

@app.post("/admin/add_train")
def add_train(train: schemas.TrainCreate, db: Session = Depends(get_db),
              cu: dict = Depends(get_current_user)):
    if not cu.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    t = models.Train(
        train_name=train.train_name, train_number=train.train_number,
        source=train.source, destination=train.destination,
        total_seats=train.total_seats, available_seats=train.total_seats
    )
    db.add(t)
    db.commit()
    db.refresh(t)
    return {"message": "Train added!", "train_id": t.id}

@app.get("/admin/all_trains")
def all_trains(db: Session = Depends(get_db),
               cu: dict = Depends(get_current_user)):
    if not cu.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    return db.query(models.Train).all()

@app.delete("/admin/delete_train/{train_id}")
def delete_train(train_id: int, db: Session = Depends(get_db),
                 cu: dict = Depends(get_current_user)):
    if not cu.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    t = db.query(models.Train).filter(models.Train.id == train_id).first()
    if not t:
        return {"error": "Train not found"}
    db.delete(t)
    db.commit()
    return {"message": "Train deleted"}

@app.post("/user/book_seat")
def book_seat(data: schemas.BookSeat, db: Session = Depends(get_db),
              cu: dict = Depends(get_current_user)):
    from datetime import date
    train = db.query(models.Train).filter(models.Train.id == data.train_id).first()
    if not train:
        return {"error": "Train not found"}
    if train.available_seats < data.seats_booked:
        return {"error": f"Only {train.available_seats} seats available"}
    train.available_seats -= data.seats_booked
    res = models.Reservation(
        user_id=cu["user_id"], train_id=train.id,
        journey_date=date.fromisoformat(data.journey_date),
        seats_booked=data.seats_booked, status="Booked"
    )
    db.add(res)
    db.flush()
    amount = data.seats_booked * 500.00
    db.add(models.Payment(
        reservation_id=res.id, amount=amount, payment_status="Paid"
    ))
    db.commit()
    db.refresh(res)
    return {
        "message": "Booking confirmed!",
        "booking_id": res.id,
        "seats_booked": data.seats_booked,
        "amount_paid": float(amount),
        "journey_date": str(data.journey_date)
    }

@app.get("/user/my_bookings")
def my_bookings(db: Session = Depends(get_db),
                cu: dict = Depends(get_current_user)):
    reservations = db.query(models.Reservation).filter(
        models.Reservation.user_id == cu["user_id"]
    ).order_by(models.Reservation.booking_time.desc()).all()
    result = []
    for r in reservations:
        train = db.query(models.Train).filter(models.Train.id == r.train_id).first()
        payment = db.query(models.Payment).filter(
            models.Payment.reservation_id == r.id).first()
        result.append({
            "id": r.id,
            "train_name": train.train_name if train else "Unknown",
            "train_number": train.train_number if train else "-",
            "source": train.source if train else "-",
            "destination": train.destination if train else "-",
            "journey_date": str(r.journey_date),
            "seats_booked": r.seats_booked,
            "status": r.status,
            "booking_time": str(r.booking_time),
            "amount": float(payment.amount) if payment else 0
        })
    return result

@app.post("/user/cancel_booking")
def cancel_booking(data: schemas.BookingDetails, db: Session = Depends(get_db),
                   cu: dict = Depends(get_current_user)):
    res = db.query(models.Reservation).filter(
        models.Reservation.id == data.booking_id,
        models.Reservation.user_id == cu["user_id"]
    ).first()
    if not res:
        return {"error": "Booking not found"}
    if res.status == "Cancelled":
        return {"error": "Already cancelled"}
    train = db.query(models.Train).filter(models.Train.id == res.train_id).first()
    if train:
        train.available_seats += res.seats_booked
    res.status = "Cancelled"
    payment = db.query(models.Payment).filter(
        models.Payment.reservation_id == res.id).first()
    if payment:
        payment.payment_status = "Refunded"
    db.commit()
    return {"message": "Booking cancelled and refund initiated"}

@app.post("/feedback")
def submit_feedback(data: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    db.add(models.Feedback(
        user_name=data.user_name, email=data.email, message=data.message
    ))
    db.commit()
    return {"message": "Feedback submitted. Thank you!"}

@app.get("/admin/feedback")
def get_feedback(db: Session = Depends(get_db),
                 cu: dict = Depends(get_current_user)):
    if not cu.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    return db.query(models.Feedback).order_by(
        models.Feedback.submitted_at.desc()).all()

@app.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db),
                cu: dict = Depends(get_current_user)):
    if not cu.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admins only")
    payments = db.query(models.Payment).filter(
        models.Payment.payment_status == "Paid").all()
    return {
        "total_users":        db.query(models.User).count(),
        "total_trains":       db.query(models.Train).count(),
        "total_reservations": db.query(models.Reservation).count(),
        "active_bookings":    db.query(models.Reservation).filter(
                                models.Reservation.status == "Booked").count(),
        "total_revenue":      sum(float(p.amount) for p in payments)
    }