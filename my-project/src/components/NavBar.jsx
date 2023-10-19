export default function NavBar() {
    return (
        <nav className="bg-base py-7 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/Logo.png" alt="Logo" className="w-5 h-5" />
            <span className="ml-2 text-gray-600 font-bold">SIMS PPOB</span>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="font-bold text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600">Top Up</a>
            </li>
            <li>
              <a href="#" className="font-bold text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600">Transaction</a>
            </li>
            <li>
              <a href="#" className="font-bold text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-600">Akun</a>
            </li>
          </ul>
        </div>
      </nav>
    )
}