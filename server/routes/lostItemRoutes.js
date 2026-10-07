const express = require("express");

const {
  createLostItem,
  getLostItems,
  getLostItemById,
  getMyLostItems,
  updateLostItem,
  deleteLostItem,
} = require("../controllers/lostItemController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get all lost items - Public
router.get("/", getLostItems);

// Get my lost items - Login required
router.get("/my-items", protect, getMyLostItems);

// Get single lost item details - Login required
router.get("/:id", protect, getLostItemById);

// Create lost item - Login required
router.post(
  "/",
  protect,
  upload.single("image"),
  createLostItem
);

// Update my lost item - Login required
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateLostItem
);

// Delete my lost item - Login required
router.delete(
  "/:id",
  protect,
  deleteLostItem
);

module.exports = router;