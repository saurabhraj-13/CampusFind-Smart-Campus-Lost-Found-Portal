import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [userResponse, lostResponse, foundResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/auth/me", {
              headers,
            }),

            fetch("http://localhost:5000/api/lost-items/my-items", {
              headers,
            }),

            fetch("http://localhost:5000/api/found-items/my-items", {
              headers,
            }),
          ]);

        const userData = await userResponse.json();
        const lostData = await lostResponse.json();
        const foundData = await foundResponse.json();

        if (!userResponse.ok) {
          throw new Error(
            userData.message || "Failed to fetch account."
          );
        }

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

        setUser(userData);
        setLostItems(lostData);
        setFoundItems(foundData);

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );
      } catch (error) {
        console.error("Account Error:", error);

        setError(
          error.message || "Unable to load account."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [navigate]);

  const handleDeleteLost = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lost item?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/lost-items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete lost item."
        );
      }

      setLostItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== itemId
        )
      );

      alert("Lost item deleted successfully!");
    } catch (error) {
      console.error("Delete Lost Item Error:", error);

      alert(
        error.message || "Unable to delete lost item."
      );
    }
  };

  const handleDeleteFound = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this found item?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/found-items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete found item."
        );
      }

      setFoundItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== itemId
        )
      );

      alert("Found item deleted successfully!");
    } catch (error) {
      console.error("Delete Found Item Error:", error);

      alert(
        error.message || "Unable to delete found item."
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
          <div className="text-center">
            <div className="text-5xl mb-4">
              🔄
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Loading your account...
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
              Unable to Load Account
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base break-words">
              {error}
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      <Navbar />

      {/* ================= ACCOUNT HEADER ================= */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 text-white">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Avatar */}
            <div className="w-20 h-20 flex-shrink-0 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-lg">
              👤
            </div>

            {/* User Info */}
            <div className="min-w-0">

              <p className="text-blue-100 text-xs sm:text-sm font-semibold tracking-wider">
                MY ACCOUNT
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold mt-1 break-words">
                {user.name}
              </h1>

              <p className="text-blue-100 mt-2 text-sm sm:text-base">
                Manage your CampusFind reports and account.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= ACCOUNT CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* ================= PROFILE + STATISTICS ================= */}
        <div className="grid lg:grid-cols-4 gap-5 sm:gap-6 mb-10 sm:mb-12">

          {/* ================= PERSONAL INFORMATION ================= */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-3xl shadow-md dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">

            {/* Header */}
            <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-gray-100 dark:border-gray-700">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-xl">
                  👤
                </div>

                <div className="min-w-0">

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Personal Information
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Your CampusFind account details
                  </p>

                </div>

              </div>

            </div>

            {/* Information */}
            <div className="p-5 sm:p-7">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

                {/* Name */}
                <div className="group bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-800 rounded-2xl p-5 transition">

                  <div className="flex items-center gap-2 mb-3">

                    <span className="text-lg">
                      👤
                    </span>

                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Full Name
                    </p>

                  </div>

                  <p className="font-bold text-gray-800 dark:text-gray-100 text-lg truncate">
                    {user.name}
                  </p>

                </div>

                {/* Email */}
                <div className="group bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-800 rounded-2xl p-5 transition">

                  <div className="flex items-center gap-2 mb-3">

                    <span className="text-lg">
                      ✉️
                    </span>

                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Email Address
                    </p>

                  </div>

                  <p
                    title={user.email}
                    className="font-bold text-gray-800 dark:text-gray-100 text-base whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {user.email}
                  </p>

                </div>

                {/* Phone */}
                <div className="group bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-800 rounded-2xl p-5 transition">

                  <div className="flex items-center gap-2 mb-3">

                    <span className="text-lg">
                      📱
                    </span>

                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Phone Number
                    </p>

                  </div>

                  <p className="font-bold text-gray-800 dark:text-gray-100 text-lg break-words">
                    {user.phone}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= STATISTICS ================= */}
          <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">

            {/* Lost */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/60 dark:to-red-900/40 border border-red-200 dark:border-red-800 rounded-3xl p-5 sm:p-6">

              <div className="absolute -right-5 -top-5 text-7xl opacity-10">
                🎒
              </div>

              <div className="relative">

                <div className="w-11 h-11 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl mb-4">
                  🔴
                </div>

                <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                  Lost Reports
                </p>

                <p className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {lostItems.length}
                </p>

                <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                  Items reported lost
                </p>

              </div>

            </div>

            {/* Found */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/60 dark:to-green-900/40 border border-green-200 dark:border-green-800 rounded-3xl p-5 sm:p-6">

              <div className="absolute -right-5 -top-5 text-7xl opacity-10">
                🔎
              </div>

              <div className="relative">

                <div className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center text-xl mb-4">
                  🟢
                </div>

                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  Found Reports
                </p>

                <p className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {foundItems.length}
                </p>

                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Items reported found
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= MY LOST ITEMS ================= */}
        <section className="mb-10 sm:mb-12">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-red-100 dark:bg-red-950 flex items-center justify-center">
                  🎒
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  My Lost Items
                </h2>

              </div>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                Items you have reported as lost.
              </p>

            </div>

            <button
              onClick={() => navigate("/report-lost")}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              + Report Lost
            </button>

          </div>

          {lostItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md dark:shadow-gray-950 p-8 sm:p-10 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 dark:bg-red-950 flex items-center justify-center text-3xl mb-4">
                🎒
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                No lost items
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                You haven't reported any lost items yet.
              </p>

              <button
                onClick={() => navigate("/report-lost")}
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold transition"
              >
                Report Your First Lost Item
              </button>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

              {lostItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition duration-300"
                >

                  {item.image ? (
                    <img
                      src={`http://localhost:5000${item.image}`}
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

                  <div className="p-4 sm:p-5">

                    <div className="flex justify-between items-start gap-3">

                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate min-w-0">
                        {item.itemName}
                      </h3>

                      <span className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs font-semibold px-2 py-1 rounded-md flex-shrink-0">
                        LOST
                      </span>

                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 break-words">
                      📍 {item.lostLocation}
                    </p>

                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      📅{" "}
                      {new Date(
                        item.lostDate
                      ).toLocaleDateString()}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-5">

                      <button
                        onClick={() =>
                          navigate(
                            `/lost-items/${item._id}`
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/edit-lost/${item._id}`
                          )
                        }
                        className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded-lg transition text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteLost(item._id)
                        }
                        className="bg-red-100 dark:bg-red-950 hover:bg-red-200 dark:hover:bg-red-900 text-red-600 dark:text-red-400 font-semibold py-2 rounded-lg transition text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

        {/* ================= MY FOUND ITEMS ================= */}
        <section>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  🔎
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  My Found Items
                </h2>

              </div>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                Items you have reported as found.
              </p>

            </div>

            <button
              onClick={() => navigate("/report-found")}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              + Report Found
            </button>

          </div>

          {foundItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md dark:shadow-gray-950 p-8 sm:p-10 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-50 dark:bg-green-950 flex items-center justify-center text-3xl mb-4">
                🔎
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                No found items
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                You haven't reported any found items yet.
              </p>

              <button
                onClick={() => navigate("/report-found")}
                className="mt-5 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold transition"
              >
                Report Your First Found Item
              </button>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

              {foundItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition duration-300"
                >

                  {item.image ? (
                    <img
                      src={`http://localhost:5000${item.image}`}
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

                  <div className="p-4 sm:p-5">

                    <div className="flex justify-between items-start gap-3">

                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate min-w-0">
                        {item.itemName}
                      </h3>

                      <span className="bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 text-xs font-semibold px-2 py-1 rounded-md flex-shrink-0">
                        FOUND
                      </span>

                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 break-words">
                      📍 {item.foundLocation}
                    </p>

                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      📅{" "}
                      {new Date(
                        item.foundDate
                      ).toLocaleDateString()}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-5">

                      <button
                        onClick={() =>
                          navigate(
                            `/found-items/${item._id}`
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/edit-found/${item._id}`
                          )
                        }
                        className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded-lg transition text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteFound(item._id)
                        }
                        className="bg-green-100 dark:bg-green-950 hover:bg-green-200 dark:hover:bg-green-900 text-green-700 dark:text-green-400 font-semibold py-2 rounded-lg transition text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Account;