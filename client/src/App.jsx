import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import CategoryItems from "./pages/CategoryItems";
import SearchResults from "./pages/SearchResults";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import LostItemDetails from "./pages/LostItemDetails";
import FoundItemDetails from "./pages/FoundItemDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Search Results */}
        <Route
          path="/search"
          element={<SearchResults />}
        />

        {/* Category Items */}
        <Route
          path="/category/:category"
          element={<CategoryItems />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Account */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* Report Items */}
        <Route
          path="/report-lost"
          element={<ReportLost />}
        />

        <Route
          path="/report-found"
          element={<ReportFound />}
        />

        {/* Lost Item Details */}
        <Route
          path="/lost-items/:id"
          element={
            <ProtectedRoute>
              <LostItemDetails />
            </ProtectedRoute>
          }
        />

        {/* Found Item Details */}
        <Route
          path="/found-items/:id"
          element={
            <ProtectedRoute>
              <FoundItemDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;