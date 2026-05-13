import {useEffect, useState} from 'react'

function SensorSuhu() {
    const [suhu, setSuhu] = useState(30)
    const [berjalan, setBerjalan] = useState(true)

    const min = 20
    const max = 40

    useEffect(() => {
        if(!berjalan) return
        
        const interval = setInterval(() => {
            const random = Math.floor(Math.random() * (max - min + 1)) + min
            setSuhu(random)
        }, 3000)

        return () => clearInterval(interval)
    }, [berjalan])

    function cekSuhu(suhu){
        if (suhu < 25){
            return "Terlalu Dingin"
        } else if (suhu > 35){
            return "Terlalu Panas"
        } else {
            return "Normal"
        }
    }

    return(
        <div>
            <p>suhu: {suhu}</p>
            <p>{cekSuhu(suhu)}</p>
            <button onClick={() => setBerjalan(false)}>Pause</button>
            <button onClick={() => setBerjalan(true)}>Resume</button>
        </div>
    )
}

export default SensorSuhu