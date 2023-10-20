import { NavLink, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="bg-base py-7 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/home" className="flex items-center">
          <img src="/Logo.png" alt="Logo" className="w-5 h-5" />
          <span className="ml-2 text-gray-600 font-bold">SIMS PPOB</span>
        </NavLink>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/topup"
              className={`font-bold text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600 ${
                location.pathname === "/topup" ? "text-red-500" : ""
              }`}
            >
              Top Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transaction"
              className={`font-bold text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600 ${
                location.pathname === "/transaction" ? "text-red-500" : ""
              }`}
            >
              Transaction
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/akun"
              className={`font-bold text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600 ${
                location.pathname === "/akun" ? "text-red-500" : ""
              }`}
            >
              Akun
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
