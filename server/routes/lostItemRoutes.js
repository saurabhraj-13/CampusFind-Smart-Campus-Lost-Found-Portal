const express = require("express");

const {
  createLostItem,
} = require("../controllers/lostItemController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createLostItem);

module.exports = router;