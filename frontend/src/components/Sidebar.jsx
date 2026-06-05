import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  FaLaptop,
  FaClipboardList,
  FaUserCheck,
  FaTools,
  FaChartPie,
  FaHome,
  FaBell,
  FaExclamationTriangle,
  FaCog,
} from "react-icons/fa";

import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo" onClick={() => navigate("/dashboard")}>
        AssetTrack
      </h2>

      <ul>
        <li onClick={() => navigate("/dashboard")}>
          <FaHome />
          {t("nav.dashboard")}
        </li>

        <li onClick={() => navigate("/assets")}>
          <FaLaptop />
          {t("nav.assets")}
        </li>

        {/* ADMIN MENU */}

        {role === "admin" && (
          <>
            <li onClick={() => navigate("/add-asset")}>
              <FaLaptop />
              Add Asset
            </li>

            <li onClick={() => navigate("/assign-asset")}>
              <FaUserCheck />
              Assign Asset
            </li>

            <li onClick={() => navigate("/assignments")}>
              <FaClipboardList />
              Assigned Assets
            </li>

            <li onClick={() => navigate("/audit")}>
              <FaChartPie />
              Audit Logs
            </li>
            <li onClick={() => navigate("/warranty-alerts")}>
              <FaBell />
              Warranty Alerts
            </li>
            <li onClick={() => navigate("/admin-complaints")}>
              <FaExclamationTriangle />
              {t("nav.complaints")}
            </li>
          </>
        )}

        {/* EMPLOYEE MENU */}

        {role === "employee" && (
          <>
            <li onClick={() => navigate("/raise-complaint")}>
              <FaTools />
              Raise Complaint
            </li>

            <li onClick={() => navigate("/complaint-status")}>
              <FaClipboardList />
              Complaint Status
            </li>
          </>
        )}

        <li onClick={() => navigate("/settings")}>
          <FaCog />
          {t("nav.settings")}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
