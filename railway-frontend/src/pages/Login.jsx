import { useState } from "react";
import { loginApi } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login({ setPage }) {
  const { loginUser } = useAuth();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handle = async () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true); setError("");
    try {
      const res = await loginApi(email, password);
      if (res.error) setError(res.error);
      else { loginUser(res); setPage("home"); }
    } catch { setError("Cannot connect to server."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div className="card" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🚂</div>
            <h2 style={{ fontSize: 24, fontFamily: "'Syne', sans-serif" }}>Welcome Back</h2>
            <p style={{ color: "#7a92b4", fontSize: 14, marginTop: 6 }}>Login to your RailBook account</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6 }}>EMAIL</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handle()} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6 }}>PASSWORD</label>
              <input type="password" placeholder="Your password" value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handle()} />
            </div>
            {error && <div className="alert-error">{error}</div>}
            <button className="btn-primary" style={{ width: "100%", padding: 13, marginTop: 4 }}
              onClick={handle} disabled={loading}>
              {loading ? "Logging in…" : "Login →"}
            </button>
          </div>
          <div className="divider" />
          <p style={{ textAlign: "center", fontSize: 14, color: "#7a92b4" }}>
            Don't have an account?{" "}
            <button onClick={() => setPage("register")} style={{ background: "none", color: "#60a5fa", fontWeight: 700, border: "none", cursor: "pointer" }}>
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}