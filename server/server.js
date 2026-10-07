const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const lostItemRoutes = require("./routes/lostItemRoutes");
const foundItemRoutes = require("./routes/foundItemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lost-items", lostItemRoutes);
app.use("/api/found-items", foundItemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("CampusFind Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});