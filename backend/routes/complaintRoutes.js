const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

// USER
router.post("/", authMiddleware, createComplaint);
router.get("/my", authMiddleware, getMyComplaints);

// ADMIN
router.get("/", authMiddleware, getAllComplaints);
router.put("/:id", authMiddleware, updateComplaintStatus);

module.exports = router;