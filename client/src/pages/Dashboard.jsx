import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-600">
            🔍 CampusFind
          </h1>

          <div className="flex items-center gap-4">

            <span className="text-gray-700">
              {user?.name || "Student"}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name || "Student"}! 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your lost and found items from here.
        </p>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {/* Lost */}
          <Link to="/report-lost">

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border-l-4 border-red-500">

              <div className="text-4xl">
                🔴
              </div>

              <h2 className="text-2xl font-bold mt-4">
                Report Lost Item
              </h2>

              <p className="text-gray-500 mt-2">
                Lost something on campus? Report it here.
              </p>

              <button className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg">
                Report Lost
              </button>

            </div>

          </Link>

          {/* Found */}
          <Link to="/report-found">

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border-l-4 border-green-500">

              <div className="text-4xl">
                🟢
              </div>

              <h2 className="text-2xl font-bold mt-4">
                Report Found Item
              </h2>

              <p className="text-gray-500 mt-2">
                Found someone's item? Help return it.
              </p>

              <button className="mt-5 bg-green-500 text-white px-5 py-2 rounded-lg">
                Report Found
              </button>

            </div>

          </Link>

        </div>

        {/* Statistics */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            My Activity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Lost Reports
              </p>

              <p className="text-3xl font-bold text-red-500 mt-2">
                0
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Found Reports
              </p>

              <p className="text-3xl font-bold text-green-500 mt-2">
                0
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Claim Requests
              </p>

              <p className="text-3xl font-bold text-blue-500 mt-2">
                0
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;