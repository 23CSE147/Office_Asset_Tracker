import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaTrash } from "react-icons/fa";
import "./notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(null);

  const userId = localStorage.getItem("userId");

  // ==========================
  // FETCH NOTIFICATIONS
  // ==========================
  const navigate = useNavigate();
  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`,
      );

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // OPEN NOTIFICATION
  // ==========================

  const openNotification = async (n) => {
    setSelected(n);

    if (!n.isRead) {
      try {
        await axios.put(
          `http://localhost:5000/api/notifications/read/${n._id}`,
        );

        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ==========================
  // DELETE NOTIFICATION
  // ==========================

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ==========================
  // TIME AGO FUNCTION
  // ==========================

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);

      if (interval > 1) {
        return interval + " " + key + "s ago";
      }

      if (interval === 1) {
        return interval + " " + key + " ago";
      }
    }

    return "Just now";
  };

  // ==========================
  // ICON BY TYPE
  // ==========================

  const getIcon = (type) => {
    if (type === "assignment") return "💻";
    if (type === "return") return "↩";
    if (type === "warranty") return "⚠";

    return "🔔";
  };

  // ==========================
  // GROUP NOTIFICATIONS
  // ==========================

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groups = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  notifications.forEach((n) => {
    const date = new Date(n.createdAt);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      groups.today.push(n);
    } else if (date.getTime() === yesterday.getTime()) {
      groups.yesterday.push(n);
    } else {
      groups.earlier.push(n);
    }
  });

  // ==========================
  // RENDER GROUP
  // ==========================

  const renderGroup = (title, data) => {
    if (data.length === 0) return null;

    return (
      <>
        <h3 className="group-title">{title}</h3>

        {data.map((n) => (
          <div
            key={n._id}
            className={`notification-card ${!n.isRead ? "unread" : ""}`}
            onClick={() => openNotification(n)}
          >
            <div className="notification-left">
              <span className="icon">{getIcon(n.type)}</span>

              <div>
                <p>{n.message}</p>

                <span>{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(n._id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <h2 className="notification-title">🔔 Notifications</h2>

        {notifications.length === 0 && (
          <p className="empty">No Notifications</p>
        )}

        {renderGroup("Today", groups.today)}
        {renderGroup("Yesterday", groups.yesterday)}
        {renderGroup("Earlier", groups.earlier)}

        {/* ==========================
        DETAIL MODAL
        ========================== */}

        {selected && (
          <div className="notification-modal" onClick={() => setSelected(null)}>
            <div
              className="notification-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="detail-title">
                {getIcon(selected.type)} Notification Details
              </h2>

              {/* <div className="detail-row">
                <strong>Notification ID</strong>
                <span>{selected._id}</span>
              </div> */}

              <div className="detail-row">
                <strong>Message</strong>
                <p>{selected.message}</p>
              </div>

              <div className="detail-row">
                <strong>Type</strong>
                <span className="type-badge">{selected.type}</span>
              </div>

              <div className="detail-row">
                <strong>Status</strong>
                <span
                  className={selected.isRead ? "status-read" : "status-unread"}
                >
                  {selected.isRead ? "Read" : "Unread"}
                </span>
              </div>

              <div className="detail-row">
                <strong>Date</strong>
                <span>{new Date(selected.createdAt).toLocaleString()}</span>
              </div>

              <div className="detail-row">
                <strong>Relative Time</strong>
                <span>{timeAgo(selected.createdAt)}</span>
              </div>

              <div className="modal-actions">
                <button
                  className="view-btn"
                  onClick={() => {
                    if (!selected.assetId) {
                      console.log("Asset ID:", selected.assetId);
                      alert("No asset linked to this notification");
                      return;
                    }

                    navigate(`/assets?assetId=${selected.assetId}`);
                  }}
                  
                >
                  View Asset
                </button>

                <button className="close-btn" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
