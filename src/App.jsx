import { useState, useEffect } from "react"

function App() {
  const [suhu, setSuhu] = useState(28)

  useEffect(() => {
    const interval = setInterval(() => {
      const suhuBaru = +(22 + Math.random() * 10).toFixed(1)
      setSuhu(suhuBaru)
    }, 2000) // setiap 2 detik

    return () => clearInterval(interval) // cleanup
  }, []) // [] = jalankan sekali saja waktu pertama muncul

  return (
    <div>
      <p>Suhu Kebun</p>
      <h1>{suhu}°C</h1>
    </div>
  )
}

export default App