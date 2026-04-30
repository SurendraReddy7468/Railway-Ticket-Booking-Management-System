import { useState, useEffect } from "react";
import { searchTrainApi } from "../api/api";
import TrainCard from "../components/TrainCard";

export default function SearchTrains() {
  const [from, setFrom]     = useState("");
  const [to, setTo]         = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const hs = sessionStorage.getItem("hs");
    if (hs) {
      const { from: f, to: t } = JSON.parse(hs);
      setFrom(f); setTo(t);
      sessionStorage.removeItem("hs");
    }
  }, []);

  const search = async () => {
    if (!from || !to) { setError("Please enter both cities"); return; }
    setLoading(true); setError(""); setSearched(false);
    try {
      const res = await searchTrainApi({ source: from, destination: to });
      setTrains(Array.isArray(res) ? res : []);
      setSearched(true);
      if (!Array.isArray(res) || res.length === 0)
        setError(`No trains found for ${from} → ${to}`);
    } catch { setError("Search failed. Is the backend running?"); }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2 className="section-title">Search Trains</h2>
      <p className="section-sub">Find available trains between cities</p>

      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: "block", marginBottom: 6 }}>FROM CITY</label>
            <input placeholder="e.g. Delhi" value={from}
              onChange={e => setFrom(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()} />
          </div>
          <div style={{ fontSize: 24, color: "#f0b429", paddingBottom: 8 }}>⇄</div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: "block", marginBottom: 6 }}>TO CITY</label>
            <input placeholder="e.g. Mumbai" value={to}
              onChange={e => setTo(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()} />
          </div>
          <button className="btn-primary" style={{ padding: "11px 32px", whiteSpace: "nowrap" }}
            onClick={search} disabled={loading}>
            {loading ? "Searching…" : "🔍 Search"}
          </button>
        </div>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: 20 }}>{error}</div>}

      {searched && trains.length > 0 && (
        <p style={{ color: "#7a92b4", fontSize: 14, marginBottom: 16 }}>
          Found <strong style={{ color: "#f0f6ff" }}>{trains.length}</strong> train{trains.length > 1 ? "s" : ""} for <strong style={{ color: "#f0f6ff" }}>{from} → {to}</strong>
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {trains.map(t => <TrainCard key={t.id} train={t} />)}
      </div>
    </div>
  );
}