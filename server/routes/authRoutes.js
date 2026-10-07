const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// Get currently logged-in user
router.get("/me", protect, getCurrentUser);

module.exports = router;