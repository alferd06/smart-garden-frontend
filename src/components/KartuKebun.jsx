import { useState } from "react";

function KartuKebun({namaAwal, lokasi, luas, jumlahSensor, aktif}) {
    const [nama, setNama] = useState(namaAwal)
    const [editMode, setEditMode] = useState(false)

    function handleEdit() {
        setEditMode(true)
    }

    function handleSimpan() {
        setEditMode(false)
    }

    return(
        <div className="bg-gray-800 rounded-2xl mt-4 p-6 border-t-4 border-green-400 max-w-sm">
            {editMode ?
            <input value={nama} onChange={(e) => setNama(e.target.value)} className="bg-gray-700 text-white p-2 rounded-lg w-full"/>
            : <h2 className="text-white text-2xl font-bold">{nama}</h2>}
            <p className="text-gray-400 text-sm mt-1">{lokasi}</p>
            <div className="flex gap-3 mt-5">
                <div className="bg-gray-700 p-3 rounded-xl text-center flex-1">
                    <p className="text-white font-bold text-xl">{jumlahSensor}</p>
                    <p className="text-gray-400 text-xs mt-1">Sensor</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-xl text-center flex-1">
                    <p className="text-white font-bold text-xl">{luas}m²</p>
                    <p className="text-gray-400 text-xs mt-1">luas</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-xl text-center flex-1">
                    <p className={`font-bold text-xl ${aktif ? "text-green-400" : "text-red-400"}`}>{aktif ? "Aktif" : "Nonaktif"}</p>
                    <p className="text-gray-400 text-xs mt-1">status</p>
                </div>
            </div>
            {editMode ? 
            <button className="w-full py-3 rounded-xl font-bold text-sm uppercase mt-5 transition-all duration-300 bg-green-500 hover:bg-green-600 text-white" onClick={handleSimpan}>Simpan</button>
            : <button className="w-full py-3 rounded-xl font-bold text-sm uppercase mt-5 transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white" onClick={handleEdit}>Edit Nama</button>}
        </div>
    )
}

export default KartuKebun