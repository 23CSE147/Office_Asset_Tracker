const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const upload =
  require("../middleware/upload");

const {
  updateProfileImage,
} = require("../controllers/userController");

/* =========================
   PROFILE IMAGE
========================= */

router.put(
  "/profile-image",

  authMiddleware,

  upload.single("image"),

  updateProfileImage
);

module.exports = router;