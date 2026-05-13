import { Link } from "react-router-dom"
import KartuKebun from "../components/KartuKebun"

export default function HalamanUtama(){
    return(
        <div className="bg-gray-900 min-h-screen p-8">
            <KartuKebun 
            namaAwal="Alwi"
            lokasi="Selajambe"
            luas={35}
            jumlahSensor={4}
            aktif={true}/>
        </div>
    )
}