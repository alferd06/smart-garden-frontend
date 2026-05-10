function SensorCard({ icon, label, nilai, satuan, status }) {
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
      <p className="text-green-400 text-sm mt-3">{status}</p>

    </div>
  )
}

export default SensorCard