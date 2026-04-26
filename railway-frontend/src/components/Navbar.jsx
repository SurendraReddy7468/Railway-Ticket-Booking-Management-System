import { useAuth } from "../context/AuthContext";

export default function Navbar({ setPage, currentPage }) {
  const { user, logout } = useAuth();

  const navBtn = (label, page, icon) => (
    <button
      onClick={() => setPage(page)}
      style={{
        background: currentPage === page ? "rgba(59,130,246,0.15)" : "transparent",
        color: currentPage === page ? "#60a5fa" : "#7a92b4",
        border: currentPage === page ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
        padding: "7px 14px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex", alignItems: "center", gap: "5px",
      }}
      onMouseEnter={e => { if (currentPage !== page) { e.currentTarget.style.color = "#f0f6ff"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}}
      onMouseLeave={e => { if (currentPage !== page) { e.currentTarget.style.color = "#7a92b4"; e.currentTarget.style.background = "transparent"; }}}
    >
      {icon} {label}
    </button>
  );

  return (
    <nav style={{
      background: "rgba(7,18,36,0.97)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(99,160,255,0.1)",
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <div style={{
          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
          borderRadius: "10px", width: "36px", height: "36px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", boxShadow: "0 4px 12px rgba(59,130,246,0.4)"
        }}>🚂</div>
        <span style={{ fontFamily: "'Syne', sans-serif", color: "#f0f6ff", fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" }}>
          Rail<span style={{ color: "#f0b429" }}>Book</span>
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {navBtn("Home", "home", "🏠")}
        {!user && (<>
          {navBtn("Login",    "login",    "🔑")}
          {navBtn("Register", "register", "✨")}
        </>)}
        {user && (<>
          {navBtn("Search",      "search",   "🔍")}
          {navBtn("My Bookings", "bookings", "🎫")}
          {navBtn("PNR Status",  "pnr",      "📋")}
          {user.isAdmin && navBtn("Admin", "admin", "⚙️")}
        </>)}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (<>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(14,32,64,0.8)",
            border: "1px solid rgba(99,160,255,0.15)",
            borderRadius: "10px", padding: "6px 14px",
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: "700", color: "white",
            }}>
              {(user.name || "U")[0].toUpperCase()}
            </div>
            <span style={{ fontSize: "13px", color: "#f0f6ff", fontWeight: "500" }}>
              {user.name || "User"}
            </span>
            {user.isAdmin && (
              <span style={{ fontSize: "10px", background: "rgba(240,180,41,0.15)", color: "#f0b429", border: "1px solid rgba(240,180,41,0.3)", padding: "1px 6px", borderRadius: "4px", fontWeight: "700" }}>
                ADMIN
              </span>
            )}
          </div>
          <button onClick={logout} style={{
            background: "transparent", color: "#7a92b4",
            border: "1px solid rgba(99,160,255,0.15)",
            padding: "7px 14px", borderRadius: "8px",
            fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#7a92b4"; e.currentTarget.style.borderColor = "rgba(99,160,255,0.15)"; }}
          >Logout</button>
        </>) : (
          <button onClick={() => setPage("register")} className="btn-gold btn-sm">
            Get Started →
          </button>
        )}
      </div>
    </nav>
  );
}