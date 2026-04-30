import { useState, useEffect } from "react";
import { addTrainApi, allTrainsApi, deleteTrainApi, adminStatsApi, getFeedbackApi } from "../api/api";

export default function Admin() {
  const [form, setForm]       = useState({ train_name: "", train_number: "", source: "", destination: "", total_seats: "" });
  const [trains, setTrains]   = useState([]);
  const [stats, setStats]     = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [tab, setTab]         = useState("trains");
  const [msg, setMsg]         = useState("");
  const [error, setError]     = useState("");

  const load = async () => {
    try { setTrains(await allTrainsApi()); } catch {}
    try { setStats(await adminStatsApi()); } catch {}
    try { setFeedback(await getFeedbackApi()); } catch {}
  };

  useEffect(() => { load(); }, []);

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const addTrain = async () => {
    if (!form.train_name || !form.train_number || !form.source || !form.destination || !form.total_seats) {
      setError("All fields required."); return;
    }
    setError(""); setMsg("");
    try {
      const res = await addTrainApi({ ...form, total_seats: parseInt(form.total_seats) });
      setMsg(res.message);
      setForm({ train_name: "", train_number: "", source: "", destination: "", total_seats: "" });
      load();
    } catch { setError("Failed to add train."); }
  };

  const deleteTrain = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try { await deleteTrainApi(id); load(); } catch { alert("Delete failed."); }
  };

  const tabStyle = (t) => ({
    padding: "8px 20px", borderRadius: "8px", border: "none",
    cursor: "pointer", fontWeight: "600", fontSize: "14px",
    background: tab === t ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#0e2040",
    color: tab === t ? "white" : "#7a92b4",
    border: tab === t ? "none" : "1px solid rgba(99,160,255,0.15)",
  });

  return (
    <div className="page">
      <h2 className="section-title">Admin Dashboard</h2>
      <p className="section-sub">Manage trains and monitor the system</p>

      {/* Stats */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Users",    value: stats.total_users,     icon: "👥" },
            { label: "Total Trains",   value: stats.total_trains,    icon: "🚂" },
            { label: "Active Bookings",value: stats.active_bookings, icon: "🎫" },
            { label: "Total Revenue",  value: `₹${stats.total_revenue}`, icon: "💰" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#60a5fa" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#7a92b4", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button style={tabStyle("trains")}   onClick={() => setTab("trains")}>🚂 Trains</button>
        <button style={tabStyle("feedback")} onClick={() => setTab("feedback")}>💬 Feedback</button>
      </div>

      {tab === "trains" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
          {/* Add Train Form */}
          <div className="card" style={{ alignSelf: "start" }}>
            <h3 style={{ fontSize: 18, marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>➕ Add New Train</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>TRAIN NAME</label>
                <input placeholder="e.g. Rajdhani Express" value={form.train_name} onChange={set("train_name")} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>TRAIN NUMBER</label>
                <input placeholder="e.g. 12301" value={form.train_number} onChange={set("train_number")} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>FROM CITY</label>
                <input placeholder="e.g. Delhi" value={form.source} onChange={set("source")} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>TO CITY</label>
                <input placeholder="e.g. Mumbai" value={form.destination} onChange={set("destination")} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>TOTAL SEATS</label>
                <input type="number" placeholder="e.g. 100" value={form.total_seats} onChange={set("total_seats")} />
              </div>
              {error && <div className="alert-error">{error}</div>}
              {msg   && <div className="alert-success">✓ {msg}</div>}
              <button className="btn-primary" style={{ padding: 12 }} onClick={addTrain}>Add Train</button>
            </div>
          </div>

          {/* Train List */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontFamily: "'Syne', sans-serif" }}>All Trains <span className="tag">{trains.length}</span></h3>
              <button className="btn-outline btn-sm" onClick={load}>↻ Refresh</button>
            </div>
            {trains.length === 0 && (
              <div className="card" style={{ textAlign: "center", padding: 40, color: "#7a92b4" }}>No trains added yet.</div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {trains.map(t => (
                <div key={t.id} className="card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <div style={{ fontWeight: 700, color: "#f0f6ff" }}>{t.train_name}</div>
                      <span className="tag">{t.train_number}</span>
                    </div>
                    <div style={{ color: "#7a92b4", fontSize: 13 }}>{t.source} → {t.destination}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 700, fontSize: 18, color: t.available_seats > 0 ? "#60a5fa" : "#f87171" }}>{t.available_seats}</div>
                      <div style={{ fontSize: 11, color: "#7a92b4" }}>/ {t.total_seats} seats</div>
                    </div>
                    <button className="btn-danger btn-sm" onClick={() => deleteTrain(t.id, t.train_name)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "feedback" && (
        <div>
          <h3 style={{ fontSize: 18, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>User Feedback <span className="tag">{feedback.length}</span></h3>
          {feedback.length === 0 && (
            <div className="card" style={{ textAlign: "center", padding: 40, color: "#7a92b4" }}>No feedback yet.</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {feedback.map(f => (
              <div key={f.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, color: "#f0f6ff" }}>{f.user_name} <span style={{ color: "#7a92b4", fontWeight: 400, fontSize: 13 }}>({f.email})</span></div>
                  <div style={{ fontSize: 12, color: "#7a92b4" }}>{new Date(f.submitted_at).toLocaleDateString()}</div>
                </div>
                <p style={{ color: "#7a92b4", fontSize: 14, lineHeight: 1.6 }}>{f.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}