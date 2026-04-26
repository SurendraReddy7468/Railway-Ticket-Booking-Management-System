import { useState } from "react";
import { bookSeatApi } from "../api/api";

const OFFERS = [
  { code: "FIRST10", discount: 10, label: "10% off on first booking" },
  { code: "RAIL20",  discount: 20, label: "20% off — limited time" },
  { code: "SAVE50",  discount: 50, label: "Flat ₹50 off" },
];

export default function TrainCard({ train }) {
  const today = new Date().toISOString().split("T")[0];
  const [journeyDate, setJourneyDate] = useState(today);
  const [seats,       setSeats]       = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [message,     setMessage]     = useState("");
  const [bookingId,   setBookingId]   = useState(null);
  const [coupon,      setCoupon]      = useState("");
  const [discount,    setDiscount]    = useState(0);
  const [couponMsg,   setCouponMsg]   = useState("");
  const [showOffers,  setShowOffers]  = useState(false);
  const [expanded,    setExpanded]    = useState(false);

  const basePrice   = seats * 500;
  const discountAmt = discount > 10 ? discount : Math.round(basePrice * discount / 100);
  const finalPrice  = Math.max(0, basePrice - discountAmt);

  const applyCoupon = () => {
    const found = OFFERS.find(o => o.code === coupon.toUpperCase().trim());
    if (found) {
      setDiscount(found.discount);
      setCouponMsg(`✅ "${found.code}" applied — ${found.label}`);
    } else {
      setDiscount(0);
      setCouponMsg("❌ Invalid coupon code");
    }
  };

  const handleBook = async () => {
    if (train.available_seats <= 0) return;
    setLoading(true); setMessage("");
    try {
      const res = await bookSeatApi({ train_id: train.id, journey_date: journeyDate, seats_booked: seats });
      if (res.booking_id) {
        setBookingId(res.booking_id);
        setMessage(`Booked! ₹${finalPrice} paid for ${res.seats_booked} seat(s)`);
      } else {
        setMessage(res.error || res.message || "Booking failed");
      }
    } catch { setMessage("Error booking. Please try again."); }
    setLoading(false);
  };

  const isFull = train.available_seats <= 0;
  const pct    = Math.round((train.available_seats / train.total_seats) * 100);

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ height: 3, background: isFull ? "#374151" : `linear-gradient(90deg, #3b82f6 ${pct}%, #1e293b ${pct}%)` }} />

      <div style={{ padding: "20px 24px" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 17, fontFamily: "'Syne', sans-serif", color: "#f0f6ff" }}>{train.train_name}</h3>
              <span className="tag">{train.train_number}</span>
              <span className={`badge ${isFull ? "badge-red" : "badge-green"}`}>
                {isFull ? "● Full" : "● Available"}
              </span>
            </div>

            {/* Route */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#f0f6ff" }}>{train.source}</div>
                <div style={{ fontSize: 11, color: "#4a6080" }}>Departure</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", color: "#4a6080", fontSize: 11 }}>
                <div>🚂 ━━━━━━━━</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#f0f6ff" }}>{train.destination}</div>
                <div style={{ fontSize: 11, color: "#4a6080" }}>Arrival</div>
              </div>
            </div>

            {/* Seats progress */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4a6080", marginBottom: 5 }}>
                <span>Seat Availability</span>
                <span style={{ color: isFull ? "#f87171" : "#34d399", fontWeight: 600 }}>{train.available_seats} / {train.total_seats} seats</span>
              </div>
              <div style={{ height: 4, background: "#132650", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: isFull ? "#ef4444" : pct > 50 ? "#10b981" : "#f0b429", borderRadius: 2, transition: "width 0.5s" }} />
              </div>
            </div>
          </div>

          {/* Right: price + book btn */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#f0b429" }}>₹500</div>
              <div style={{ fontSize: 11, color: "#4a6080" }}>per seat</div>
            </div>
            {!bookingId && !isFull && (
              <button onClick={() => setExpanded(!expanded)} className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>
                {expanded ? "Close ✕" : "Book Now →"}
              </button>
            )}
            {isFull && <button className="btn-danger" style={{ opacity: 0.5 }} disabled>Sold Out</button>}
          </div>
        </div>

        {/* Booking panel */}
        {expanded && !bookingId && !isFull && (
          <div className="fade-up" style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(99,160,255,0.1)" }}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
              <div style={{ flex: 1, minWidth: 150 }}>
                <label style={{ display: "block", marginBottom: 6 }}>JOURNEY DATE</label>
                <input type="date" value={journeyDate} min={today} onChange={e => setJourneyDate(e.target.value)} />
              </div>
              <div style={{ width: 100 }}>
                <label style={{ display: "block", marginBottom: 6 }}>SEATS</label>
                <input type="number" value={seats} min={1} max={Math.min(train.available_seats, 6)}
                  onChange={e => setSeats(Math.max(1, parseInt(e.target.value) || 1))} />
              </div>
            </div>

            {/* Coupon */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label>COUPON CODE</label>
                <button onClick={() => setShowOffers(!showOffers)} style={{ background: "none", border: "none", color: "#60a5fa", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  {showOffers ? "Hide Offers ▲" : "View Offers 🏷️"}
                </button>
              </div>

              {showOffers && (
                <div style={{ marginBottom: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                  {OFFERS.map(o => (
                    <div key={o.code} onClick={() => { setCoupon(o.code); setShowOffers(false); }}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 8, cursor: "pointer" }}>
                      <div>
                        <span style={{ fontWeight: 700, color: "#60a5fa", fontSize: 13 }}>{o.code}</span>
                        <span style={{ fontSize: 12, color: "#7a92b4", marginLeft: 10 }}>{o.label}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#f0b429", fontWeight: 600 }}>APPLY</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 8 }}>
                <input placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)}
                  style={{ flex: 1, textTransform: "uppercase" }} />
                <button className="btn-outline" style={{ whiteSpace: "nowrap", padding: "10px 16px", fontSize: 13 }} onClick={applyCoupon}>Apply</button>
              </div>
              {couponMsg && <div style={{ fontSize: 12, marginTop: 6, color: couponMsg.startsWith("✅") ? "#34d399" : "#f87171" }}>{couponMsg}</div>}
            </div>

            {/* Price breakdown */}
            <div style={{ background: "rgba(14,32,64,0.6)", border: "1px solid rgba(99,160,255,0.1)", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#7a92b4", marginBottom: 6 }}>
                <span>{seats} seat(s) × ₹500</span><span>₹{basePrice}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#34d399", marginBottom: 6 }}>
                  <span>Discount</span><span>−₹{discountAmt}</span>
                </div>
              )}
              <div style={{ height: 1, background: "rgba(99,160,255,0.1)", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "#f0f6ff" }}>
                <span>Total</span><span style={{ color: "#f0b429" }}>₹{finalPrice}</span>
              </div>
            </div>

            {message && !bookingId && <div className="alert-error" style={{ marginBottom: 12 }}>{message}</div>}

            <button className="btn-gold" style={{ width: "100%", padding: "13px" }} onClick={handleBook} disabled={loading}>
              {loading ? <><span className="spinner" style={{ marginRight: 8 }} />Booking…</> : `Confirm Booking · ₹${finalPrice}`}
            </button>
          </div>
        )}

        {/* Success state */}
        {bookingId && (
          <div className="fade-up" style={{ marginTop: 16, padding: "14px 16px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10 }}>
            <div style={{ color: "#34d399", fontWeight: 700, marginBottom: 4 }}>✅ Booking Confirmed!</div>
            <div style={{ fontSize: 13, color: "#7a92b4" }}>Booking ID: <strong style={{ color: "#f0f6ff" }}>#{bookingId}</strong> · {message}</div>
          </div>
        )}
      </div>
    </div>
  );
}