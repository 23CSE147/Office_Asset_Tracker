// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   FaLaptop,
//   FaClipboardList,
//   FaUserCheck,
//   FaTools,
//   FaSignOutAlt,
//   FaHome,
// } from "react-icons/fa";

// import { Pie } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import Sidebar from "../components/Sidebar";

// import "./dashboard.css";

// ChartJS.register(ArcElement, Tooltip, Legend);

// function Dashboard() {

//   const navigate = useNavigate();

//   const role = localStorage.getItem("role");
//   const userName = localStorage.getItem("userName");

//   const [stats, setStats] = useState({
//     totalAssets: 0,
//     assignedAssets: 0,
//     availableAssets: 0,
//     maintenanceAssets: 0,
//   });

//   const [alerts, setAlerts] = useState([]);

//   /*
//   ======================
//   FETCH STATS
//   ======================
//   */

//   const fetchStats = async () => {
//     try {

//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/assets/stats",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStats(res.data);

//     } catch {
//       console.log("Stats loading failed");
//     }
//   };

//   /*
//   ======================
//   FETCH WARRANTY ALERTS
//   ======================
//   */

//   const fetchAlerts = async () => {
//     try {

//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/assets/warranty-alerts",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setAlerts(res.data);

//     } catch {
//       console.log("Alert loading failed");
//     }
//   };

//   /*
//   ======================
//   LOAD DATA ONLY FOR ADMIN
//   ======================
//   */

//   useEffect(() => {

//     if (role === "admin") {
//       fetchStats();
//       fetchAlerts();
//     }

//   }, []);

//   /*
//   ======================
//   CHART DATA
//   ======================
//   */

//   const chartData = {
//     labels: ["Available", "Assigned", "Maintenance"],
//     datasets: [
//       {
//         label: "Assets",
//         data: [
//           stats.availableAssets,
//           stats.assignedAssets,
//           stats.maintenanceAssets,
//         ],
//         backgroundColor: [
//           "#22c55e",
//           "#ef4444",
//           "#f59e0b",
//         ],
//       },
//     ],
//   };

//   /*
//   ======================
//   LOGOUT
//   ======================
//   */

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="dashboard-container">

//       {/* SIDEBAR */}

//       <Sidebar />

//       <div className="dashboard-main">

//         {/* HEADER */}

//         <div className="dashboard-header">

//           <div>
//             <h2>
//               Welcome,
//               <span> {userName}</span>
//             </h2>

//             <p className="role-badge">{role}</p>
//           </div>

//           <div className="header-actions">

//             <button
//               className="home-btn"
//               onClick={() => navigate("/")}
//             >
//               <FaHome />
//               Home
//             </button>

//             <button
//               className="logout-btn"
//               onClick={handleLogout}
//             >
//               <FaSignOutAlt />
//               Logout
//             </button>

//           </div>
//         </div>

//         {/* ================= ADMIN DASHBOARD ================= */}

//         {role === "admin" && (
//           <>
//             {/* STATS */}

//             <div className="stats-grid">

//               <div className="stat-card">
//                 <h3>Total Assets</h3>
//                 <p>{stats.totalAssets}</p>
//               </div>

//               <div className="stat-card">
//                 <h3>Assigned</h3>
//                 <p>{stats.assignedAssets}</p>
//               </div>

//               <div className="stat-card">
//                 <h3>Available</h3>
//                 <p>{stats.availableAssets}</p>
//               </div>

//               <div className="stat-card">
//                 <h3>Maintenance</h3>
//                 <p>{stats.maintenanceAssets}</p>
//               </div>

//             </div>

//             {/* CHART */}

//             <div className="chart-box">
//               <h3>Asset Distribution</h3>
//               <Pie data={chartData} />
//             </div>

//             {/* WARRANTY ALERT */}

//             {alerts.length > 0 && (
//               <div className="alert-box">

//                 <h3>Warranty Expiring Soon</h3>

//                 <ul>

//                   {alerts.map((asset) => (
//                     <li key={asset._id}>
//                       {asset.assetName} -{" "}
//                       {new Date(asset.warrantyExpiry).toLocaleDateString()}
//                     </li>
//                   ))}

//                 </ul>

//               </div>
//             )}

//             {/* ADMIN CARDS */}

//             <div className="dashboard-grid">

