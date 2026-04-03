const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },

    purchaseDate: Date,

    warrantyExpiry: Date,

    condition: {
      type: String,

      enum: ["New", "Good", "Needs Maintenance", "Damaged"],

      default: "Good",
    },

    image: {
      type: String,

      default: "",
    },

    status: {
      type: String,

      enum: ["Available", "Assigned", "Maintenance"],

      default: "Available",
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Asset", assetSchema);
