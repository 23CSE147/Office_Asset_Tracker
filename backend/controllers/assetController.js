// const Asset = require("../models/Asset");

// // =========================
// // ADD ASSET
// // =========================

// exports.addAsset = async (req, res) => {
//   try {
//     const {
//       assetName,
//       category,
//       serialNumber,
//       purchaseDate,
//       warrantyExpiry,
//       status,
//     } = req.body;

//     // Validation

//     if (!assetName || !category || !serialNumber) {
//       return res.status(400).json({
//         message: "Required Fields Missing",
//       });
//     }

//     // Duplicate Serial Check

//     const exists = await Asset.findOne({
//       serialNumber,
//     });

//     if (exists) {
//       return res.status(400).json({
//         message: "Serial Number Already Exists",
//       });
//     }

//     // Create Asset

//     const asset = new Asset({
//       assetName,
//       category,
//       serialNumber,
//       purchaseDate,
//       warrantyExpiry,
//       status,
//     });

//     await asset.save();

//     res.status(201).json({
//       message: "Asset Added Successfully",

//       asset,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// // =========================
// // GET ALL ASSETS
// // =========================

// exports.getAssets = async (req, res) => {
//   try {
//     const assets = await Asset.find()

//       .sort({ createdAt: -1 });

//     res.json(assets);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed To Fetch Assets",
//     });
//   }
// };

// // =========================
// // GET SINGLE ASSET
// // =========================

// exports.getAssetById = async (req, res) => {
//   try {
//     const asset = await Asset.findById(req.params.id);

//     if (!asset) {
//       return res.status(404).json({
//         message: "Asset Not Found",
//       });
//     }

//     res.json(asset);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error Fetching Asset",
//     });
//   }
// };

// // =========================
// // UPDATE ASSET
// // =========================

// exports.updateAsset = async (req, res) => {
//   try {
//     const updatedAsset = await Asset.findByIdAndUpdate(
//       req.params.id,

//       req.body,

//       {
//         new: true,

//         runValidators: true,
//       },
//     );

//     if (!updatedAsset) {
//       return res.status(404).json({
//         message: "Asset Not Found",
//       });
//     }

//     res.json({
//       message: "Asset Updated",

//       updatedAsset,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Update Failed",
//     });
//   }
// };

// // =========================
// // DELETE ASSET
// // =========================

// exports.deleteAsset = async (req, res) => {
//   try {
//     const asset = await Asset.findByIdAndDelete(req.params.id);

//     if (!asset) {
//       return res.status(404).json({
//         message: "Asset Not Found",
//       });
//     }

//     res.json({
//       message: "Asset Deleted Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Delete Failed",
//     });
//   }
// };

const Asset = require("../models/Asset");
const Assignment = require("../models/Assignment");
const Notification = require("../models/Notification");

// =========================
// ADD ASSET
// =========================
exports.addAsset = async (req, res) => {
  try {
    const {
      assetName,
      category,
      serialNumber,
      purchaseDate,
      warrantyExpiry,
      condition,
    } = req.body;

    if (!assetName || !category || !serialNumber) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const exists = await Asset.findOne({ serialNumber });

    if (exists) {
      return res.status(400).json({
        message: "Serial number already exists",
      });
    }

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    const asset = await Asset.create({
      assetName,
      category,
      serialNumber,
      purchaseDate,
      warrantyExpiry,
      condition,
      image,
      status: "Available",
    });

    res.status(201).json({
      message: "Asset added successfully",
      asset,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// GET ALL ASSETS
// =========================
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });

    res.json(assets);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch assets",
    });
  }
};

// =========================
// GET SINGLE ASSET
// =========================
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        message: "Asset not found",
      });
    }

    res.json(asset);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching asset",
    });
  }
};

// =========================
// UPDATE ASSET
// =========================
exports.updateAsset = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedAsset) {
      return res.status(404).json({
        message: "Asset not found",
      });
    }

    res.json({
      message: "Asset updated successfully",
      updatedAsset,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};

// =========================
// DELETE ASSET
// =========================
exports.deleteAsset = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({
        message: "Asset not found",
      });
    }

    // delete related assignments
    await Assignment.deleteMany({ asset: assetId });

    await Asset.findByIdAndDelete(assetId);

    res.json({
      message: "Asset and related assignments removed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

// =========================
// DASHBOARD STATS
// =========================
exports.getAssetStats = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();

    const assignedAssets = await Asset.countDocuments({
      status: "Assigned",
    });

    const availableAssets = await Asset.countDocuments({
      status: "Available",
    });

    const maintenanceAssets = await Asset.countDocuments({
      status: "Maintenance",
    });

    res.json({
      totalAssets,
      assignedAssets,
      availableAssets,
      maintenanceAssets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Stats failed",
    });
  }
};

exports.getWarrantyAlerts = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    // ✅ ONLY FETCH DATA (NO NOTIFICATION CREATION)
    const assets = await Asset.find({
      warrantyExpiry: {
        $gte: today,
        $lte: next30Days,
      },
    });

    res.json(assets);
  } catch (error) {
    console.error("Warranty API Error:", error);

    res.status(500).json({
      message: "Failed to fetch warranty alerts",
    });
  }
};
// =========================
// ASSIGN ASSET + NOTIFICATION
// =========================
exports.assignAsset = async (req, res) => {
  try {
    const { assetId, employeeId } = req.body;

    if (!assetId || !employeeId) {
      return res.status(400).json({
        message: "Asset and Employee required",
      });
    }

    // create assignment
    const assignment = await Assignment.create({
      asset: assetId,
      employee: employeeId,
      assignedDate: new Date(),
    });

    // update asset status
    await Asset.findByIdAndUpdate(assetId, {
      status: "Assigned",
    });

    // create notification
    await Notification.create({
      userId: employeeId,
      message: "A new asset has been assigned to you",
      type: "assignment",
    });

    res.json({
      message: "Asset assigned successfully",
      assignment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Asset assignment failed",
    });
  }
};
// =========================
// GET USER ASSIGNED ASSETS
// =========================
exports.getMyAssets = async (req, res) => {
  try {
    const userId = req.user.id;

    const assignments = await Assignment.find({
      employee: userId,
      returned: false,
    }).populate("asset");

    const assets = assignments.map((a) => a.asset);

    res.json(assets);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch user assets",
    });
  }
};

const returnAsset = async (assetId) => {
  if (!window.confirm("Return this asset?")) return;

  try {
    const token = localStorage.getItem("token");

    // 🔥 get ONLY user assignments
    const res = await axios.get("http://localhost:5000/api/assignments", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // find correct assignment
    const assignment = res.data.find(
      (a) =>
        a.asset && // ✅ prevent null crash
        a.asset._id === assetId &&
        !a.returned,
    );
    console.log(res.data);
    if (!assignment) {
      alert("Assignment not found");
      return;
    }

    // 🔥 return using assignment id
    await axios.put(
      `http://localhost:5000/api/assignments/return/${assignment._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    alert("Returned Successfully");

    // 🔥 refresh
    fetchAssets();
  } catch (error) {
    console.log(error);
    alert("Return Failed");
  }
};
exports.updateAsset = async (req, res) => {
  try {

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Asset.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};