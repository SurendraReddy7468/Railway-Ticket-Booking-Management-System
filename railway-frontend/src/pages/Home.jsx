import React from "react";

export default function Home({ setPage, user }) {

  const features = [
    {
      title: "Instant Booking",
      desc: "Book seats in seconds with real-time availability",
      image: "/images/custom/Booking.png"
    },
    {
      title: "Easy Cancellation",
      desc: "Cancel anytime with instant refund processing",
      image: "/images/custom/cancellation.png"
    },
    {
      title: "Track Bookings",
      desc: "View all your journeys and download tickets",
      image: "/images/custom/tracking.png"
    },
    {
      title: "Secure Payments",
      desc: "100% secure transactions with payment history",
      image: "/images/custom/payment.png"
    }
  ];

  const stats = [
    { value: "500+", label: "Trains" },
    { value: "50K+", label: "Passengers" },
    { value: "100+", label: "Cities" },
    { value: "99.9%", label: "Uptime" },
  ];

  const popularRoutes = [
    { from: "Delhi", to: "Mumbai", duration: "16h", price: "₹500" },
    { from: "Mumbai", to: "Chennai", duration: "12h", price: "₹500" },
    { from: "Delhi", to: "Kolkata", duration: "18h", price: "₹500" },
    { from: "Bangalore", to: "Hyderabad", duration: "6h", price: "₹500" },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: 48, color: "#f0f6ff", marginBottom: 20 }}>
          Book Your Train Journey
        </h1>
        <p style={{ color: "#7a92b4", marginBottom: 30 }}>
          Fast, secure and easy railway ticket booking system
        </p>

        <button
          className="btn-gold"
          onClick={() => setPage(user ? "search" : "register")}
        >
          🔍 Search Trains
        </button>
      </div>

      {/* STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
        padding: 20
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <h2 style={{ color: "#60a5fa" }}>{s.value}</h2>
            <p style={{ color: "#7a92b4" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ROUTES */}
      <div style={{ padding: 40 }}>
        <h2 style={{ color: "#f0f6ff" }}>Popular Routes</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20
        }}>
          {popularRoutes.map((r, i) => (
            <div key={i}
              className="card"
              onClick={() => {
                sessionStorage.setItem("hs", JSON.stringify({ from: r.from, to: r.to }));
                setPage("search");
              }}
              style={{ padding: 20, cursor: "pointer" }}
            >
              <p style={{ color: "#f0b429" }}>{r.price}</p>
              <h3 style={{ color: "#fff" }}>{r.from} → {r.to}</h3>
              <p style={{ color: "#7a92b4" }}>⏱ {r.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES (FIXED ICON ISSUE) */}
      <div style={{ padding: 50 }}>
        <h2 style={{ textAlign: "center", color: "#f0f6ff" }}>
          Everything You Need
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginTop: 30
        }}>
          {features.map((f, i) => (
            <div key={i}
              className="card"
              style={{
                textAlign: "center",
                padding: 30,
                transition: "0.3s"
              }}
            >
              {/* IMAGE ICON */}
              <img
                src={f.image}
                alt={f.title}
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "contain",
                  marginBottom: 18
                }}
                onError={(e) => {
                   console.log("FAILED:", f.image);
                   e.target.src = "/images/custom/cancellatin.png"; 
             }}  
              />

              <h3 style={{ color: "#fff" }}>{f.title}</h3>
              <p style={{ color: "#7a92b4" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div style={{ textAlign: "center", padding: 50 }}>
          <h2 style={{ color: "#fff" }}>Ready to Book?</h2>
          <button
            className="btn-gold"
            onClick={() => setPage("register")}
          >
            Get Started →
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        textAlign: "center",
        padding: 20,
        color: "#7a92b4"
      }}>
        © 2024 Railway Booking System
      </div>

    </div>
  );
}
