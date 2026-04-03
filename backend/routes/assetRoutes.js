// const express = require("express");

// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");
// const {
//   addAsset,
//   getAssets,
//   updateAsset,
//   deleteAsset,
//   getAssetStats,
//   // getWarrantyAlerts,
//   assignAsset,
// } = require("../controllers/assetController");

// router.post(
//   "/",

//   authMiddleware,

//   upload.single("image"),

//   addAsset,
// );
// router.post("/assignAsset", assignAsset);
// router.get(
//   "/",

//   authMiddleware,

//   getAssets,
// );

// /* IMAGE UPDATE ALSO */

// router.put(
//   "/:id",

//   authMiddleware,

//   upload.single("image"),

//   updateAsset,
// );
// router.get("/stats", authMiddleware, getAssetStats);
// // router.get("/warranty-alerts", authMiddleware, getWarrantyAlerts);
// router.delete(
//   "/:id",

//   authMiddleware,

//   deleteAsset,
// );

// module.exports = router;




const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  addAsset,
  getAssets,
  updateAsset,
  deleteAsset,
  getAssetStats,
  getWarrantyAlerts,
  getMyAssets, // ✅ ADD THIS
} = require("../controllers/assetController");

router.post("/", authMiddleware, upload.single("image"), addAsset);

router.get("/", authMiddleware, getAssets);

router.put("/:id", authMiddleware, upload.single("image"), updateAsset);

router.get("/stats", authMiddleware, getAssetStats);
router.get("/my-assets", authMiddleware, getMyAssets);

// ✅ FIX 404
router.get("/warranty-alerts", authMiddleware, getWarrantyAlerts);

router.delete("/:id", authMiddleware, deleteAsset);

module.exports = router;