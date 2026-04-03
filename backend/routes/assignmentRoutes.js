// const express = require("express");

// const router = express.Router();

// const auth = require("../middleware/authMiddleware");

// const admin = require("../middleware/adminMiddleware");

// const {
//   assignAsset,

//   getAssignments,
// } = require("../controllers/assignmentController");

// /*
// ADMIN ONLY
// */

// router.post(
//   "/",

//   auth,

//   admin,

//   assignAsset,
// );

// router.get(
//   "/",

//   auth,

//   admin,

//   getAssignments,
// );

// module.exports = router;

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  assignAsset,

  getAssignments,

  returnAsset,
} = require("../controllers/assignmentController");

// Assign Asset

router.post(
  "/",

  authMiddleware,

  assignAsset,
);

// Get Assignments

router.get(
  "/",

  authMiddleware,

  getAssignments,
);

// Return Asset

router.put(
  "/return/:id",

  authMiddleware,

  returnAsset,
);

module.exports = router;
