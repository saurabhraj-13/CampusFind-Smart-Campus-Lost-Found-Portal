import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LostItems() {
  const navigate = useNavigate();

  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        if (!API_URL) {
          throw new Error("API configuration is missing.");
        }

        const response = await fetch(
          `${API_URL}/api/lost-items`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch lost items."
          );
        }

        setLostItems(data);
      } catch (error) {
        console.error("Fetch Lost Items Error:", error);
        setError("Unable to load lost items.");
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, [API_URL]);

  const handleViewDetails = (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/lost-items/${itemId}`);
  };

  return (
    <section
      id="lost-items"
      className="py-12 sm:py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">

          <div className="inline-block bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
            🔴 Lost Items
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Recently Lost
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Help students find their lost belongings.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Loading lost items...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10 sm:py-12 text-red-500 dark:text-red-400 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && lostItems.length === 0 && (
          <div className="text-center py-10 sm:py-12 px-4">

            <div className="text-5xl mb-4">
              🎒
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
              No lost items reported yet
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Be the first person to report a lost item.
            </p>

          </div>
        )}

        {/* Lost Items */}
        {!loading && !error && lostItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

            {lostItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300"
              >

                {/* Image */}
                <div className="relative">

                  {item.image ? (
                    <img
                      src={`${API_URL}${item.image}`}
                      alt={item.itemName}
                      className="w-full h-48 sm:h-52 object-contain bg-gray-100 dark:bg-gray-700"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-52 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl">
                        🎒
                      </span>
                    </div>
                  )}

                  {/* Status */}
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    LOST
                  </span>

                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">

                  {/* Item Name + Category */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">

                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 break-words">
                      {item.itemName}
                    </h3>

                    <span className="self-start text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md whitespace-nowrap">
                      {item.category}
                    </span>

                  </div>

                  {/* Location */}
                  <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm break-words">
                    📍 {item.lostLocation}
                  </p>

                  {/* Date */}
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    📅{" "}
                    {new Date(item.lostDate).toLocaleDateString()}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* View Details */}
                  <button
                    onClick={() => handleViewDetails(item._id)}
                    className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition active:scale-[0.98]"
                  >
                    View Details
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default LostItems;