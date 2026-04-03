// const express = require("express");
// const router = express.Router();

// const Notification = require("../models/Notification");

// // GET USER NOTIFICATIONS
// router.get("/notifications/:userId", async (req, res) => {
//   try {

//     const notifications = await Notification.find({
//       userId: req.params.userId
//     }).sort({ createdAt: -1 });

//     res.json(notifications);

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Failed to fetch notifications"
//     });

//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET USER NOTIFICATIONS
router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
});

// MARK AS READ
router.put("/notifications/read/:id", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.json({
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
    });
  }
});

// DELETE NOTIFICATION
router.delete("/notifications/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
});
// MARK ALL AS READ
router.put("/notifications/read-all/:userId", async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.params.userId },
      { $set: { isRead: true } },
    );

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
    });
  }
});
module.exports = router;
