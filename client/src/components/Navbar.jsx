import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-2">
          <span className="text-3xl">🔍</span>
          <h1 className="text-2xl font-bold text-blue-600">
            CampusFind
          </h1>
        </div>

        <ul className="flex gap-8 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li>Found Items</li>
          <li>Lost Requests</li>
          <li>About</li>
        </ul>

        <div className="flex gap-3">
          <Link to="/login">
  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
    Login
  </button>
</Link>

          <Link to="/register">
  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
    Register
  </button>
</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;