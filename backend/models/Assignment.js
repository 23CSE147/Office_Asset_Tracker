// const mongoose = require("mongoose");

// const assignmentSchema = new mongoose.Schema(
//   {
//     asset: {
//       type: mongoose.Schema.Types.ObjectId,

//       ref: "Asset",

//       required: true,
//     },

//     employee: {
//       type: mongoose.Schema.Types.ObjectId,

//       ref: "User",

//       required: true,
//     },

//     assignedDate: {
//       type: Date,

//       default: Date.now,
//     },

//     returned: {
//       type: Boolean,

//       default: false,
//     },
//   },

//   { timestamps: true },
// );

// module.exports = mongoose.model(
//   "Assignment",

//   assignmentSchema,
// );








const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignDate: {
      type: Date,
      default: Date.now,
    },

    returnDate: {
      type: Date,
    },

    returned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);