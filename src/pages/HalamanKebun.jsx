import { Link } from "react-router-dom"
import GrafikSuhu from "../components/GrafikSuhu"
import PompaControl from "../components/PompaControl"
import SensorCard, { tentukanStatus } from "../components/SensorCard"
import { useState } from "react"

function generateData() {
  return {
    suhu:       +(22 + Math.random() * 16).toFixed(1),
    kelembapan: +(35 + Math.random() * 50).toFixed(1),
    ph:         +(4.5 + Math.random() * 4).toFixed(2),
    nutrisi:    +(100 + Math.random() * 250).toFixed(0),
  }
}

export default function HalamanKebun(){
    const [sensor, setSensor] = useState(generateData())

    return(
        <div className="bg-gray-900 min-h-screen p-8"> 
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
            <div className="mb-4">
                <GrafikSuhu />
            </div>
            <div className="mt-4">
                <PompaControl />
            </div>
        </div>
    )
}