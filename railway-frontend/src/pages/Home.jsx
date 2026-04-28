export default function Home({ setPage }) {
  const features = [
    { 
       icon: "🔍", 
       title: "Search Trains", 
       desc: "Find trains between any two cities instantly",
      image: "/images/custom/Searching-train.jpg"
   },
    { icon: "💺", title: "Book Seats", desc: "Reserve your seat with one click", image: "/images/custom/Train-seats.jpg" },
    { icon: "📋", title: "Manage Bookings", desc: "View, track and cancel your bookings anytime", image: "/images/custom/Booking.png" },
    { icon: "⚡", title: "Instant Confirmation", desc: "Get booking ID immediately after payment", image: "/images/custom/ticket-sample.jpg" },
  ];

  const routes = [
    { from: "Delhi", to: "Mumbai", time: "16h 35m", price: "₹1,200" },
    { from: "Mumbai", to: "Chennai", time: "21h 10m", price: "₹1,500" },
    { from: "Kolkata", to: "Delhi", time: "17h 45m", price: "₹1,100" },
    { from: "Bangalore", to: "Hyderabad", time: "10h 20m", price: "₹800" },
  ];

  return (
    <div>
      <div style={{
        backgroundImage: "url('/images/custom/Indian-Railway.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        overflow: "hidden"
      }}>
        
        <div style={{
          background: "linear-gradient(135deg, rgba(31, 42, 107, 0.85) 0%, rgba(26,42,122,0.8) 60%, rgba(12, 2, 44, 0.82) 100%)",
          padding: "100px 40px",
          position: "center",
          zIndex: 2
        }}>
          {/* Decorative Elements */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(149, 108, 14, 0.08)" }} />
          <div style={{ position: "absolute", bottom: -80, left: -40, width: 400, height: 400, borderRadius: "50%", background: "rgba(201, 165, 80, 0)" }} />

          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>

            <div style={{
              display: "inline-block",
              background: "rgba(232,184,75,0.2)",
              border: "1.5px solid rgba(232,184,75,0.4)",
              color: "var(--gold)",
              padding: "8px 18px",
              borderRadius: "25px",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "24px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              backdropFilter: "blur(10px)"
            }}>
              🚂 INDIA'S FASTEST BOOKING PLATFORM
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(40px, 6vw, 68px)",
              color: "white",
              lineHeight: 1.15,
              marginBottom: "24px",
              fontWeight: "700",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>
              Book Your Perfect<br />
              <span style={{ color: "var(--gold)", textShadow: "0 4px 20px rgba(232,184,75,0.4)" }}>Railway Journey</span>
            </h1>

            <p style={{ 
              color: "rgba(255,255,255,0.75)", 
              fontSize: "18px", 
              marginBottom: "48px", 
              lineHeight: 1.8,
              maxWidth: "600px",
              margin: "0 auto 48px"
            }}>
              Fast, reliable, and hassle-free railway ticket booking.<br />
              Search trains, compare prices, and book seats in seconds.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <button 
                onClick={() => setPage("search")}
                style={{
                  background: "var(--gold)",
                  color: "var(--navy)",
                  padding: "16px 42px",
                  fontSize: "16px",
                  fontWeight: "700",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 24px rgba(232,184,75,0.35)",
                  transition: "all 0.3s ease",
                  transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gold-light)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(232,184,75,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--gold)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,184,75,0.35)";
                }}
              >
                ✈️ Book Ticket Now
              </button>

              <button 
                onClick={() => setPage("register")}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.4)",
                  padding: "14px 40px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "white";
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Section */}
      <div style={{ background: "white", boxShadow: "0 -8px 30px rgba(0,0,0,0.1)", padding: "0 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>From City</label>
            <input id="hs-from" placeholder="e.g., Delhi" style={{ fontSize: "15px", padding: "12px 14px" }} />
          </div>
          <div style={{ color: "var(--gold)", fontSize: "24px", paddingBottom: "8px", animation: "pulse 2s infinite" }}>⇄</div>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>To City</label>
            <input id="hs-to" placeholder="e.g., Mumbai" style={{ fontSize: "15px", padding: "12px 14px" }} />
          </div>
          <button 
            onClick={() => {
              const from = document.getElementById("hs-from").value;
              const to = document.getElementById("hs-to").value;
              if (from && to) {
                sessionStorage.setItem("hs", JSON.stringify({ from, to }));
                setPage("search");
              }
            }}
            style={{
              background: "var(--navy)",
              color: "white",
              padding: "12px 32px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--navy-light)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--navy)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            
          >
            🔍 Search
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: 1200, margin: "80px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "12px", color: "var(--navy)" }}>
            Why Choose RailBook?
          </h2>
          <p style={{ color: "var(--gray)", fontSize: "17px", maxWidth: "500px", margin: "0 auto" }}>
            We make railway travel simple, affordable, and convenient
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {features.map((f, i) => (
            <div 
              key={i}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(11,19,64,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
              }}
            >
      {/* Image Section */}
        <div style={{ height: "160px", overflow: "hidden", borderRadius: "12px", marginBottom: "16px" }}>
          <img
            src={f.image}
            alt={f.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease"
              }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
       </div>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>{f.icon}</div>
          <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "var(--navy)" }}>
            {f.title}
          </h3>
            <p style={{ color: "var(--gray)", fontSize: "14px", lineHeight: 1.6 }}>
              {f.desc}
            </p> 
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes Section */}
      <div style={{ background: "#f9fafb", padding: "80px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "12px", color: "var(--navy)" }}>
              Popular Routes
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "17px" }}>
              Most booked railway routes across India
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {routes.map((r, i) => (
              <div 
                key={i}
                onClick={() => {
                  sessionStorage.setItem("hs", JSON.stringify({ from: r.from, to: r.to }));
                  setPage("search");
                }}
                style={{
                  background: "white",
                  border: "2px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "140px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,184,75,0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "17px", color: "var(--navy)", marginBottom: "6px" }}>
                    {r.from} → {r.to}
                  </div>
                  <div style={{ color: "var(--gray)", fontSize: "13px", marginTop: "4px" }}>⏱ {r.time}</div>
                </div>
                <div style={{ textAlign: "right", marginTop: "12px" }}>
                  <div style={{ color: "var(--gold)", fontWeight: "700", fontSize: "18px" }}>{r.price}</div>
                  <div style={{ color: "var(--gray)", fontSize: "12px" }}>onwards</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
        textAlign: "center",
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -40, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,184,75,0.08)" }} />
        
        <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Ready to Book Your Journey?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontSize: "17px" }}>
            Join thousands of satisfied travelers. Book now and get instant confirmation.
          </p>
          <button 
            onClick={() => setPage("register")}
            style={{
              background: "var(--gold)",
              color: "var(--navy)",
              padding: "16px 42px",
              fontSize: "16px",
              fontWeight: "700",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(232,184,75,0.35)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold-light)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,184,75,0.35)";
            }}
          >
            Create Free Account →
          </button>
        </div>
      </div>

      {/* Footer */}
      <>
        <footer style={{ background: "#07102a", padding: "32px 40px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
            © 2025 RailBook — India's Premier Railway Ticket Booking System
          </p>
        </footer>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </>
    </div>
  );
}
