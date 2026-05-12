import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function generateTemp(){
    const min = 25
    const max = 35
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateTime(){
    const jam = Math.random() * 24
    const menit = Math.random() * 60
    return `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}`
}

function generateHumidity(){
    const min = 0
    const max = 100
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateData(iter, df){
    for (let i = 10; i < iter + 10; i++){
        const data = {waktu: `${i}:00`, suhu: generateTemp(), kelembapan: generateHumidity()}
        df.push(data)
        }
    }

function GrafikSuhu(){
    const df = useMemo(() => {
        const data = []
        generateData(10, data)
        return data
    }, []
    )

    return(
        <div className="bg-gray-800 rounded-2xl mt-4 p-6 border-l-4 border-orange-400">
            <h2 className="text-white text-2xl font-bold text-center mb-4">Tren Suhu</h2>
            <LineChart data={df} width={600} height={300} className="pr-4">
                <XAxis dataKey="waktu"/>
                <YAxis />
                <Line dataKey="suhu" stroke="#ef4444"/>
                <Line dataKey="kelembapan" stroke="#00aeff"/>
                <Tooltip />
                <CartesianGrid />
            </LineChart>
        </div>)
}

export default GrafikSuhu