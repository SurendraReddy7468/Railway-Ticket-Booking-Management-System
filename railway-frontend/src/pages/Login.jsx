import { useState } from "react";
import { loginApi } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login({ setPage }) {
  const { loginUser } = useAuth();
  const [form, setForm]   = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields"); return; }
    setLoading(true); setError("");
    try {
      const res = await loginApi(form.email, form.password);
      if (res.token) { loginUser(res.token); setPage("search"); }
      else setError(res.error || "Login failed");
    } catch { setError("Cannot connect to server. Is backend running?"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🚂</div>
          <h2 style={{ fontSize: "26px" }}>Welcome Back</h2>
          <p style={{ color: "var(--gray)", fontSize: "14px", marginTop: "6px" }}>Sign in to your RailBook account</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Email Address</label>
            <input type="email" placeholder="you@example.com" onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Password</label>
            <input type="password" placeholder="••••••••" onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>

          {error && <div className="alert-error">{error}</div>}

          <button className="btn-primary" style={{ width: "100%", padding: "13px", marginTop: "4px" }}
            onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </div>

        <hr className="divider" />
        <p style={{ textAlign: "center", fontSize: "14px", color: "var(--gray)" }}>
          Don't have an account?{" "}
          <button onClick={() => setPage("register")} style={{ background: "none", color: "var(--navy)", fontWeight: "700", border: "none", cursor: "pointer" }}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}