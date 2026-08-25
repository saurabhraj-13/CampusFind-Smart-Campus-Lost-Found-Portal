const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
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

    lostLocation: {
      type: String,
      required: true,
    },

    lostDate: {
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
      enum: ["lost", "found", "claimed"],
      default: "lost",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LostItem", lostItemSchema);