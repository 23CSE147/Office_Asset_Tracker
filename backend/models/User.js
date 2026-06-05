const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    profileImage: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    employeeId: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      enum: ["en", "ta", "hi"],
      default: "en",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    systemNotifications: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
