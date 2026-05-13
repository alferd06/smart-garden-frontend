import {useState} from 'react'

function CounterPanen() {
    const [panen, setPanen] = useState(0)

    return(
        <div>
            <p>{panen <= 0 ? "Belum panen" : "Total Panen = " + panen}</p>
            <button onClick={() => setPanen(panen + 1)}>tambah hasil panen</button>
            <button onClick={() => panen <= 0 ? setPanen(0) : setPanen(panen - 1)}>kurangi hasil panen</button>
            <button onClick={() => setPanen(0)}>reset</button>
        </div>
    )
}

export default CounterPanen