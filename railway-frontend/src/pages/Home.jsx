export default function Home({ setPage, user }) {
  const features = [
    { icon: "⚡", title: "Instant Booking",   desc: "Book seats in seconds with real-time availability" },
    { icon: "🎫", title: "Easy Cancellation", desc: "Cancel anytime with instant refund processing" },
    { icon: "📱", title: "Track Bookings",    desc: "View all your journeys and download tickets" },
    { icon: "🔒", title: "Secure Payments",   desc: "100% secure transactions with payment history" },
  ];

  const stats = [
    { value: "500+", label: "Trains" },
    { value: "50K+", label: "Passengers" },
    { value: "100+", label: "Cities" },
    { value: "99.9%", label: "Uptime" },
  ];

  const popularRoutes = [
    { from: "Delhi", to: "Mumbai",   duration: "16h", price: "₹500" },
    { from: "Mumbai", to: "Chennai", duration: "12h", price: "₹500" },
    { from: "Delhi", to: "Kolkata",  duration: "18h", price: "₹500" },
    { from: "Bangalore", to: "Hyderabad", duration: "6h", price: "₹500" },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* ── HERO ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        padding: "90px 24px 80px",
        background: "linear-gradient(180deg, rgba(7,18,36,0) 0%, rgba(4,13,26,0.8) 100%)",
      }}>
        {/* Background glow orbs */}
        <div style={{ position: "absolute", top: -100, left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 50, right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: 20, padding: "6px 16px", marginBottom: 28,
            fontSize: 12, fontWeight: 600, color: "#60a5fa", letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            India's Smart Railway Booking
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800, lineHeight: 1.05, marginBottom: 24,
            background: "linear-gradient(135deg, #f0f6ff 0%, #60a5fa 50%, #06b6d4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}>
            Book Your Train<br />Journey Today
          </h1>

          <p style={{ fontSize: 17, color: "#7a92b4", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            Fast, reliable and hassle-free railway ticket booking. Search trains, book seats and manage all your travel in one place.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
            <button className="btn-gold" style={{ padding: "14px 32px", fontSize: 15, borderRadius: 12 }}
              onClick={() => setPage(user ? "search" : "register")}>
              🔍 Search Trains
            </button>
            {!user && (
              <button className="btn-outline" style={{ padding: "14px 32px", fontSize: 15, borderRadius: 12 }}
                onClick={() => setPage("register")}>
                Create Account →
              </button>
            )}
          </div>

          {/* Quick Search Bar */}
          <div style={{
            background: "rgba(14,32,64,0.8)", border: "1px solid rgba(99,160,255,0.15)",
            borderRadius: 16, padding: "20px 24px", display: "flex", gap: 12, alignItems: "center",
            flexWrap: "wrap", backdropFilter: "blur(20px)", maxWidth: 700, margin: "0 auto",
          }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>FROM</div>
              <input placeholder="e.g. Delhi" style={{ background: "transparent", border: "none", padding: "4px 0", fontSize: 15, color: "#f0f6ff", fontWeight: 500 }}
                onFocus={e => e.target.style.outline = "none"}
                id="hero-from"
              />
            </div>
            <div style={{ color: "#f0b429", fontSize: 22, padding: "0 8px" }}>⇄</div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>TO</div>
              <input placeholder="e.g. Mumbai" style={{ background: "transparent", border: "none", padding: "4px 0", fontSize: 15, color: "#f0f6ff", fontWeight: 500 }}
                onFocus={e => e.target.style.outline = "none"}
                id="hero-to"
              />
            </div>
            <button className="btn-primary" style={{ padding: "12px 28px", borderRadius: 10, whiteSpace: "nowrap" }}
              onClick={() => {
                const from = document.getElementById("hero-from").value;
                const to   = document.getElementById("hero-to").value;
                if (from && to) sessionStorage.setItem("hs", JSON.stringify({ from, to }));
                setPage("search");
              }}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: "rgba(14,32,64,0.4)", borderTop: "1px solid rgba(99,160,255,0.08)", borderBottom: "1px solid rgba(99,160,255,0.08)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "#60a5fa" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#4a6080", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── POPULAR ROUTES ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h2 className="section-title">Popular Routes</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>Most booked train routes across India</p>
          </div>
          <button className="btn-outline" style={{ fontSize: 13 }} onClick={() => setPage("search")}>View All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {popularRoutes.map((r, i) => (
            <div key={i} className="card" style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
              onClick={() => {
                sessionStorage.setItem("hs", JSON.stringify({ from: r.from, to: r.to }));
                setPage("search");
              }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, #3b82f6, #06b6d4)`, opacity: 0.6 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "#4a6080", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Route</span>
                <span style={{ fontSize: 12, color: "#f0b429", fontWeight: 700 }}>{r.price}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#f0f6ff" }}>{r.from}</span>
                <span style={{ color: "#4a6080", fontSize: 12, flex: 1, textAlign: "center" }}>━━ 🚂 ━━</span>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#f0f6ff" }}>{r.to}</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: "#7a92b4" }}>⏱ {r.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ background: "rgba(14,32,64,0.3)", borderTop: "1px solid rgba(99,160,255,0.08)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>A complete railway booking experience</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#7a92b4", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      {!user && (
        <div style={{ padding: "60px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, marginBottom: 16 }}>Ready to Book?</h2>
            <p style={{ color: "#7a92b4", marginBottom: 28 }}>Create a free account and start booking train tickets in minutes.</p>
            <button className="btn-gold" style={{ padding: "14px 40px", fontSize: 15, borderRadius: 12 }} onClick={() => setPage("register")}>
              Get Started Free →
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(99,160,255,0.08)", padding: "24px", textAlign: "center", color: "#4a6080", fontSize: 13 }}>
        © 2024 RailBook · India's Smart Railway Booking System
      </div>
    </div>
  );
}