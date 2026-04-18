import { useState } from "react";
import { registerApi } from "../api/api";

export default function Register({ setPage }) {
  const [form, setForm]   = useState({ email: "", password: "", is_admin: false });
  const [msg, setMsg]     = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError(""); setMsg("");
    try {
      const res = await registerApi(form);
      if (res.error) { setError(res.error); }
      else { setMsg(res.message); setTimeout(() => setPage("login"), 1500); }
    } catch { setError("Cannot connect to server."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎫</div>
          <h2 style={{ fontSize: "26px" }}>Create Account</h2>
          <p style={{ color: "var(--gray)", fontSize: "14px", marginTop: "6px" }}>Join RailBook and start booking</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Email Address</label>
            <input type="email" placeholder="you@example.com" onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Password</label>
            <input type="password" placeholder="Min. 6 characters" onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "var(--light)", borderRadius: "8px", cursor: "pointer" }}>
            <input type="checkbox" checked={form.is_admin} onChange={e => setForm({ ...form, is_admin: e.target.checked })}
              style={{ width: "16px", height: "16px", accentColor: "var(--navy)" }} />
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>Register as Admin</div>
              <div style={{ fontSize: "12px", color: "var(--gray)" }}>Admins can add and manage trains</div>
            </div>
          </label>

          {error && <div className="alert-error">{error}</div>}
          {msg   && <div className="alert-success">✓ {msg} — Redirecting to login…</div>}

          <button className="btn-primary" style={{ width: "100%", padding: "13px", marginTop: "4px" }}
            onClick={handleRegister} disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </div>

        <hr className="divider" />
        <p style={{ textAlign: "center", fontSize: "14px", color: "var(--gray)" }}>
          Already have an account?{" "}
          <button onClick={() => setPage("login")} style={{ background: "none", color: "var(--navy)", fontWeight: "700", border: "none", cursor: "pointer" }}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}