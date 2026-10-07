const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    foundLocation: {
      type: String,
      required: true,
    },

    foundDate: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["found", "claimed"],
      default: "found",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoundItem", foundItemSchema);