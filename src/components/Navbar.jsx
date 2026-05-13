import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6">
                
                <Link
                    to="/"
                    className="hover:bg-red-700/70 rounded-lg text-yellow-300 transition duration-200 px-2 py-3"
                >
                    Dashboard
                </Link>

                <Link
                    to="/kebun"
                    className="hover:bg-red-700/70 rounded-lg text-yellow-300 transition duration-200 px-2 py-3"
                >
                    Kebun
                </Link>

            </div>
        </nav>
    );
}