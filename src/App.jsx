import SensorCard from "./SensorCard"

function App() {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-6">🌿 Kebun Cerdas</h1>

      <div className="grid grid-cols-3 gap-4">
        <SensorCard icon="🌡️" label="Suhu Udara" nilai="28.5" satuan="°C" status="normal" />
        <SensorCard icon="💧" label="Kelembapan" nilai="65" satuan="%" status="optimal" />
        <SensorCard icon="⚗️" label="pH Tanah" nilai="3.2" satuan="pH" status="kering" />
      </div>
    </div>
  )
}

export default App