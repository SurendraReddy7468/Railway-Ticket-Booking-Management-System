export default function Home({ setPage }) {
  const features = [
    { icon: "🔍", title: "Search Trains", desc: "Find trains between any two cities instantly" },
    { icon: "💺", title: "Book Seats", desc: "Reserve your seat with one click" },
    { icon: "📋", title: "Manage Bookings", desc: "View, track and cancel your bookings anytime" },
    { icon: "⚡", title: "Instant Confirmation", desc: "Get booking ID immediately after payment" },
  ];

  const routes = [
    { from: "Delhi", to: "Mumbai", time: "16h 35m", price: "₹1,200" },
    { from: "Mumbai", to: "Chennai", time: "21h 10m", price: "₹1,500" },
    { from: "Kolkata", to: "Delhi", time: "17h 45m", price: "₹1,100" },
    { from: "Bangalore", to: "Hyderabad", time: "10h 20m", price: "₹800" },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy) 0%, #1a2a7a 60%, #2d1b69 100%)",
        padding: "80px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,184,75,0.06)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 400, height: 400, borderRadius: "50%", background: "rgba(232,184,75,0.04)" }} />

        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(232,184,75,0.15)",
            border: "1px solid rgba(232,184,75,0.3)",
            color: "var(--gold)",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "24px",
            letterSpacing: "1px"
          }}>🚂 INDIA'S RAILWAY BOOKING SYSTEM</div>

          <h1 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(36px, 5vw, 58px)",
            color: "white",
            lineHeight: 1.2,
            marginBottom: "20px"
          }}>
            Book Your Train<br />
            <span style={{ color: "var(--gold)" }}>Journey Today</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px", marginBottom: "40px", lineHeight: 1.7 }}>
            Fast, reliable and hassle-free railway ticket booking.<br />
            Search trains, book seats and manage all your travel in one place.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" style={{ padding: "14px 32px", fontSize: "15px", borderRadius: "10px" }}
              onClick={() => setPage("search")}>
              🔍 Search Trains
            </button>
            <button onClick={() => setPage("register")} style={{
              background: "transparent",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.3)",
              padding: "14px 32px",
              borderRadius: "10px",
              fontSize: "15px",
              cursor: "pointer"
            }}>Create Account</button>
          </div>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "0 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 0", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "var(--gray)", marginBottom: "6px", letterSpacing: "1px" }}>FROM</label>
            <input id="hs-from" placeholder="e.g. Delhi" />
          </div>
          <div style={{ color: "var(--gold)", fontSize: "22px", paddingBottom: "8px" }}>⇄</div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "var(--gray)", marginBottom: "6px", letterSpacing: "1px" }}>TO</label>
            <input id="hs-to" placeholder="e.g. Mumbai" />
          </div>
          <button className="btn-primary" style={{ padding: "11px 28px", whiteSpace: "nowrap" }}
            onClick={() => {
              const from = document.getElementById("hs-from").value;
              const to   = document.getElementById("hs-to").value;
              if (from && to) {
                sessionStorage.setItem("hs", JSON.stringify({ from, to }));
                setPage("search");
              }
            }}>
            Search Trains
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1100, margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "8px" }}>Everything You Need</h2>
        <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: "40px" }}>Simple, fast, and reliable booking experience</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
              <div style={{ fontSize: "36px", marginBottom: "14px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "17px", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ color: "var(--gray)", fontSize: "14px", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes */}
      <div style={{ background: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "8px", textAlign: "center" }}>Popular Routes</h2>
          <p style={{ color: "var(--gray)", textAlign: "center", marginBottom: "40px" }}>Most booked railway routes across India</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {routes.map((r, i) => (
              <div key={i} style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,184,75,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px" }}>{r.from} → {r.to}</div>
                  <div style={{ color: "var(--gray)", fontSize: "13px", marginTop: "4px" }}>⏱ {r.time}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "var(--navy)", fontWeight: "700", fontSize: "16px" }}>{r.price}</div>
                  <div style={{ color: "var(--gray)", fontSize: "12px" }}>onwards</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: "var(--navy)",
        textAlign: "center",
        padding: "60px 20px"
      }}>
        <h2 style={{ color: "white", fontSize: "32px", marginBottom: "12px" }}>Ready to Book Your Journey?</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>Create a free account and start booking in minutes.</p>
        <button className="btn-gold" style={{ padding: "14px 36px", fontSize: "15px", borderRadius: "10px" }}
          onClick={() => setPage("register")}>
          Create Free Account →
        </button>
      </div>

      {/* Footer */}
      <footer style={{ background: "#07102a", padding: "24px 40px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
          © 2025 RailBook — Railway Ticket Booking System
        </p>
      </footer>
    </div>
  );
}