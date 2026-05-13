function PompaControl({ aktif, onToggle }) {
  return (
    <div className={`bg-gray-800 rounded-2xl p-6 border-t-4 ${aktif ? "border-blue-400" : "border-gray-600"}`}>
      
      {/* label */}
      <p className="text-gray-400 text-xs uppercase tracking-widest">
        💧 Pompa Air
      </p>

      {/* status pompa */}
      <h1 className={`text-4xl font-bold mt-3 ${aktif ? "text-blue-400" : "text-gray-500"}`}>
        {aktif ? "Menyala" : "Mati"}
      </h1>

      <p className="text-gray-500 text-sm mt-1">
        {aktif ? "Pompa sedang menyiram kebun" : "Pompa dalam kondisi standby"}
      </p>

      {/* tombol toggle */}
      <button
        onClick={onToggle}
        className={`mt-5 w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300
          ${aktif
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
      >
        {aktif ? "⏹ Matikan Pompa" : "▶ Hidupkan Pompa"}
      </button>

    </div>
  )
}

export default PompaControl