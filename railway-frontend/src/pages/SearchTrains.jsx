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
      const res = await searchTrainApi({ starting: from, destination: to });
      setTrains(Array.isArray(res) ? res : []);
      setSearched(true);
      if (!res.length) setError(`No trains found for ${from} → ${to}`);
    } catch { setError("Search failed. Is the backend running?"); }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2 style={{ fontSize: "32px", marginBottom: "6px" }}>Search Trains</h2>
      <p style={{ color: "var(--gray)", marginBottom: "28px" }}>Find available trains between cities</p>

      {/* Search Form */}
      <div className="card" style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--gray)", marginBottom: "6px", letterSpacing: "1px" }}>FROM CITY</label>
            <input placeholder="e.g. Delhi" value={from} onChange={e => setFrom(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()} />
          </div>
          <div style={{ fontSize: "24px", color: "var(--gold)", paddingBottom: "8px" }}>⇄</div>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--gray)", marginBottom: "6px", letterSpacing: "1px" }}>TO CITY</label>
            <input placeholder="e.g. Mumbai" value={to} onChange={e => setTo(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()} />
          </div>
          <button className="btn-primary" style={{ padding: "11px 32px", whiteSpace: "nowrap" }}
            onClick={search} disabled={loading}>
            {loading ? "Searching…" : "🔍 Search"}
          </button>
        </div>
      </div>

      {error && <div className="alert-error" style={{ marginBottom: "20px" }}>{error}</div>}

      {searched && trains.length > 0 && (
        <p style={{ color: "var(--gray)", fontSize: "14px", marginBottom: "16px" }}>
          Found <strong>{trains.length}</strong> train{trains.length > 1 ? "s" : ""} for <strong>{from} → {to}</strong>
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {trains.map(t => <TrainCard key={t.id} train={t} />)}
      </div>
    </div>
  );
}