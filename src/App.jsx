import { Route, Routes } from "react-router-dom"
import HalamanKebun from "./pages/HalamanKebun"
import HalamanUtama from "./pages/HalamanUtama"
import AppDefault from "./contohTampilan/AppDefault"
import KartuKebun from "./components/KartuKebun"

function App(){
  return(
    <Routes>
      <Route path="/" element={<HalamanUtama />}/>
      <Route path="/kebun/:id" element={<HalamanKebun />}/>
    </Routes>
)
}

export default App