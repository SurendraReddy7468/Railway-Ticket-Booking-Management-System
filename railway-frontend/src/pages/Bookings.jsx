import { useEffect, useState } from "react";
import { myBookingsApi, cancelBookingApi } from "../api/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(true);

  const load = async () => {
    try {
      const res = await myBookingsApi();
      setBookings(res);
    } catch { setError("Could not load bookings."); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const res = await cancelBookingApi(id);
      if (res.message) load();
      else alert(res.error);
    } catch { alert("Cancellation failed."); }
  };

  const active    = bookings.filter(b => b.status !== "Cancelled");
  const cancelled = bookings.filter(b => b.status === "Cancelled");

  return (
    <div className="page">
      <h2 style={{ fontSize: "32px", marginBottom: "6px" }}>My Bookings</h2>
      <p style={{ color: "var(--gray)", marginBottom: "28px" }}>View and manage all your train bookings</p>

      {loading && <p style={{ color: "var(--gray)" }}>Loading bookings…</p>}
      {error   && <div className="alert-error">{error}</div>}

      {!loading && bookings.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎫</div>
          <h3 style={{ marginBottom: "8px" }}>No bookings yet</h3>
          <p style={{ color: "var(--gray)" }}>Search for trains and book your first ticket!</p>
        </div>
      )}

      {active.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "var(--navy)" }}>
            Active Bookings <span className="tag">{active.length}</span>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {active.map(b => (
              <div key={b.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>BOOKING ID</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>#{b.id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>TRAIN</div>
                    <div style={{ fontWeight: "600" }}>Train #{b.train_id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>SEAT</div>
                    <div style={{ fontWeight: "600" }}>#{b.seat_number}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>STATUS</div>
                    <span className="badge badge-green">{b.status}</span>
                  </div>
                </div>
                <button className="btn-danger btn-sm" onClick={() => cancel(b.id)}>Cancel</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {cancelled.length > 0 && (
        <div>
          <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "var(--gray)" }}>
            Cancelled <span className="tag">{cancelled.length}</span>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cancelled.map(b => (
              <div key={b.id} className="card" style={{ opacity: 0.6, display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>BOOKING ID</div>
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>#{b.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>TRAIN</div>
                  <div style={{ fontWeight: "600" }}>Train #{b.train_id}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>SEAT</div>
                  <div style={{ fontWeight: "600" }}>#{b.seat_number}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--gray)", letterSpacing: "1px" }}>STATUS</div>
                  <span className="badge badge-red">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}