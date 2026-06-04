const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ============================
// CREATE COMPLAINT (USER)
// ============================

exports.createComplaint = async (req, res) => {
  try {
    const { assetId, description } = req.body;

    if (!assetId || !description || !req.file) {
      return res.status(400).json({
        message: "All fields including image required",
      });
    }
    const complaint = await Complaint.create({
      user: req.user.id,
      asset: assetId,
      description,
      image: req.file.filename,
    });

    // 🔥 NOTIFY ADMINS
    const admins = await User.find({ role: "admin" });

    const notifications = admins.map((admin) => ({
      userId: admin._id,
      assetId,
      message: "🛠 New complaint raised",
      type: "complaint-created",
    }));

    await Notification.insertMany(notifications, {
      ordered: false,
    });
    res.json({
      message: "Complaint submitted",
      complaint,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating complaint" });
  }
};

// ============================
// GET USER COMPLAINTS
// ============================

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.id,
    })
      .populate("asset", "assetName")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// ============================
// GET ALL COMPLAINTS (ADMIN)
// ============================

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name")
      .populate("asset", "assetName")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all complaints" });
  }
};
// ============================
// UPDATE STATUS (ADMIN)
// ============================

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // VALIDATE STATUS

    const validStatus = ["Pending", "In Progress", "Resolved"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // FIND COMPLAINT

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // UPDATE STATUS

    complaint.status = status;

    await complaint.save();

    // ============================
    // NOTIFY USER
    // ============================

    try {
      await Notification.create({
        userId: complaint.user,

        assetId: complaint.asset,

        message: `Your complaint status changed to "${status}"`,

        type: "complaint-update",
      });
    } catch (notifyError) {
      console.log("NOTIFICATION ERROR:", notifyError);
    }

    // SUCCESS

    res.json({
      message: "Status updated successfully",

      complaint,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
