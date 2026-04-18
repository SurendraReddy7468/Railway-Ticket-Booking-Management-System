import { useState } from "react";
import { bookSeatApi } from "../api/api";

export default function TrainCard({ train }) {
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState("");
  const [bookingId, setBookingId] = useState(null);

  const handleBook = async () => {
    if (train.seats <= 0) return;
    setLoading(true); setMessage("");
    try {
      const res = await bookSeatApi({ train_id: train.id });
      if (res.booking_id) {
        setBookingId(res.booking_id);
        setMessage("✓ Booked successfully!");
      } else {
        setMessage(res.message || "Booking failed");
      }
    } catch { setMessage("Error booking. Please try again."); }
    setLoading(false);
  };

  const isFull = train.seats <= 0;

  return (
    <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "18px" }}>{train.name}</h3>
          <span className={`badge ${isFull ? "badge-red" : "badge-green"}`}>
            {isFull ? "Full" : "Available"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gray)", fontSize: "15px" }}>
          <span style={{ fontWeight: "600", color: "var(--navy)" }}>{train.starting}</span>
          <span>━━━ 🚂 ━━━</span>
          <span style={{ fontWeight: "600", color: "var(--navy)" }}>{train.destination}</span>
        </div>
        {bookingId && (
          <div style={{ marginTop: "10px", padding: "8px 14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", fontSize: "13px", color: "#15803d" }}>
            ✓ Booking confirmed! Booking ID: <strong>#{bookingId}</strong>
          </div>
        )}
        {message && !bookingId && (
          <div style={{ marginTop: "10px" }} className="alert-error">{message}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px", flexShrink: 0 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "700", color: isFull ? "var(--red)" : "var(--navy)" }}>
            {train.seats}
          </div>
          <div style={{ fontSize: "12px", color: "var(--gray)", marginTop: "2px" }}>seats left</div>
        </div>
        <button
          className={isFull ? "btn-danger" : "btn-gold"}
          style={{ padding: "10px 24px", opacity: isFull ? 0.5 : 1 }}
          onClick={handleBook}
          disabled={isFull || loading}
        >
          {loading ? "Booking…" : isFull ? "Sold Out" : "Book Seat"}
        </button>
      </div>
    </div>
  );
}