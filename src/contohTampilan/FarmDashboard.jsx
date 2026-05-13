import { useState, useEffect } from "react";

// ── dummy data generator ──────────────────────────────────────────────────────
const generateSensorData = () => ({
  temperature: +(22 + Math.random() * 8).toFixed(1),
  humidity: +(55 + Math.random() * 30).toFixed(1),
  ph: +(5.5 + Math.random() * 2).toFixed(2),
  nitrogen: +(180 + Math.random() * 80).toFixed(0),
  phosphorus: +(30 + Math.random() * 20).toFixed(0),
  potassium: +(150 + Math.random() * 60).toFixed(0),
  soilMoisture: +(40 + Math.random() * 35).toFixed(1),
  light: +(3000 + Math.random() * 5000).toFixed(0),
});

const generateHistory = () =>
  Array.from({ length: 12 }, (_, i) => ({
    time: `${String(new Date().getHours() - 11 + i).padStart(2, "0")}:00`,
    temperature: +(22 + Math.random() * 8).toFixed(1),
    humidity: +(55 + Math.random() * 30).toFixed(1),
    soilMoisture: +(40 + Math.random() * 35).toFixed(1),
  }));

// ── status helpers ────────────────────────────────────────────────────────────
const phStatus = (v) =>
  v < 5.5 ? "acidic" : v > 7.5 ? "alkaline" : "optimal";
const moistureStatus = (v) =>
  v < 45 ? "dry" : v > 70 ? "wet" : "optimal";
const tempStatus = (v) =>
  v < 18 ? "cold" : v > 32 ? "hot" : "optimal";

const STATUS_COLOR = {
  optimal: "#4ade80",
  dry: "#fb923c",
  wet: "#60a5fa",
  acidic: "#f87171",
  alkaline: "#a78bfa",
  cold: "#93c5fd",
  hot: "#f87171",
};

// ── tiny sparkline ────────────────────────────────────────────────────────────
function Sparkline({ data, color = "#4ade80" }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 120, h = 36;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / range) * h,
  ]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`g-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g-${color.replace("#","")})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3" fill={color} />
    </svg>
  );
}

// ── horizontal bar ────────────────────────────────────────────────────────────
function Bar({ value, max, color }) {
  return (
    <div style={{ background: "#1a2535", borderRadius: 6, height: 6, overflow: "hidden", marginTop: 6 }}>
      <div style={{
        width: `${Math.min((value / max) * 100, 100)}%`,
        height: "100%",
        background: color,
        borderRadius: 6,
        transition: "width 0.8s ease",
      }} />
    </div>
  );
}

// ── sensor card ───────────────────────────────────────────────────────────────
function SensorCard({ icon, label, value, unit, status, sparkData, sparkColor, max, children }) {
  const sc = STATUS_COLOR[status] || "#4ade80";
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f1c2e 0%, #121f30 100%)",
      border: `1px solid #1e3050`,
      borderTop: `2px solid ${sc}`,
      borderRadius: 16,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = `0 12px 40px ${sc}22`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}>
      {/* glow blob */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80,
        background: sc, opacity: 0.06, borderRadius: "50%", filter: "blur(20px)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'DM Mono', monospace" }}>
            {icon} {label}
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#e8f4ff", fontFamily: "'Syne', sans-serif", lineHeight: 1.1, marginTop: 4 }}>
            {value}<span style={{ fontSize: 14, color: "#5a7a9a", marginLeft: 3 }}>{unit}</span>
          </div>
        </div>
        <div style={{
          fontSize: 10, padding: "3px 9px", borderRadius: 20,
          background: `${sc}18`, color: sc, border: `1px solid ${sc}40`,
          fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: 0.8,
          whiteSpace: "nowrap", marginTop: 2,
        }}>
          {status}
        </div>
      </div>

      {sparkData && <Sparkline data={sparkData} color={sparkColor || sc} />}
      {max && <Bar value={parseFloat(value)} max={max} color={sc} />}
      {children}
    </div>
  );
}

