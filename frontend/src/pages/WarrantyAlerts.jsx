import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import { FaShieldAlt } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import "./warrantyalerts.css";

function WarrantyAlerts() {
  const [alerts, setAlerts] = useState([]);

  /*
  ======================
  FETCH ALERTS
  ======================
  */

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/assets/warranty-alerts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAlerts(res.data);
    } catch {
      alert("Failed to load warranty alerts");
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="warranty-container">
      <Sidebar />

      <div className="warranty-main">
        {/* =========================
            PAGE HEADER
        ========================== */}

        <div className="page-header-section-warranty">
          <div className="warranty-header-left">
            <PageHeader title="Warranty Alerts" />

            <button className="refresh-btn" onClick={fetchAlerts}>
              <FaSyncAlt className="refresh-icon" />
              Refresh
            </button>
          </div>
        </div>
        {/* =========================
            ALERT GRID
        ========================== */}

        {alerts.length > 0 ? (
          <div className="alert-grid">
            {alerts.map((asset) => {
              const expiry = new Date(asset.warrantyExpiry);

              const today = new Date();

              const daysLeft = Math.ceil(
                (expiry - today) / (1000 * 60 * 60 * 24),
              );

              return (
                <div className="alert-card" key={asset._id}>
                  <h3>{asset.assetName}</h3>

                  <p>
                    <strong>Category :</strong> {asset.category}
                  </p>

                  <p>
                    <strong>Warranty Expiry :</strong>{" "}
                    {expiry.toLocaleDateString()}
                  </p>

                  <div
                    className={`badge ${daysLeft <= 7 ? "danger" : "warning"}`}
                  >
                    {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-alert">
            <h3>No Warranty Expiring Soon</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default WarrantyAlerts;
