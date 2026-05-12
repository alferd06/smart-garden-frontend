import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

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

function generateData(iter, df){
    for (let i = 10; i < iter + 10; i++){
        const data = {waktu: `${i}:00`, suhu: generateTemp()}
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
    <LineChart data={df} width={500} height={300}>
        <XAxis dataKey={"waktu"}/>
        <YAxis />
        <Line dataKey={"suhu"}/>
    </LineChart>)
}

export default GrafikSuhu