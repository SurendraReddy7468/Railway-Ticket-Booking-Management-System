import { useAuth } from "../context/AuthContext";

export default function Navbar({ setPage, currentPage }) {
  const { user, logout } = useAuth();

  const navBtn = (label, page) => (
    <button
      onClick={() => setPage(page)}
      style={{
        background: currentPage === page ? "rgba(232,184,75,0.15)" : "transparent",
        color: currentPage === page ? "var(--gold)" : "rgba(255,255,255,0.75)",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s"
      }}
      onMouseEnter={e => { if(currentPage !== page) e.target.style.color = "white"; }}
      onMouseLeave={e => { if(currentPage !== page) e.target.style.color = "rgba(255,255,255,0.75)"; }}
    >
      {label}
    </button>
  );

  return (
    <nav style={{
      background: "var(--navy)",
      padding: "0 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <div
        onClick={() => setPage("home")}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <div style={{
          background: "var(--gold)",
          borderRadius: "8px",
          width: "32px", height: "32px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px"
        }}>🚂</div>
        <span style={{
          fontFamily: "Playfair Display, serif",
          color: "white",
          fontSize: "20px",
          fontWeight: "700",
          letterSpacing: "0.5px"
        }}>RailBook</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {navBtn("Home", "home")}
        {!user && (<>
          {navBtn("Login", "login")}
          {navBtn("Register", "register")}
        </>)}
        {user && (<>
          {navBtn("Search", "search")}
          {navBtn("My Bookings", "bookings")}
          {user.isAdmin && navBtn("Admin", "admin")}
        </>)}
      </div>

      {/* User / Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (<>
          <span style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px"
          }}>
            {user.isAdmin ? "👑 Admin" : "👤 User"}
          </span>
          <button
            onClick={logout}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "7px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >Logout</button>
        </>) : (
          <button
            onClick={() => setPage("register")}
            className="btn-gold btn-sm"
          >Get Started</button>
        )}
      </div>
    </nav>
  );
}