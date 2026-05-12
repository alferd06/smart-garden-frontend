import { useState, useEffect } from "react"
import SensorCard, { tentukanStatus } from "./SensorCard"
import PompaControl from "./PompaControl"
import KartuKebun from "./KartuKebun"
import FarmDashboard from "./FarmDashboard"
import GrafikSuhu from "./GrafikSuhu"
import { Route, Routes } from "react-router-dom"
import HalamanKebun from "./pages/HalamanKebun"
import HalamanUtama from "./pages/HalamanUtama"

function generateData() {
  return {
    suhu:       +(22 + Math.random() * 16).toFixed(1),
    kelembapan: +(35 + Math.random() * 50).toFixed(1),
    ph:         +(4.5 + Math.random() * 4).toFixed(2),
    nutrisi:    +(100 + Math.random() * 250).toFixed(0),
  }
}

function AppDefault() {
  const [sensor, setSensor] = useState(generateData())
  const [pompa, setPompa] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString("id-ID"))

  useEffect(() => {
    const interval = setInterval(() => {
      setSensor(generateData())
      setLastUpdate(new Date().toLocaleTimeString("id-ID"))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen p-8">

      {/* header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-white text-3xl font-bold">🌿 Kebun Cerdas</h1>
          <p className="text-gray-400 text-sm mt-1">Pemantauan Sensor Real-Time</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Terakhir diperbarui</p>
          <p className="text-green-400 text-sm font-medium mt-1">{lastUpdate}</p>
        </div>
      </div>

      {/* grid sensor */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <SensorCard
          icon="🌡️" label="Suhu Udara"
          nilai={sensor.suhu} satuan="°C"
          status={tentukanStatus("suhu", sensor.suhu)}
        />
        <SensorCard
          icon="💧" label="Kelembapan"
          nilai={sensor.kelembapan} satuan="%"
          status={tentukanStatus("kelembapan", sensor.kelembapan)}
        />
        <SensorCard
          icon="⚗️" label="pH Tanah"
          nilai={sensor.ph} satuan="pH"
          status={tentukanStatus("ph", sensor.ph)}
        />
        <SensorCard
          icon="🧪" label="Nutrisi"
          nilai={sensor.nutrisi} satuan="mg/L"
          status={tentukanStatus("nutrisi", sensor.nutrisi)}
        />
      </div>

      {/* pompa — full width */}
      <PompaControl
        aktif={pompa}
        onToggle={() => setPompa(p => !p)}
      />
      {/* kartu kebun */}
      <KartuKebun
        namaAwal="Kebun Mawar"
        lokasi="Rooftop Blok A"
        luas={20}
        jumlahSensor={4}
        aktif={true}
      />

      <GrafikSuhu />

    </div>
  )
}

function App(){
  return(
    <Routes>
      <Route path="/" element={AppDefault()}/>
      <Route path="/kebun-utama" element={<HalamanUtama />}/>
      <Route path="/kebun-cabang" element={<HalamanKebun />}/>
    </Routes>
  ) 
}

export default App