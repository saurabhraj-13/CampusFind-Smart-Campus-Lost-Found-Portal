import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReportLost() {
  const navigate = useNavigate();

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    lostLocation: "",
    lostDate: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text/select/date fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login before reporting a lost item.");
        setLoading(false);
        return;
      }

      if (!API_URL) {
        setError("API configuration is missing. Please try again later.");
        console.error("VITE_API_URL is not configured.");
        setLoading(false);
        return;
      }

      const data = new FormData();

      data.append("itemName", formData.itemName);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("lostLocation", formData.lostLocation);
      data.append("lostDate", formData.lostDate);

      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        `${API_URL}/api/lost-items`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to report lost item."
        );
      }

      setMessage("Lost item reported successfully!");

      setFormData({
        itemName: "",
        category: "",
        description: "",
        lostLocation: "",
        lostDate: "",
      });

      removeImage();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Report Lost Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white mb-5 sm:mb-6"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 text-center sm:text-left">

            <div className="bg-white/20 backdrop-blur-sm w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
              🔍
            </div>

            <div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Report a Lost Item
              </h1>

              <p className="mt-2 sm:mt-3 text-white/90 text-base sm:text-lg">
                Help us reunite you with your belongings.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">

          {/* Information Card */}
          <div className="lg:col-span-2">

            <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white rounded-2xl p-6 sm:p-8 shadow-xl">

              <div className="text-5xl mb-5 sm:mb-6">
                🎒
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Lost something?
              </h2>

              <p className="text-white/90 leading-relaxed mb-7 sm:mb-8 text-sm sm:text-base">
                Provide accurate information about your lost item.
                This helps other students identify it and return it
                to you.
              </p>

              <div className="space-y-5">

                {/* Details */}
                <div className="flex gap-3 sm:gap-4">

                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Give accurate details
                    </h3>

                    <p className="text-sm text-white/80 mt-1">
                      Include the item's name, category and description.
                    </p>
                  </div>

                </div>

                {/* Location */}
                <div className="flex gap-3 sm:gap-4">

                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    📍
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Mention the location
                    </h3>

                    <p className="text-sm text-white/80 mt-1">
                      Tell us where you last remember having the item.
                    </p>
                  </div>

                </div>

                {/* Security */}
                <div className="flex gap-3 sm:gap-4">

                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    🔒
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Safe & secure
                    </h3>

                    <p className="text-sm text-white/80 mt-1">
                      Your report is associated with your account.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-3">

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 p-5 sm:p-8 transition-colors duration-300">

              {/* Form Heading */}
              <div className="mb-6 sm:mb-8">

                <div className="flex items-center gap-3 mb-2">

                  <div className="w-10 h-10 bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    📌
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Item Details
                  </h2>

                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  Enter the details of the item you lost.
                </p>

              </div>

              {/* Success Message */}
              {message && (
                <div className="mb-6 flex items-start sm:items-center gap-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-4 rounded-xl">

                  <span className="text-xl flex-shrink-0">
                    ✓
                  </span>

                  <span className="font-medium text-sm sm:text-base">
                    {message}
                  </span>

                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 flex items-start sm:items-center gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-4 rounded-xl">

                  <span className="text-xl flex-shrink-0">
                    ⚠
                  </span>

                  <span className="font-medium text-sm sm:text-base break-words">
                    {error}
                  </span>

                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5 sm:space-y-6"
              >

                {/* Item Name */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Item Name
                  </label>

                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g. HP Laptop, Black Wallet"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white dark:focus:bg-gray-800 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-950 text-sm sm:text-base"
                    required
                  />

                </div>

                {/* Category */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white dark:focus:bg-gray-800 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-950 text-sm sm:text-base"
                    required
                  >

                    <option value="">
                      Select a category
                    </option>

                    <option value="Mobile">
                      📱 Mobile
                    </option>

                    <option value="Laptop">
                      💻 Laptop
                    </option>

                    <option value="ID Card">
                      🪪 ID Card
                    </option>

                    <option value="Keys">
                      🔑 Keys
                    </option>

                    <option value="Wallet">
                      👛 Wallet
                    </option>

                    <option value="Books">
                      📚 Books
                    </option>

                    <option value="Bag">
                      🎒 Bag
                    </option>

                    <option value="Charger">
                      🔌 Charger
                    </option>

                    <option value="Other">
                      📦 Other
                    </option>

                  </select>

                </div>

                {/* Description */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe color, brand, model, stickers, marks or other identifying details..."
                    rows="5"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white dark:focus:bg-gray-800 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-950 resize-none text-sm sm:text-base"
                    required
                  />

                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    More details can help identify your item.
                  </p>

                </div>

                {/* Image Upload */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">

                    Item Image

                    <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">
                      (Optional)
                    </span>

                  </label>

                  {!imagePreview ? (

                    <label className="block cursor-pointer">

                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-5 sm:p-7 text-center hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition">

                        <div className="text-4xl mb-3">
                          📷
                        </div>

                        <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                          Upload an image
                        </p>

                        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">
                          JPG, PNG or WEBP · Max 5 MB
                        </p>

                        <span className="inline-block mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
                          Choose Image
                        </span>

                      </div>

                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>

                  ) : (

                    <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

                      <img
                        src={imagePreview}
                        alt="Selected item"
                        className="w-full h-48 sm:h-56 object-contain bg-gray-100 dark:bg-gray-800"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full shadow-lg"
                      >
                        ✕
                      </button>

                      <div className="px-4 py-3 bg-white dark:bg-gray-800">

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                          {image.name}
                        </p>

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {(image.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                      </div>

                    </div>

                  )}

                </div>

                {/* Location + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Lost Location
                    </label>

                    <input
                      type="text"
                      name="lostLocation"
                      value={formData.lostLocation}
                      onChange={handleChange}
                      placeholder="e.g. Library"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white dark:focus:bg-gray-800 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-950 text-sm sm:text-base"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Lost Date
                    </label>

                    <input
                      type="date"
                      name="lostDate"
                      value={formData.lostDate}
                      onChange={handleChange}
                      className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white dark:focus:bg-gray-800 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-950 text-sm sm:text-base"
                      required
                    />

                  </div>

                </div>

                {/* Submit */}
                <div className="pt-2 sm:pt-3">

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-[0.99]"
                  >
                    {loading
                      ? "Uploading & Submitting..."
                      : "Report Lost Item"}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 leading-relaxed">
                    By submitting this report, you confirm that the
                    information provided is accurate.
                  </p>

                </div>

              </form>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default ReportLost;