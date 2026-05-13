import { Route, Routes } from "react-router-dom"
import HalamanKebun from "./pages/HalamanKebun"
import HalamanUtama from "./pages/HalamanUtama"
import AppDefault from "./contohTampilan/AppDefault"

function App(){
  return(
    <Routes>
      <Route path="/" element={<AppDefault />}/>
      <Route path="/kebun-utama" element={<HalamanUtama />}/>
      <Route path="/kebun-cabang" element={<HalamanKebun />}/>
    </Routes>
  ) 
}

export default App