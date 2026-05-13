// tambahkan di luar function SensorCard, di bagian atas file
export function tentukanStatus(tipe, nilai) {
  const batas = {
    suhu:       { dingin: 25, panas: 35 },
    kelembapan: { kering: 40, basah: 80 },
    ph:         { kering: 5.5, basah: 7.5 },  // kering = asam, basah = basa
    nutrisi:    { kering: 150, basah: 300 },
  }

  const b = batas[tipe]
  if (!b) return "normal"

  if (nilai < b.dingin || nilai < b.kering) {
    return tipe === "suhu" ? "dingin" : "kering"
  }
  if (nilai > b.panas || nilai > b.basah) {
    return tipe === "suhu" ? "panas" : "basah"
  }
  return "normal"
}

function SensorCard({ icon, label, nilai, satuan, status }) {

  const warnaStatus = {
    "optimal": { teks: "text-green-400", garis: "border-green-400" },
    "normal":  { teks: "text-green-400", garis: "border-green-400" },
    "panas":   { teks: "text-red-400",   garis: "border-red-400" },
    "dingin":  { teks: "text-blue-400",  garis: "border-blue-400" },
    "kering":  { teks: "text-orange-400",garis: "border-orange-400" },
    "basah":   { teks: "text-blue-400",  garis: "border-blue-400" },
  }

  const warna = warnaStatus[status] || { teks: "text-gray-400", garis: "border-gray-400" }

  return (
    <div className={`bg-gray-800 rounded-2xl p-6 border-t-4 ${warna.garis}`}>
      
      {/* label */}
      <p className="text-gray-400 text-xs uppercase tracking-widest">
        {icon} {label}
      </p>

      {/* nilai */}
      <h1 className="text-white text-4xl font-bold mt-3">
        {nilai}
        <span className="text-gray-500 text-base ml-2">{satuan}</span>
      </h1>

      {/* status */}
      <p className={`text-sm mt-4 font-medium ${warna.teks}`}>
        ● {status}
      </p>

    </div>
  )
}

export default SensorCard