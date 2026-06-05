const User = require("../models/User");
const bcrypt = require("bcryptjs");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage,
  phone: user.phone,
  employeeId: user.employeeId,
  department: user.department,
  designation: user.designation,
  address: user.address,
  bio: user.bio,
  language: user.language,
  theme: user.theme,
  emailNotifications: user.emailNotifications,
  systemNotifications: user.systemNotifications,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/* =========================
   UPDATE PROFILE IMAGE
========================= */

exports.updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    user.profileImage = req.file.filename;

    await user.save();

    res.json({
      message: "Profile image updated",
      profileImage: user.profileImage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};

/* =========================
   CHANGE PASSWORD
========================= */

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password",
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to change password",
    });

  }
};

/* =========================
   DELETE ACCOUNT
========================= */

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete account",
    });
  }
};

/* =========================
   GET PROFILE
========================= */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to load profile",
    });
  }
};

/* =========================
   UPDATE PROFILE
========================= */

exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      employeeId,
      department,
      designation,
      address,
      bio,
      language,
      theme,
      emailNotifications,
      systemNotifications,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Full name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email address is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Enter a valid email address",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingEmailUser = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    if (existingEmailUser) {
      return res.status(400).json({
        message: "Email address is already in use",
      });
    }

    user.name = name.trim();
    user.email = email.trim().toLowerCase();
    user.phone = phone || "";
    user.employeeId = employeeId || "";
    user.department = department || "";
    user.designation = designation || "";
    user.address = address || "";
    user.bio = bio || "";

    if (["en", "ta", "hi"].includes(language)) {
      user.language = language;
    }

    if (["light", "dark"].includes(theme)) {
      user.theme = theme;
    }

    if (emailNotifications !== undefined) {
      user.emailNotifications = emailNotifications === true || emailNotifications === "true";
    }

    if (systemNotifications !== undefined) {
      user.systemNotifications = systemNotifications === true || systemNotifications === "true";
    }

    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
