// const Assignment = require("../models/Assignment");
// const Asset = require("../models/Asset");
// const Notification = require("../models/Notification");
// const User = require("../models/User");


// // ======================
// // ASSIGN ASSET
// // ======================
// exports.assignAsset = async (req, res) => {
//   try {

//     const { assetId, employeeId } = req.body;

//     if (!assetId || !employeeId) {
//       return res.status(400).json({
//         message: "Asset and Employee required",
//       });
//     }

//     const asset = await Asset.findById(assetId);
//     const employee = await User.findById(employeeId);

//     if (!asset || !employee) {
//       return res.status(404).json({
//         message: "Asset or Employee not found",
//       });
//     }

//     const assignment = await Assignment.create({
//       asset: assetId,
//       employee: employeeId,
//       assignDate: new Date(),
//     });

//     await Asset.findByIdAndUpdate(assetId, {
//       status: "Assigned",
//     });

//     // 🔔 Employee Notification
//     await Notification.create({
//       userId: employeeId,
//       assetId: assetId, 
//       message: `Asset "${asset.assetName}" has been assigned to you`,
//       type: "assignment",
//     });

//     res.json({
//       message: "Asset Assigned Successfully",
//       assignment,
//     });

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       message: "Assign Failed",
//     });

//   }
// };



// // ======================
// // GET ASSIGNMENTS
// // ======================
// exports.getAssignments = async (req, res) => {
//   try {

//     const data = await Assignment.find()
//       .populate("asset")
//       .populate("employee", "name email");

//     res.json(data);

//   } catch (error) {

//     res.status(500).json({
//       message: "Fetch Failed",
//     });

//   }
// };



// // ======================
// // RETURN ASSET
// // ======================
// exports.returnAsset = async (req, res) => {
//   try {

//     const assign = await Assignment.findById(req.params.id)
//       .populate("asset")
//       .populate("employee");

//     if (!assign) {
//       return res.status(404).json({
//         message: "Assignment not found",
//       });
//     }

//     assign.returnDate = new Date();
//     assign.returned = true;

//     await assign.save();

//     await Asset.findByIdAndUpdate(assign.asset._id, {
//       status: "Available",
//     });

//     // ==============================
//     // 🔔 ADMIN RETURN NOTIFICATION
//     // ==============================

//     const admins = await User.find({ role: "admin" });

//     for (const admin of admins) {
//       await Notification.create({
//         userId: admin._id,
//         message: `${assign.employee.name} has returned ${assign.asset.assetName}`,
//         type: "assignment",
//       });
//     }

//     res.json({
//       message: "Returned Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Return Failed",
//     });

//   }
// };







const Assignment = require("../models/Assignment");
const Asset = require("../models/Asset");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ======================
// ASSIGN ASSET
// ======================
exports.assignAsset = async (req, res) => {
  try {
    const { assetId, employeeId } = req.body;

    if (!assetId || !employeeId) {
      return res.status(400).json({
        message: "Asset and Employee required",
      });
    }

    const asset = await Asset.findById(assetId);
    const employee = await User.findById(employeeId);

    if (!asset || !employee) {
      return res.status(404).json({
        message: "Asset or Employee not found",
      });
    }

    const assignment = await Assignment.create({
      asset: assetId,
      employee: employeeId,
      assignDate: new Date(),
      returned: false,
    });

    await Asset.findByIdAndUpdate(assetId, {
      status: "Assigned",
    });

    // 🔔 NOTIFICATION (NO DUPLICATE)
    const exists = await Notification.findOne({
      userId: employeeId,
      assetId: assetId,
      type: "assignment",
    });

    if (!exists) {
      await Notification.create({
        userId: employeeId,
        assetId: assetId,
        message: `Asset "${asset.assetName}" has been assigned to you`,
        type: "assignment",
      });
    }

    res.json({
      message: "Asset Assigned Successfully",
      assignment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Assign Failed",
    });
  }
};

// ======================
// GET ASSIGNMENTS
// ======================
exports.getAssignments = async (req, res) => {
  try {
    const data = await Assignment.find()
      .populate("asset")
      .populate("employee", "name email");

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Fetch Failed",
    });
  }
};

// exports.returnAsset = async (req, res) => {
//   try {
//     const userId = req.user.id; // 🔥 logged-in user

//     const assign = await Assignment.findOne({
//       _id: req.params.id,
//       employee: userId, // 🔥 ensure user owns asset
//       returned: false,
//     }).populate("asset");

//     if (!assign) {
//       return res.status(404).json({
//         message: "Assignment not found",
//       });
//     }

//     // update assignment
//     assign.returnDate = new Date();
//     assign.returned = true;
//     await assign.save();

//     // update asset
//     await Asset.findByIdAndUpdate(assign.asset._id, {
//       status: "Available",
//     });

//     res.json({
//       message: "Returned Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Return Failed",
//     });
//   }
// };

exports.returnAsset = async (req, res) => {
  try {

    const userId = req.user.id;

    const assign = await Assignment.findOne({
      _id: req.params.id,
      employee: userId,
      returned: false,
    })
    .populate("asset")
    .populate("employee");

    if (!assign) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // ======================
    // UPDATE ASSIGNMENT
    // ======================

    assign.returnDate = new Date();
    assign.returned = true;

    await assign.save();

    // ======================
    // UPDATE ASSET STATUS
    // ======================

    await Asset.findByIdAndUpdate(assign.asset._id, {
      status: "Available",
    });

    // ======================
    // 🔔 NOTIFY ADMINS
    // ======================

    const admins = await User.find({
      role: "admin",
    });

    const notifications = admins.map((admin) => ({
      userId: admin._id,
      assetId: assign.asset._id,
      message: `${assign.employee.name} returned asset "${assign.asset.assetName}"`,
      type: "return",
    }));

    await Notification.insertMany(notifications);

    // ======================
    // 🔔 OPTIONAL USER NOTIFICATION
    // ======================

    await Notification.create({
      userId: userId,
      assetId: assign.asset._id,
      message: `You returned asset "${assign.asset.assetName}" successfully`,
      type: "return",
    });

    res.json({
      message: "Returned Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Return Failed",
    });

  }
};