// ── pump control ──────────────────────────────────────────────────────────────
function PumpControl({ active, onToggle }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f1c2e 0%, #121f30 100%)",
      border: `1px solid #1e3050`,
      borderTop: `2px solid ${active ? "#4ade80" : "#1e3050"}`,
      borderRadius: 16,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}>
      <div style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'DM Mono', monospace" }}>
        💧 Pompa Air
      </div>

      {/* pump visual */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: active ? "radial-gradient(circle, #4ade8033, #4ade8008)" : "radial-gradient(circle, #1e303050, #0f1c2e)",
          border: `2px solid ${active ? "#4ade80" : "#2a3f5a"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24,
          boxShadow: active ? "0 0 20px #4ade8040" : "none",
          transition: "all 0.4s ease",
          animation: active ? "pulse-ring 2s infinite" : "none",
        }}>
          {active ? "🔵" : "⚪"}
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: active ? "#4ade80" : "#3a5570", fontFamily: "'Syne', sans-serif" }}>
            {active ? "AKTIF" : "NONAKTIF"}
          </div>
          <div style={{ fontSize: 11, color: "#3a5570", fontFamily: "'DM Mono', monospace" }}>
            {active ? "Pompa sedang menyiram" : "Pompa dalam keadaan standby"}
          </div>
        </div>
      </div>

      {/* toggle button */}
      <button
        onClick={onToggle}
        style={{
          padding: "12px 0",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "'Syne', sans-serif",
          letterSpacing: 1,
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          background: active
            ? "linear-gradient(135deg, #ef4444, #dc2626)"
            : "linear-gradient(135deg, #4ade80, #22c55e)",
          color: active ? "#fff" : "#052010",
          boxShadow: active ? "0 4px 20px #ef444440" : "0 4px 20px #4ade8040",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        {active ? "⏹ Matikan Pompa" : "▶ Hidupkan Pompa"}
      </button>
    </div>
  );
}

// ── NPK card ──────────────────────────────────────────────────────────────────
function NutrientCard({ n, p, k }) {
  const nutrients = [
    { label: "Nitrogen (N)", value: n, max: 300, color: "#4ade80", unit: "mg/L" },
    { label: "Phosphorus (P)", value: p, max: 60, color: "#60a5fa", unit: "mg/L" },
    { label: "Potassium (K)", value: k, max: 250, color: "#f59e0b", unit: "mg/L" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f1c2e 0%, #121f30 100%)",
      border: "1px solid #1e3050",
      borderTop: "2px solid #f59e0b",
      borderRadius: 16,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}>
      <div style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'DM Mono', monospace" }}>
        🧪 Nutrisi NPK
      </div>
      {nutrients.map(({ label, value, max, color, unit }) => (
        <div key={label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#7a9aba", fontFamily: "'DM Mono', monospace" }}>{label}</span>
            <span style={{ fontSize: 12, color: color, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
              {value} <span style={{ color: "#3a5570" }}>{unit}</span>
            </span>
          </div>
          <Bar value={parseFloat(value)} max={max} color={color} />
        </div>
      ))}
    </div>
  );
}

// ── last updated ticker ───────────────────────────────────────────────────────
function LastUpdated({ time }) {
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#3a5570" }}>
      Diperbarui: {time}
    </span>
  );
}

// ── main dashboard ────────────────────────────────────────────────────────────
export default function FarmDashboard() {
  const [sensors, setSensors] = useState(generateSensorData());
  const [history, setHistory] = useState(generateHistory());
  const [pump, setPump] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString("id-ID"));
  const [tick, setTick] = useState(0);

  // simulate real-time updates every 4 seconds
  useEffect(() => {
    const id = setInterval(() => {
      const newData = generateSensorData();
      setSensors(newData);
      setLastUpdate(new Date().toLocaleTimeString("id-ID"));
      setHistory(prev => {
        const next = [...prev.slice(1), {
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          temperature: newData.temperature,
          humidity: newData.humidity,
          soilMoisture: newData.soilMoisture,
        }];
        return next;
      });
      setTick(t => t + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const tempSpark = history.map(h => h.temperature);
  const humSpark = history.map(h => h.humidity);
  const moistSpark = history.map(h => h.soilMoisture);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060e1a; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 #4ade8060; }
          70% { box-shadow: 0 0 0 10px #4ade8000; }
          100% { box-shadow: 0 0 0 0 #4ade8000; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060e1a; }
        ::-webkit-scrollbar-thumb { background: #1e3050; border-radius: 3px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#060e1a",
        color: "#e8f4ff",
        fontFamily: "'Syne', sans-serif",
        padding: "24px",
      }}>

        {/* ── header ── */}
        <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", background: "#4ade80",
                animation: "blink 2s infinite",
                boxShadow: "0 0 8px #4ade80",
              }} />
              <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: 1.5 }}>
                Live Monitoring
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.1 }}>
              🌿 Kebun Cerdas
            </h1>
            <p style={{ fontSize: 13, color: "#4a6a8a", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
              Rooftop Garden — Pemantauan Sensor Real-Time
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <LastUpdated time={lastUpdate} />
            <div style={{ fontSize: 10, color: "#2a4060", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
              Siklus ke-{tick + 1} • interval 4 dtk
            </div>
          </div>
        </div>

        {/* ── sensor grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}>
          <SensorCard
            icon="🌡️" label="Suhu Udara"
            value={sensors.temperature} unit="°C"
            status={tempStatus(sensors.temperature)}
            sparkData={tempSpark} sparkColor="#fb923c"
          />
          <SensorCard
            icon="💧" label="Kelembapan Udara"
            value={sensors.humidity} unit="%"
            status={sensors.humidity < 40 ? "dry" : sensors.humidity > 80 ? "wet" : "optimal"}
            sparkData={humSpark} sparkColor="#60a5fa"
          />
          <SensorCard
            icon="🌱" label="Kelembapan Tanah"
            value={sensors.soilMoisture} unit="%"
            status={moistureStatus(sensors.soilMoisture)}
            sparkData={moistSpark} sparkColor="#4ade80"
          />
          <SensorCard
            icon="⚗️" label="pH Tanah"
            value={sensors.ph} unit="pH"
            status={phStatus(sensors.ph)}
            max={14}
          />
          <SensorCard
            icon="☀️" label="Intensitas Cahaya"
            value={sensors.light} unit="lux"
            status={sensors.light < 2000 ? "dry" : "optimal"}
            max={10000}
          />
        </div>

        {/* ── second row: NPK + pump ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}>
          <NutrientCard n={sensors.nitrogen} p={sensors.phosphorus} k={sensors.potassium} />
          <PumpControl active={pump} onToggle={() => setPump(p => !p)} />
        </div>

        {/* ── history mini-chart (table style) ── */}
        <div style={{
          background: "linear-gradient(135deg, #0f1c2e 0%, #121f30 100%)",
          border: "1px solid #1e3050",
          borderRadius: 16,
          padding: "18px 20px",
        }}>
          <div style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>
            📊 Riwayat 12 Pembacaan Terakhir
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
              <thead>
                <tr>
                  {["Waktu", "Suhu (°C)", "Kelembapan (%)", "Tanah (%)"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 12px", color: "#3a5570", fontWeight: 500, borderBottom: "1px solid #1e3050" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((row, i) => (
                  <tr key={i} style={{ background: i === history.length - 1 ? "#4ade8008" : "transparent" }}>
                    <td style={{ padding: "7px 12px", color: i === history.length - 1 ? "#4ade80" : "#3a5570" }}>{row.time}</td>
                    <td style={{ padding: "7px 12px", color: "#fb923c" }}>{row.temperature}</td>
                    <td style={{ padding: "7px 12px", color: "#60a5fa" }}>{row.humidity}</td>
                    <td style={{ padding: "7px 12px", color: "#4ade80" }}>{row.soilMoisture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── footer ── */}
        <div style={{ marginTop: 20, textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#1e3050" }}>
          Data dummy — siap dihubungkan ke MQTT / REST API
        </div>
      </div>
    </>
  );
}
