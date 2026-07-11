import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto flex shadow-lg rounded-xl overflow-hidden">

        <input
          type="text"
          placeholder="Search lost or found items..."
          className="flex-1 p-4 outline-none"
        />

        <button className="bg-blue-600 text-white px-8">
          <FaSearch />
        </button>

      </div>

    </div>
  );
}

export default SearchBar;