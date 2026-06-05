const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const assetRoutes = require("./routes/assetRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes"); // ⭐ ADD THIS
const complaintRoutes = require("./routes/complaintRoutes");
const app = express();

/*
=====================
DB CONNECT
=====================
*/

connectDB();

/*
=====================
MIDDLEWARE
=====================
*/
require("./cron/warrantyCron");
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://office-asset-tracker.vercel.app",
    ],
    credentials: true,
  }),
);

/*
=====================
STATIC UPLOADS
=====================
*/

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/*
=====================
ROUTES
=====================
*/

app.get("/", (req, res) => {
  res.json({
    message: "API Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", notificationRoutes); // notification API
app.use("/api/assets", assetRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/complaints", complaintRoutes);
/*
=====================
404
=====================
*/

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

/*
=====================
ERROR HANDLER
=====================
*/

app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(500).json({
    message: "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
