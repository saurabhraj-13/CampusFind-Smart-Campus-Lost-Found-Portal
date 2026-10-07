import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove old messages when user starts typing
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    // Check API configuration
    if (!API_URL) {
      setError("API configuration is missing. Please try again later.");
      console.error("VITE_API_URL is not configured.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Login successful! Redirecting...");

      // Go to Home instead of Dashboard
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Back to Home */}
        <div className="mb-5">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-blue-600 font-medium transition"
          >
            ← Back to Home
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          {/* Logo */}
          <div className="text-center">
            <div className="text-4xl mb-2">
              🔎
            </div>

            <h1 className="text-3xl font-bold text-blue-600">
              CampusFind
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back! Login to continue.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-center text-sm">
              ✓ {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7">

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register */}
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Don't have an account?

              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Small Footer Text */}
        <p className="text-center text-gray-400 text-sm mt-5">
          Find it. Report it. Return it. 🎒
        </p>

      </div>
    </div>
  );
}

export default Login;