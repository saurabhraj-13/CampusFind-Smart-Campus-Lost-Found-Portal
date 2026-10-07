import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("API configuration is missing.");
        }

        const [lostResponse, foundResponse] = await Promise.all([
          fetch(`${API_URL}/api/lost-items`),
          fetch(`${API_URL}/api/found-items`),
        ]);

        const lostData = await lostResponse.json();
        const foundData = await foundResponse.json();

        if (!lostResponse.ok) {
          throw new Error(
            lostData.message || "Failed to fetch lost items."
          );
        }

        if (!foundResponse.ok) {
          throw new Error(
            foundData.message || "Failed to fetch found items."
          );
        }

        const searchTerm = query.toLowerCase().trim();

        const filteredLostItems = lostData.filter((item) =>
          [
            item.itemName,
            item.category,
            item.description,
            item.lostLocation,
          ]
            .filter(Boolean)
            .some((value) =>
              value.toLowerCase().includes(searchTerm)
            )
        );

        const filteredFoundItems = foundData.filter((item) =>
          [
            item.itemName,
            item.category,
            item.description,
            item.foundLocation,
          ]
            .filter(Boolean)
            .some((value) =>
              value.toLowerCase().includes(searchTerm)
            )
        );

        setLostItems(filteredLostItems);
        setFoundItems(filteredFoundItems);
      } catch (error) {
        console.error("Search Error:", error);
        setError("Unable to search items.");
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchSearchResults();
    } else {
      setLostItems([]);
      setFoundItems([]);
      setLoading(false);
    }
  }, [query, API_URL]);

  const handleLostDetails = (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/lost-items/${itemId}`);
  };

  const handleFoundDetails = (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/found-items/${itemId}`);
  };

  const totalResults = lostItems.length + foundItems.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Header */}
      <section className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-950 py-8 sm:py-10 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base mb-5 transition"
          >
            ← Back to Home
          </button>

          {/* Heading */}
          <div className="text-center">

            <div className="inline-block bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              🔎 Search Results
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Search Results
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base break-words">
              Results for{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                "{query}"
              </span>
            </p>

          </div>

        </div>

      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 sm:py-20 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Searching items...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16 sm:py-20 text-red-500 dark:text-red-400 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* No Results */}
        {!loading &&
          !error &&
          totalResults === 0 && (
            <div className="text-center py-16 sm:py-20 px-4">

              <div className="text-5xl sm:text-6xl mb-5">
                🔍
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200">
                No items found
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-md mx-auto">
                We couldn't find any lost or found items matching
                "{query}".
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold transition active:scale-[0.98]"
              >
                Back to Home
              </button>

            </div>
          )}

        {/* Results */}
        {!loading && !error && totalResults > 0 && (
          <>

            {/* Result Count */}
            <div className="py-6 sm:py-8">

              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Found{" "}
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {totalResults}
                </span>{" "}
                matching item
                {totalResults !== 1 ? "s" : ""}
              </p>

            </div>

            {/* ================= LOST RESULTS ================= */}
            {lostItems.length > 0 && (
              <section className="pb-10 sm:pb-14">

                <div className="text-center mb-8">

                  <div className="inline-block bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
                    🔴 Lost Items
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Lost Items
                  </h2>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

                  {lostItems.map((item) => (

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
                            className="w-full h-48 sm:h-52 object-contain bg-gray-100 dark:bg-gray-800"
                          />
                        ) : (
                          <div className="w-full h-48 sm:h-52 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-5xl sm:text-6xl">
                              🎒
                            </span>
                          </div>
                        )}

                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          LOST
                        </span>

                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">

                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 break-words min-w-0">
                            {item.itemName}
                          </h3>

                          <span className="self-start text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md whitespace-nowrap">
                            {item.category}
                          </span>

                        </div>

                        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm break-words">
                          📍 {item.lostLocation}
                        </p>

                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                          📅{" "}
                          {new Date(
                            item.lostDate
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">
                          {item.description}
                        </p>

                        <button
                          onClick={() =>
                            handleLostDetails(item._id)
                          }
                          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition active:scale-[0.98]"
                        >
                          View Details
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </section>
            )}

            {/* ================= FOUND RESULTS ================= */}
            {foundItems.length > 0 && (
              <section className="pb-12 sm:pb-16">

                <div className="text-center mb-8">

                  <div className="inline-block bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
                    🟢 Found Items
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Found Items
                  </h2>

                </div>

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
                            className="w-full h-48 sm:h-52 object-contain bg-gray-100 dark:bg-gray-800"
                          />
                        ) : (
                          <div className="w-full h-48 sm:h-52 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-5xl sm:text-6xl">
                              🔎
                            </span>
                          </div>
                        )}

                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          FOUND
                        </span>

                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">

                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 break-words min-w-0">
                            {item.itemName}
                          </h3>

                          <span className="self-start text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md whitespace-nowrap">
                            {item.category}
                          </span>

                        </div>

                        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm break-words">
                          📍 {item.foundLocation}
                        </p>

                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                          📅{" "}
                          {new Date(
                            item.foundDate
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">
                          {item.description}
                        </p>

                        <button
                          onClick={() =>
                            handleFoundDetails(item._id)
                          }
                          className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition active:scale-[0.98]"
                        >
                          View Details
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </section>
            )}

          </>
        )}

      </div>

    </div>
  );
}

export default SearchResults;