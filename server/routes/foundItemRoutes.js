const express = require("express");

const {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
  getMyFoundItems,
  updateFoundItem,
  deleteFoundItem,
} = require("../controllers/foundItemController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get all found items - Public
router.get("/", getFoundItems);

// Get my found items - Login required
router.get("/my-items", protect, getMyFoundItems);

// Get single found item details - Login required
router.get("/:id", protect, getFoundItemById);

// Create found item - Login required
router.post(
  "/",
  protect,
  upload.single("image"),
  createFoundItem
);

// Update my found item - Login required
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateFoundItem
);

// Delete my found item - Login required
router.delete(
  "/:id",
  protect,
  deleteFoundItem
);

module.exports = router;