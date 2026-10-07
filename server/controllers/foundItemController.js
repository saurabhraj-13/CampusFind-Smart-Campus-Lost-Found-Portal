const FoundItem = require("../models/FoundItem");

// Create Found Item
const createFoundItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      description,
      foundLocation,
      foundDate,
    } = req.body;

    // Validate required fields
    if (
      !itemName ||
      !category ||
      !description ||
      !foundLocation ||
      !foundDate
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    // Image path
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    // Create found item
    const foundItem = await FoundItem.create({
      itemName,
      category,
      description,
      foundLocation,
      foundDate,
      image,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      message: "Found item reported successfully!",
      item: foundItem,
    });

  } catch (error) {
    console.error("Create Found Item Error:", error);

    res.status(500).json({
      message: "Server error while creating found item.",
    });
  }
};


// Get all Found Items
const getFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find()
      .sort({ createdAt: -1 });

    res.status(200).json(foundItems);

  } catch (error) {
    console.error("Get Found Items Error:", error);

    res.status(500).json({
      message: "Server error while fetching found items.",
    });
  }
};


// Get Single Found Item
const getFoundItemById = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id)
      .populate(
        "reportedBy",
        "name phone email"
      );

    if (!foundItem) {
      return res.status(404).json({
        message: "Found item not found.",
      });
    }

    res.status(200).json(foundItem);

  } catch (error) {
    console.error("Get Found Item By ID Error:", error);

    res.status(500).json({
      message: "Server error while fetching found item.",
    });
  }
};


// Get My Found Items
const getMyFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find({
      reportedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(foundItems);

  } catch (error) {
    console.error("Get My Found Items Error:", error);

    res.status(500).json({
      message: "Server error while fetching your found items.",
    });
  }
};


// Update My Found Item
const updateFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findOne({
      _id: req.params.id,
      reportedBy: req.user.id,
    });

    if (!foundItem) {
      return res.status(404).json({
        message: "Found item not found or you are not authorized.",
      });
    }

    const {
      itemName,
      category,
      description,
      foundLocation,
      foundDate,
    } = req.body;

    if (
      !itemName ||
      !category ||
      !description ||
      !foundLocation ||
      !foundDate
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    foundItem.itemName = itemName;
    foundItem.category = category;
    foundItem.description = description;
    foundItem.foundLocation = foundLocation;
    foundItem.foundDate = foundDate;

    // Update image only when a new image is uploaded
    if (req.file) {
      foundItem.image = `/uploads/${req.file.filename}`;
    }

    await foundItem.save();

    res.status(200).json({
      message: "Found item updated successfully!",
      item: foundItem,
    });

  } catch (error) {
    console.error("Update Found Item Error:", error);

    res.status(500).json({
      message: "Server error while updating found item.",
    });
  }
};


// Delete My Found Item
const deleteFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findOne({
      _id: req.params.id,
      reportedBy: req.user.id,
    });

    if (!foundItem) {
      return res.status(404).json({
        message: "Found item not found or you are not authorized.",
      });
    }

    await FoundItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Found item deleted successfully!",
    });

  } catch (error) {
    console.error("Delete Found Item Error:", error);

    res.status(500).json({
      message: "Server error while deleting found item.",
    });
  }
};


module.exports = {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
  getMyFoundItems,
  updateFoundItem,
  deleteFoundItem,
};