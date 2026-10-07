import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-7 sm:py-10 transition-colors duration-300">

      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto px-4 sm:px-6"
      >
        <div className="flex bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-950 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition">

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search lost or found items..."
            className="flex-1 min-w-0 px-4 sm:px-5 py-3.5 sm:py-4 outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base bg-white dark:bg-gray-900 transition-colors duration-300"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 transition flex items-center justify-center"
          >
            <FaSearch className="text-base sm:text-lg" />
          </button>

        </div>
      </form>

    </div>
  );
}

export default SearchBar;