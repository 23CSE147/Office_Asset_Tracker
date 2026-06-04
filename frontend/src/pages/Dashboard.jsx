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
