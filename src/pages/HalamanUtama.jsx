import { Link } from "react-router-dom"

export default function HalamanUtama(){
    return(
        <div>
            <h1>Ini Halaman Utama</h1>
            <Link to="/kebun" >Ke Kebun</Link>
        </div>
    )
}