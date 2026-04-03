// const cron = require("node-cron");
// const Asset = require("../models/Asset");
// const Notification = require("../models/Notification");
// const User = require("../models/User");

// // Runs every day at 9 AM
// cron.schedule("0 9 * * *", async () => {
//   try {
//     console.log("Checking warranty expiry...");

//     const today = new Date();
//     const next30Days = new Date();
//     next30Days.setDate(today.getDate() + 30);

//     // find assets expiring soon
//     const assets = await Asset.find({
//       warrantyExpiry: {
//         $gte: today,
//         $lte: next30Days,
//       },
//     });

//     // find admins
//     const admins = await User.find({ role: "admin" });

//     for (let asset of assets) {
//       for (let admin of admins) {
//         // prevent duplicate notifications
//         const exists = await Notification.findOne({
//           userId: admin._id,
//           message: { $regex: asset.assetName },
//         });

//         if (!exists) {
//           await Notification.create({
//             userId: admin._id,
//             assetId: asset._id, // ⭐ FIX
//             message: `Warranty for ${asset.assetName} expires on ${new Date(asset.warrantyExpiry).toLocaleDateString()}`,
//             type: "warranty",
//           });
//         }
//       }
//     }

//     console.log("Warranty check completed");
//   } catch (error) {
//     console.log("Cron error:", error);
//   }
// });
const cron = require("node-cron");
const Asset = require("../models/Asset");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ✅ prevent multiple runs
let isRunning = false;

cron.schedule("0 9 * * *", async () => {
  if (isRunning) return;
  isRunning = true;

  try {
    // console.log("Checking warranty expiry...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const assets = await Asset.find({
      warrantyExpiry: {
        $gte: today,
        $lte: next30Days,
      },
    });

    const admins = await User.find({ role: "admin" });

    for (let asset of assets) {
      for (let admin of admins) {
        const exists = await Notification.findOne({
          userId: admin._id,
          assetId: asset._id,
          type: "warranty",
        });

        if (!exists) {
          await Notification.create({
            userId: admin._id,
            assetId: asset._id,
            message: `Warranty for ${asset.assetName} expires on ${new Date(
              asset.warrantyExpiry,
            ).toLocaleDateString()}`,
            type: "warranty",
          });
        }
      }
    }

    // console.log("Warranty check completed");
  } catch (error) {
    console.log("Cron error:", error);
  } finally {
    isRunning = false;
  }
});