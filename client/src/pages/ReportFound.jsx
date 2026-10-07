import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReportFound() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    foundLocation: "",
    foundDate: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // API URL
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

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
      setError(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!API_URL) {
      setError("API configuration is missing. Please try again later.");
      console.error("VITE_API_URL is not configured.");
      return;
    }

    if (
      !formData.itemName ||
      !formData.category ||
      !formData.description ||
      !formData.foundLocation ||
      !formData.foundDate
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("itemName", formData.itemName);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("foundLocation", formData.foundLocation);
      data.append("foundDate", formData.foundDate);

      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        `${API_URL}/api/found-items`,
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
          result.message || "Failed to report found item."
        );
      }

      alert("Found item reported successfully!");

      navigate("/");
    } catch (error) {
      console.error("Report Found Error:", error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
              🟢 Found Item
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Report a Found Item
            </h1>

            <p className="mt-3 sm:mt-4 text-green-50 text-base sm:text-lg leading-relaxed">
              Found something on campus? Report it here
              and help return it to its rightful owner.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 dark:bg-gray-950 py-8 sm:py-14 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Information Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-2xl p-6 sm:p-7 shadow-lg lg:sticky lg:top-24">

              <div className="text-5xl mb-5">
                🎒
              </div>

              <h2 className="text-2xl font-bold">
                Help Someone Find Their Belonging
              </h2>

              <p className="mt-4 text-green-50 leading-relaxed text-sm sm:text-base">
                Your report can help a student recover
                something they lost on campus.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex gap-3">
                  <span className="flex-shrink-0">
                    ✓
                  </span>

                  <span className="text-sm sm:text-base">
                    Provide accurate item details
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0">
                    ✓
                  </span>

                  <span className="text-sm sm:text-base">
                    Mention where you found it
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0">
                    ✓
                  </span>

                  <span className="text-sm sm:text-base">
                    Add an image if possible
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 p-5 sm:p-7 transition-colors duration-300">

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                Found Item Details
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6 sm:mb-7 text-sm sm:text-base">
                Enter the details of the item you found.
              </p>

              {/* Error */}
              {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm sm:text-base break-words">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Item Name *
                  </label>

                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g. Black Wallet"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Mobile">
                      Mobile
                    </option>

                    <option value="Laptop">
                      Laptop
                    </option>

                    <option value="ID Card">
                      ID Card
                    </option>

                    <option value="Keys">
                      Keys
                    </option>

                    <option value="Wallet">
                      Wallet
                    </option>

                    <option value="Books">
                      Books
                    </option>

                    <option value="Bag">
                      Bag
                    </option>

                    <option value="Charger">
                      Charger
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the item, color, brand, identifying features, etc."
                    rows="4"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                  />
                </div>

                {/* Location + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Found Location *
                    </label>

                    <input
                      type="text"
                      name="foundLocation"
                      value={formData.foundLocation}
                      onChange={handleChange}
                      placeholder="e.g. Library"
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Found Date *
                    </label>

                    <input
                      type="date"
                      name="foundDate"
                      value={formData.foundDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      required
                    />
                  </div>

                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Item Image
                    <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">
                      (Optional)
                    </span>
                  </label>

                  {!preview ? (
                    <label className="block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-5 sm:p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 transition">

                      <div className="text-4xl mb-3">
                        📷
                      </div>

                      <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                        Upload item image
                      </p>

                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">
                        JPG, PNG or WEBP • Maximum 5 MB
                      </p>

                      <span className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
                        Choose Image
                      </span>

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
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 sm:h-64 object-contain bg-gray-100 dark:bg-gray-800"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600"
                      >
                        Remove
                      </button>

                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-semibold py-3.5 rounded-xl transition active:scale-[0.99] ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {loading
                    ? "Submitting..."
                    : "Report Found Item"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ReportFound;