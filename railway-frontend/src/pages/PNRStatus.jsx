import { useState } from "react";
import { myBookingsApi } from "../api/api";

export default function PNRStatus() {
  const [pnr, setPnr]       = useState("");
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const checkPNR = async () => {
    const id = parseInt(pnr.trim());
    if (!pnr.trim()) { setError("Please enter a PNR / Booking ID"); return; }
    if (isNaN(id))   { setError("PNR must be a number (your Booking ID)"); return; }

    setLoading(true); setError(""); setResult(null);
    try {
      const bookings = await myBookingsApi();
      const found = bookings.find(b => b.id === id);
      if (found) setResult(found);
      else setError(`No booking found for PNR #${id}. Make sure you're logged in with the correct account.`);
    } catch {
      setError("Could not fetch booking. Please make sure you are logged in.");
    }
    setLoading(false);
  };

  const statusColor = (s) => s === "Booked" ? "#34d399" : s === "Cancelled" ? "#f87171" : "#f0b429";
  const statusBg    = (s) => s === "Booked" ? "rgba(16,185,129,0.1)" : s === "Cancelled" ? "rgba(239,68,68,0.1)" : "rgba(240,180,41,0.1)";

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <h2 className="section-title">PNR Status</h2>
      <p className="section-sub">Enter your Booking ID to check the current status</p>

      {/* Search Box */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: "block", marginBottom: 8 }}>PNR / BOOKING ID</label>
            <input
              placeholder="e.g. 1001"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              onKeyDown={e => e.key === "Enter" && checkPNR()}
              style={{ fontSize: 18, fontWeight: 600, letterSpacing: "0.05em" }}
            />
          </div>
          <button className="btn-primary" style={{ padding: "12px 28px", whiteSpace: "nowrap" }}
            onClick={checkPNR} disabled={loading}>
            {loading ? <span className="spinner" /> : "Check Status"}
          </button>
        </div>
        {error && <div className="alert-error" style={{ marginTop: 14 }}>{error}</div>}
      </div>

      {/* Result */}
      {result && (
        <div className="card fade-up" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${statusColor(result.status)}, transparent)` }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: "#4a6080", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Booking ID</div>
              <div style={{ fontSize: 32, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#60a5fa" }}>#{result.id}</div>
            </div>
            <div style={{
              padding: "10px 20px", borderRadius: 10,
              background: statusBg(result.status),
              border: `1px solid ${statusColor(result.status)}33`,
              color: statusColor(result.status),
              fontWeight: 700, fontSize: 15,
            }}>
              {result.status === "Booked" ? "✅" : "❌"} {result.status}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20 }}>
            {[
              { label: "Train Name",   value: result.train_name },
              { label: "Train Number", value: result.train_number },
              { label: "From",         value: result.source },
              { label: "To",           value: result.destination },
              { label: "Journey Date", value: result.journey_date },
              { label: "Seats Booked", value: result.seats_booked },
              { label: "Amount Paid",  value: `₹${result.amount}` },
              { label: "Booked On",    value: new Date(result.booking_time).toLocaleDateString() },
            ].map((item, i) => (
              <div key={i} style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(99,160,255,0.08)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#4a6080", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f6ff" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {result.status === "Booked" && (
            <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(16,185,129,0.06)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.15)", fontSize: 13, color: "#34d399" }}>
              ✅ Your booking is confirmed. Have a safe journey!
            </div>
          )}
        </div>
      )}

      {/* Info box */}
      <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(59,130,246,0.06)", borderRadius: 12, border: "1px solid rgba(59,130,246,0.12)", fontSize: 13, color: "#7a92b4" }}>
        💡 <strong style={{ color: "#60a5fa" }}>Tip:</strong> Your PNR is the Booking ID shown after a successful booking. You can find it in <strong style={{ color: "#f0f6ff" }}>My Bookings</strong> page.
      </div>
    </div>
  );
}