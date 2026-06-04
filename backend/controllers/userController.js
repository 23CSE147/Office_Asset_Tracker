const User = require("../models/User");

/* =========================
   UPDATE PROFILE IMAGE
========================= */

exports.updateProfileImage =
  async (req, res) => {

    try {

      const user =
        await User.findById(req.user.id);

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      if (!req.file) {

        return res.status(400).json({
          message: "No image uploaded",
        });

      }

      user.profileImage =
        req.file.filename;

      await user.save();

      res.json({

        message:
          "Profile image updated",

        profileImage:
          user.profileImage,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload failed",
      });

    }

};