import { Link } from "react-router-dom"
import KartuKebun from "../components/KartuKebun"

const daftarKebun = [
  {
    id: "KB001",
    nama: "Kebun Mawar",
    lokasi: "Bandung",
    luas: 12,
    jumlahSensor: "15",
    aktif: true
  },
  {
    id: "KB002",
    nama: "Kebun Melati",
    lokasi: "Garut",
    luas: 8,
    jumlahSensor: "10",
    aktif: true
  },
  {
    id: "KB003",
    nama: "Kebun Anggrek",
    lokasi: "Bogor",
    luas: 20,
    jumlahSensor: "25",
    aktif: false
  },
  {
    id: "KB004",
    nama: "Kebun Kopi",
    lokasi: "Tasikmalaya",
    luas: 15,
    jumlahSensor: "18",
    aktif: true
  },
  {
    id: "KB005",
    nama: "Kebun Teh",
    lokasi: "Ciwidey",
    luas: 30,
    jumlahSensor: "40",
    aktif: true
  }
]

export default function HalamanUtama(){
    return(
        <div className="bg-gray-900 min-h-screen p-8 flex flex-wrap gap-6">
            {daftarKebun.map(kebun =>
                <Link to={`/kebun/${kebun.id}`} key={kebun.id}>
                    <KartuKebun 
                        key={kebun.id}
                        namaAwal={kebun.nama}
                        lokasi={kebun.lokasi}
                        luas={kebun.luas}
                        jumlahSensor={kebun.jumlahSensor}
                        aktif={kebun.aktif}/>
                </Link>
            )}
        </div>
    )
}