const LostItem = require("../models/LostItem");

// Create Lost Item
const createLostItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      description,
      lostLocation,
      lostDate,
    } = req.body;

    // Check required fields
    if (
      !itemName ||
      !category ||
      !description ||
      !lostLocation ||
      !lostDate
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const lostItem = await LostItem.create({
      itemName,
      category,
      description,
      lostLocation,
      lostDate,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      message: "Lost item reported successfully!",
      item: lostItem,
    });

  } catch (error) {
    console.error("Create Lost Item Error:", error);

    res.status(500).json({
      message: "Server error while creating lost item.",
    });
  }
};

module.exports = {
  createLostItem,
};