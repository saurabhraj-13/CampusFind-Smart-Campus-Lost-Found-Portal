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

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const lostItem = await LostItem.create({
      itemName,
      category,
      description,
      lostLocation,
      lostDate,
      image,
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


// Get all Lost Items
const getLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find()
      .sort({ createdAt: -1 });

    res.status(200).json(lostItems);

  } catch (error) {
    console.error("Get Lost Items Error:", error);

    res.status(500).json({
      message: "Server error while fetching lost items.",
    });
  }
};


// Get Single Lost Item
const getLostItemById = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id)
      .populate(
        "reportedBy",
        "name phone email"
      );

    if (!lostItem) {
      return res.status(404).json({
        message: "Lost item not found.",
      });
    }

    res.status(200).json(lostItem);

  } catch (error) {
    console.error("Get Lost Item By ID Error:", error);

    res.status(500).json({
      message: "Server error while fetching lost item.",
    });
  }
};


// Get My Lost Items
const getMyLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find({
      reportedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(lostItems);

  } catch (error) {
    console.error("Get My Lost Items Error:", error);

    res.status(500).json({
      message: "Server error while fetching your lost items.",
    });
  }
};


// Update My Lost Item
const updateLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findOne({
      _id: req.params.id,
      reportedBy: req.user.id,
    });

    if (!lostItem) {
      return res.status(404).json({
        message: "Lost item not found or you are not authorized.",
      });
    }

    const {
      itemName,
      category,
      description,
      lostLocation,
      lostDate,
    } = req.body;

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

    lostItem.itemName = itemName;
    lostItem.category = category;
    lostItem.description = description;
    lostItem.lostLocation = lostLocation;
    lostItem.lostDate = lostDate;

    // Update image only when a new image is uploaded
    if (req.file) {
      lostItem.image = `/uploads/${req.file.filename}`;
    }

    await lostItem.save();

    res.status(200).json({
      message: "Lost item updated successfully!",
      item: lostItem,
    });

  } catch (error) {
    console.error("Update Lost Item Error:", error);

    res.status(500).json({
      message: "Server error while updating lost item.",
    });
  }
};


// Delete My Lost Item
const deleteLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findOne({
      _id: req.params.id,
      reportedBy: req.user.id,
    });

    if (!lostItem) {
      return res.status(404).json({
        message: "Lost item not found or you are not authorized.",
      });
    }

    await LostItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lost item deleted successfully!",
    });

  } catch (error) {
    console.error("Delete Lost Item Error:", error);

    res.status(500).json({
      message: "Server error while deleting lost item.",
    });
  }
};


module.exports = {
  createLostItem,
  getLostItems,
  getLostItemById,
  getMyLostItems,
  updateLostItem,
  deleteLostItem,
};