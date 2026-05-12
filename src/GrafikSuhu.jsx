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

const df=[]
function generateData(iter){
    for (let i = 0; i < iter; i++){
        const data = {waktu: `${generateTime()}`, suhu: generateTemp()}
        df.push(data)
    }
}

generateData(10)

function GrafikSuhu(){
    return (
    <LineChart data={df}>
        <XAxis />
        <YAxis />
        <Line />
    </LineChart>
    )
}

export default GrafikSuhu