// // const mongoose = require("mongoose");

// // const notificationSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     message: {
// //       type: String,
// //       required: true,
// //     },
// //     type: {
// //       type: String,
// //       enum: ["assignment", "warranty"],
// //       default: "assignment",
// //     },
// //     assetId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Asset",
// //     },
// //     isRead: {
// //       type: Boolean,
// //       default: false,
// //     },
// //   },
// //   { timestamps: true },
// // );

// // module.exports = mongoose.model("Notification", notificationSchema);





// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     assetId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Asset",
//     },
//     message: String,
//     type: String,
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// );

// // ✅ PREVENT DUPLICATES
// notificationSchema.index(
//   { userId: 1, assetId: 1, type: 1 },
//   { unique: true },
// );

// module.exports = mongoose.model("Notification", notificationSchema);
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    message: String,
    type: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);