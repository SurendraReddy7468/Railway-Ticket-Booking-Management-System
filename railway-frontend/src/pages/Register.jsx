import { useState } from "react";
import { registerApi } from "../api/api";

export default function Register({ setPage }) {
  const [form,    setForm]    = useState({ name: "", email: "", password: "", phone: "", is_admin: false });
  const [msg,     setMsg]     = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!form.name || !form.email || !form.password) { setError("Name, email and password are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError(""); setMsg("");
    try {
      const res = await registerApi(form);
      if (res.error) setError(res.error);
      else { setMsg(res.message); setTimeout(() => setPage("login"), 1500); }
    } catch { setError("Cannot connect to server."); }
    setLoading(false);
  };

  const s = f => e => setForm({ ...form, [f]: e.target.value });

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div className="card" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🎫</div>
            <h2 style={{ fontSize: 24, fontFamily: "'Syne', sans-serif" }}>Create Account</h2>
            <p style={{ color: "#7a92b4", fontSize: 14, marginTop: 6 }}>Join RailBook and start booking</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 6 }}>FULL NAME *</label>
                <input placeholder="Ravi Kumar" onChange={s("name")} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 6 }}>PHONE</label>
                <input placeholder="9876543210" onChange={s("phone")} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6 }}>EMAIL *</label>
              <input type="email" placeholder="you@example.com" onChange={s("email")} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6 }}>PASSWORD *</label>
              <input type="password" placeholder="Min. 6 characters" onChange={s("password")} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={form.is_admin} onChange={e => setForm({ ...form, is_admin: e.target.checked })}
                style={{ width: 16, height: 16, accentColor: "#3b82f6" }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f6ff" }}>Register as Admin</div>
                <div style={{ fontSize: 12, color: "#7a92b4" }}>Admins can add and manage trains</div>
              </div>
            </label>
            {error && <div className="alert-error">{error}</div>}
            {msg   && <div className="alert-success">✓ {msg}</div>}
            <button className="btn-primary" style={{ width: "100%", padding: 13, marginTop: 4 }} onClick={handle} disabled={loading}>
              {loading ? "Creating…" : "Create Account →"}
            </button>
          </div>
          <div className="divider" />
          <p style={{ textAlign: "center", fontSize: 14, color: "#7a92b4" }}>
            Already have an account?{" "}
            <button onClick={() => setPage("login")} style={{ background: "none", color: "#60a5fa", fontWeight: 700, border: "none", cursor: "pointer" }}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}