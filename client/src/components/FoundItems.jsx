import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FoundItems() {
  const navigate = useNavigate();

  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        if (!API_URL) {
          throw new Error("API configuration is missing.");
        }

        const response = await fetch(
          `${API_URL}/api/found-items`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch found items."
          );
        }

        setFoundItems(data);
      } catch (error) {
        console.error("Fetch Found Items Error:", error);
        setError("Unable to load found items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, [API_URL]);

  const handleViewDetails = (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/found-items/${itemId}`);
  };

  return (
    <section
      id="found-items"
      className="py-12 sm:py-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">

          <div className="inline-block bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
            🟢 Found Items
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Recently Found
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Help return found belongings to their owners.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Loading found items...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10 sm:py-12 text-red-500 dark:text-red-400 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          foundItems.length === 0 && (
            <div className="text-center py-10 sm:py-12 px-4">

              <div className="text-5xl mb-4">
                🔎
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                No found items reported yet
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                Be the first person to report a found item.
              </p>

            </div>
          )}

        {/* Found Items */}
        {!loading &&
          !error &&
          foundItems.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

              {foundItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300"
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
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      FOUND
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
                      📍 {item.foundLocation}
                    </p>

                    {/* Date */}
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      📅{" "}
                      {new Date(
                        item.foundDate
                      ).toLocaleDateString()}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">
                      {item.description}
                    </p>

                    {/* View Details */}
                    <button
                      onClick={() => handleViewDetails(item._id)}
                      className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition active:scale-[0.98]"
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

export default FoundItems;