import { useState, useEffect } from "react";
import { addTrainApi, allTrainsApi, deleteTrainApi } from "../api/api";

export default function Admin() {
  const [form, setForm]     = useState({ name: "", starting: "", destination: "", seats: "" });
  const [trains, setTrains] = useState([]);
  const [msg, setMsg]       = useState("");
  const [error, setError]   = useState("");

  const load = async () => {
    try { setTrains(await allTrainsApi()); } catch {}
  };

  useEffect(() => { load(); }, []);

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const addTrain = async () => {
    if (!form.name || !form.starting || !form.destination || !form.seats) {
      setError("All fields required."); return;
    }
    setError(""); setMsg("");
    try {
      const res = await addTrainApi({ ...form, seats: parseInt(form.seats) });
      setMsg(res.message);
      setForm({ name: "", starting: "", destination: "", seats: "" });
      load();
    } catch { setError("Failed to add train."); }
  };

  const deleteTrain = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try { await deleteTrainApi(id); load(); } catch { alert("Delete failed."); }
  };

  return (
    <div className="page">
      <h2 style={{ fontSize: "32px", marginBottom: "6px" }}>Admin Dashboard</h2>
      <p style={{ color: "var(--gray)", marginBottom: "28px" }}>Manage trains and monitor the system</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", flexWrap: "wrap" }}>
        {/* Add Train Form */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>➕ Add New Train</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--gray)", marginBottom: "5px" }}>TRAIN NAME</label>
              <input placeholder="e.g. Rajdhani Express" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--gray)", marginBottom: "5px" }}>FROM CITY</label>
              <input placeholder="e.g. Delhi" value={form.starting} onChange={set("starting")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--gray)", marginBottom: "5px" }}>TO CITY</label>
              <input placeholder="e.g. Mumbai" value={form.destination} onChange={set("destination")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--gray)", marginBottom: "5px" }}>TOTAL SEATS</label>
              <input type="number" placeholder="e.g. 100" value={form.seats} onChange={set("seats")} />
            </div>
            {error && <div className="alert-error">{error}</div>}
            {msg   && <div className="alert-success">✓ {msg}</div>}
            <button className="btn-primary" style={{ padding: "12px" }} onClick={addTrain}>Add Train</button>
          </div>
        </div>

        {/* Train List */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "18px" }}>All Trains <span className="tag">{trains.length}</span></h3>
            <button className="btn-sm" style={{ background: "var(--light)", border: "none", borderRadius: "6px", padding: "7px 14px", cursor: "pointer" }}
              onClick={load}>↻ Refresh</button>
          </div>
          {trains.length === 0 && (
            <div className="card" style={{ textAlign: "center", padding: "40px", color: "var(--gray)" }}>
              No trains added yet.
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {trains.map(t => (
              <div key={t.id} className="card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "700", marginBottom: "4px" }}>{t.name}</div>
                  <div style={{ color: "var(--gray)", fontSize: "13px" }}>
                    {t.starting} → {t.destination}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "700", fontSize: "18px", color: t.seats > 0 ? "var(--navy)" : "var(--red)" }}>{t.seats}</div>
                    <div style={{ fontSize: "11px", color: "var(--gray)" }}>seats</div>
                  </div>
                  <button className="btn-danger btn-sm" onClick={() => deleteTrain(t.id, t.name)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}