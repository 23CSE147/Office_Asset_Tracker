// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token)
//     return res.status(401).json({ message: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

/*
---------------------------------------
AUTH MIDDLEWARE
---------------------------------------
Checks JWT Token From Header

Authorization :
Bearer TOKEN
---------------------------------------
*/

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization Header

    const authHeader = req.headers.authorization;

    // Check Header Exists

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // Extract Token

    const token = authHeader.split(" ")[1];

    // Verify Token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach User Data

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error :", error.message);

    // Token Expired

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    // Invalid Token

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
