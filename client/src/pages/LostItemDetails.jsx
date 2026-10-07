import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LostItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLostItem = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (!API_URL) {
        setError("API configuration is missing. Please try again later.");
        console.error("VITE_API_URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/lost-items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch item details."
          );
        }

        setItem(data);
      } catch (error) {
        console.error("Fetch Lost Item Error:", error);

        setError(
          error.message || "Unable to load item details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLostItem();
  }, [id, navigate, API_URL]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
          <div className="text-center">
            <div className="text-5xl mb-4">🔄</div>

            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Loading item details...
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 sm:px-6 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-950 p-6 sm:p-8 text-center max-w-md w-full border border-transparent dark:border-gray-700">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              Unable to Load Item
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base break-words">
              {error}
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Back to Home
            </button>

          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">

          <button
            onClick={() => navigate(-1)}
            className="text-white/90 hover:text-white font-medium mb-6 text-sm sm:text-base"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3 sm:gap-4">

            <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-white/20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl">
              🔍
            </div>

            <div className="min-w-0">

              <p className="text-white/80 text-xs sm:text-sm font-medium">
                LOST ITEM
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
                {item.itemName}
              </h1>

            </div>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Item Information */}
          <div className="lg:col-span-2">

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">

              {/* Image */}
              {item.image ? (
                <img
                  src={`${API_URL}${item.image}`}
                  alt={item.itemName}
                  className="w-full h-56 sm:h-72 md:h-80 object-contain bg-gray-100 dark:bg-gray-800"
                />
              ) : (
                <div className="w-full h-56 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-7xl sm:text-8xl">
                    🎒
                  </span>
                </div>
              )}

              <div className="p-5 sm:p-6 md:p-8">

                {/* Status + Category */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">

                  <span className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    🔴 LOST
                  </span>

                  <span className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold break-words">
                    {item.category}
                  </span>

                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5 sm:mb-6">
                  Item Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                  {/* Item Name */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5">

                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                      Item Name
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-gray-100 mt-1 break-words">
                      {item.itemName}
                    </p>

                  </div>

                  {/* Category */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5">

                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                      Category
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-gray-100 mt-1 break-words">
                      {item.category}
                    </p>

                  </div>

                  {/* Lost Location */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5">

                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                      Lost Location
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-gray-100 mt-1 break-words">
                      📍 {item.lostLocation}
                    </p>

                  </div>

                  {/* Lost Date */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5">

                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                      Lost Date
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-gray-100 mt-1 break-words">
                      📅{" "}
                      {new Date(
                        item.lostDate
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                {/* Description */}
                <div className="mt-5 sm:mt-6">

                  <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-2">
                    Description
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5">

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base break-words">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Reporter Information */}
          <div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 p-5 sm:p-6 md:p-7 lg:sticky lg:top-6 transition-colors duration-300">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
                  👤
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                    Reported By
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                    Contact the owner
                  </p>

                </div>

              </div>

              {item.reportedBy && (
                <div className="space-y-5">

                  {/* Name */}
                  <div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">
                      Name
                    </p>

                    <p className="text-gray-800 dark:text-gray-100 font-semibold mt-1 break-words">
                      {item.reportedBy.name}
                    </p>

                  </div>

                  {/* Phone */}
                  <div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">
                      Phone
                    </p>

                    <a
                      href={`tel:${item.reportedBy.phone}`}
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold mt-1 inline-block break-all"
                    >
                      📞 {item.reportedBy.phone}
                    </a>

                  </div>

                  {/* Email */}
                  {item.reportedBy.email && (
                    <div>

                      <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold">
                        Email
                      </p>

                      <a
                        href={`mailto:${item.reportedBy.email}`}
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 break-all mt-1 inline-block"
                      >
                        ✉️ {item.reportedBy.email}
                      </a>

                    </div>
                  )}

                </div>
              )}

              <div className="mt-7 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-800 rounded-xl p-4">

                <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
                  💡 Found this item? Contact the person who
                  reported it and help return their belongings.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default LostItemDetails;