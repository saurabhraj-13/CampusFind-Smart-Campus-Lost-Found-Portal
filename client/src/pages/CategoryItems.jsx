import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CategoryItems() {
  const navigate = useNavigate();
  const { category } = useParams();

  const selectedCategory = decodeURIComponent(category);

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchItems = async () => {
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

        const filteredLostItems = lostData.filter(
          (item) =>
            item.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

        const filteredFoundItems = foundData.filter(
          (item) =>
            item.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

        setLostItems(filteredLostItems);
        setFoundItems(filteredFoundItems);
      } catch (error) {
        console.error("Fetch Category Items Error:", error);
        setError("Unable to load category items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory, API_URL]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      <Navbar />

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
              Category
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 break-words">
              {selectedCategory}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Browse lost and found{" "}
              {selectedCategory.toLowerCase()} items.
            </p>

          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 sm:py-20 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Loading {selectedCategory.toLowerCase()} items...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16 sm:py-20 text-red-500 dark:text-red-400 text-sm sm:text-base">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>

            {/* ================= LOST ITEMS ================= */}
            <section className="py-10 sm:py-14">

              <div className="text-center mb-8 sm:mb-10">

                <div className="inline-block bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
                  🔴 Lost Items
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Recently Lost {selectedCategory}s
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
                  Find lost{" "}
                  {selectedCategory.toLowerCase()} items reported
                  by students.
                </p>

              </div>

              {/* No Lost Items */}
              {lostItems.length === 0 ? (

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm dark:shadow-gray-950 border border-gray-100 dark:border-gray-800 py-12 sm:py-14 px-4 text-center">

                  <div className="text-5xl mb-4">
                    🎒
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                    No lost {selectedCategory.toLowerCase()} items
                    reported yet
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                    No one has reported a lost{" "}
                    {selectedCategory.toLowerCase()} yet.
                  </p>

                </div>

              ) : (

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

              )}

            </section>

            {/* ================= FOUND ITEMS ================= */}
            <section className="py-10 sm:py-14">

              <div className="text-center mb-8 sm:mb-10">

                <div className="inline-block bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
                  🟢 Found Items
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Recently Found {selectedCategory}s
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
                  Find {selectedCategory.toLowerCase()} items
                  reported by students.
                </p>

              </div>

              {/* No Found Items */}
              {foundItems.length === 0 ? (

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm dark:shadow-gray-950 border border-gray-100 dark:border-gray-800 py-12 sm:py-14 px-4 text-center">

                  <div className="text-5xl mb-4">
                    🔎
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                    No found{" "}
                    {selectedCategory.toLowerCase()} items
                    reported yet
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                    No one has reported a found{" "}
                    {selectedCategory.toLowerCase()} yet.
                  </p>

                </div>

              ) : (

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

              )}

            </section>

          </>
        )}

      </div>

      <Footer />

    </div>
  );
}

export default CategoryItems;