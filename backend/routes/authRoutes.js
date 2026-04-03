// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);
// router.get(
//   "/employees",

//   authMiddleware,

//   getEmployees,
// );
// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  register,

  login,

  getEmployees,
} = require("../controllers/authController");

// ✅ IMPORT MIDDLEWARE

const authMiddleware = require("../middleware/authMiddleware");

// ========================
// PUBLIC
// ========================

router.post("/register", register);

router.post("/login", login);

// ========================
// PROTECTED
// ========================

router.get(
  "/employees",

  authMiddleware,

  getEmployees,
);

module.exports = router;
