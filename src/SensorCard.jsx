function SensorCard({ icon, label, nilai, satuan, status }) {
  const warnaStatus = {
    "optimal": "text-green-400",
    "normal": "text-green-400",
    "panas": "text-red-400",
    "dingin": "text-blue-400",
    "kering": "text-orange-400",
    "basah": "text-blue-400",
  }

  const warna = warnaStatus[status]
  
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      
      {/* label */}
      <p className="text-gray-400 text-sm uppercase">{icon} {label}</p>

      {/* nilai */}
      <h1 className="text-white text-4xl font-bold mt-2">
        {nilai}
        <span className="text-gray-400 text-lg ml-1">{satuan}</span>
      </h1>

      {/* status */}
      <p className={`text-sm mt-3 ${warna}`}>{status}</p>

    </div>
  )
}

export default SensorCard