//               <div
//                 className="dashboard-card"
//                 onClick={() => navigate("/add-asset")}
//               >
//                 <FaLaptop />
//                 <h3>Add Asset</h3>
//                 <p>Register company devices</p>
//               </div>

//               <div
//                 className="dashboard-card"
//                 onClick={() => navigate("/assets")}
//               >
//                 <FaClipboardList />
//                 <h3>View Assets</h3>
//                 <p>Track inventory</p>
//               </div>

//               <div
//                 className="dashboard-card"
//                 onClick={() => navigate("/assign-asset")}
//               >
//                 <FaUserCheck />
//                 <h3>Assign Asset</h3>
//                 <p>Allocate devices</p>
//               </div>

//             </div>
//           </>
//         )}

//         {/* ================= EMPLOYEE DASHBOARD ================= */}

//         {role === "employee" && (
//           <div className="dashboard-grid">

//             <div
//               className="dashboard-card"
//               onClick={() => navigate("/assets")}
//             >
//               <FaLaptop />
//               <h3>My Assets</h3>
//               <p>Assigned devices</p>
//             </div>

//             <div
//               className="dashboard-card"
//               onClick={() => navigate("/raise-complaint")}
//             >
//               <FaTools />
//               <h3>Raise Complaint</h3>
//               <p>Report issues</p>
//             </div>

//             <div
//               className="dashboard-card"
//               onClick={() => navigate("/maintenance")}
//             >
//               <FaClipboardList />
//               <h3>Complaint Status</h3>
//               <p>Track progress</p>
//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaLaptop,
  FaClipboardList,
  FaUserCheck,
  FaTools,
  FaSignOutAlt,
  FaHome,
  FaBell,
} from "react-icons/fa";

import axios from "axios";
import Sidebar from "../components/Sidebar";

import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  /*
  ============================
  FETCH NOTIFICATIONS COUNT
  ============================
  */

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`,
      );

      setNotifications(res.data);
    } catch (error) {
      console.log("Notification Error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        {/* HEADER */}

        <div className="dashboard-header">
          <div>
            <h2>
              Welcome,
              <span> {userName}</span>
            </h2>

            <p className="role-badge">{role}</p>
          </div>

          <div className="header-actions">
            {/* 🔔 NOTIFICATION BUTTON */}

            <div className="notification-wrapper">
              <button
                className="notification-btn"
                onClick={() => navigate("/notifications")}
              >
                <FaBell />

                {notifications.filter((n) => !n.isRead).length > 0 && (
                  <span className="notification-count">
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                )}
              </button>
            </div>

            {/* HOME */}

            <button className="home-btn" onClick={() => navigate("/")}>
              <FaHome />
              Home
            </button>

            {/* LOGOUT */}

            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        {/* DASHBOARD GRID */}

        <div className="dashboard-grid">
          {role === "admin" && (
            <>
              <div
                className="dashboard-card"
                onClick={() => navigate("/add-asset")}
              >
                <FaLaptop />
                <h3>Add Asset</h3>
                <p>Register company devices</p>
              </div>

              <div
                className="dashboard-card"
                onClick={() => navigate("/assets")}
              >
                <FaClipboardList />
                <h3>View Assets</h3>
                <p>Track inventory</p>
              </div>

              <div
                className="dashboard-card"
                onClick={() => navigate("/assign-asset")}
              >
                <FaUserCheck />
                <h3>Assign Asset</h3>
                <p>Allocate devices</p>
              </div>

              <div
                className="dashboard-card"
                onClick={() => navigate("/assignments")}
              >
                <FaClipboardList />
                <h3>Assignments</h3>
                <p>View assigned assets</p>
              </div>
            </>
          )}

          {role === "employee" && (
            <>
              <div
                className="dashboard-card"
                onClick={() => navigate("/assets")}
              >
                <FaLaptop />
                <h3>My Assets</h3>
                <p>Assigned devices</p>
              </div>

              <div
                className="dashboard-card"
                onClick={() => navigate("/raise-complaint")}
              >
                <FaTools />
                <h3>Raise Complaint</h3>
                <p>Report issues</p>
              </div>

              <div
                className="dashboard-card"
                onClick={() => navigate("/complaint-status")}
              >
                <FaClipboardList />
                <h3>Complaint Status</h3>
                <p>Track progress</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
