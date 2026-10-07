import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-950 sticky top-0 z-50 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* Top Navbar */}
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <span className="text-3xl">
              🔍
            </span>

            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              CampusFind
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Navigation Links */}
            <ul className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium items-center">

              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <a
                  href="/#found-items"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Found Items
                </a>
              </li>

              <li>
                <a
                  href="/#lost-items"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Lost Requests
                </a>
              </li>

              <li>
                <a
                  href="/#about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  About
                </a>
              </li>

              {user && (
                <>
                  <li>
                    <Link
                      to="/report-lost"
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      Report Lost
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/report-found"
                      className="text-green-600 dark:text-green-400 hover:text-green-300 transition"
                    >
                      Report Found
                    </Link>
                  </li>
                </>
              )}

            </ul>

            {/* Authentication + Dark Mode */}
            <div className="flex items-center gap-3">

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-xl transition"
                aria-label="Toggle dark mode"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              {!user ? (
                <>
                  <Link to="/login">
                    <button className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition">
                      Login
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Register
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/account"
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
                  >
                    👤 {user.name}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>

          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-xl transition"
              aria-label="Toggle dark mode"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 text-3xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                onClick={closeMenu}
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Home
              </Link>

              <a
                href="/#found-items"
                onClick={closeMenu}
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Found Items
              </a>

              <a
                href="/#lost-items"
                onClick={closeMenu}
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Lost Requests
              </a>

              <a
                href="/#about"
                onClick={closeMenu}
                className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                About
              </a>

              {/* Logged-in Mobile Options */}
              {user && (
                <>
                  <Link
                    to="/report-lost"
                    onClick={closeMenu}
                    className="text-red-500 font-medium hover:text-red-400 transition"
                  >
                    🔴 Report Lost
                  </Link>

                  <Link
                    to="/report-found"
                    onClick={closeMenu}
                    className="text-green-600 dark:text-green-400 font-medium hover:text-green-300 transition"
                  >
                    🟢 Report Found
                  </Link>

                  <Link
                    to="/account"
                    onClick={closeMenu}
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    👤 My Account
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-left"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Logged-out Mobile Options */}
              {!user && (
                <div className="flex flex-col gap-3 pt-2">

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-4 py-2 rounded-lg text-center hover:bg-blue-50 dark:hover:bg-blue-950 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
                  >
                    Register
                  </Link>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;