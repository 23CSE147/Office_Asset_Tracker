// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" },
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getEmployees = async (req, res) => {
//   const User = require("../models/User");

//   try {
//     const employees = await User.find({
//       role: "employee",
//     }).select("_id name");

//     res.json(employees);
//   } catch {
//     res.status(500).json({
//       message: "Failed",
//     });
//   }
// };






const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

/*
=================================
REGISTER
=================================
*/

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Password validation
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number & special character (min 8 chars)",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/*
=================================
LOGIN
=================================
*/
/*
=================================
LOGIN
=================================
*/

exports.login = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid Email or Password",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid Email or Password",
      });

    }

    const token = jwt.sign(

      {
        id: user._id,

        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1h",
      }

    );

    /* =========================
       RESPONSE
    ========================= */

    res.status(200).json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        profileImage:
          user.profileImage,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
/*
=================================
GET EMPLOYEES (PROTECTED)
=================================
*/

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};