const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const upload =
  require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  updateProfileImage,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

/* =========================
   PROFILE
========================= */

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

/* =========================
   PROFILE IMAGE
========================= */

router.put(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  updateProfileImage
);

/* =========================
   CHANGE PASSWORD
========================= */

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

/* =========================
   ACCOUNT
========================= */

router.delete(
  "/account",
  authMiddleware,
  deleteAccount
);

module.exports = router;
