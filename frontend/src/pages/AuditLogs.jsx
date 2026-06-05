import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import "./auditlogs.css";

// ✅ TOAST
import { toast } from "react-toastify";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);
import PageHeader from "../components/PageHeader";
function AuditLogs() {
  const [stats, setStats] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const role = localStorage.getItem("role");

  /*
  =====================
  FETCH ASSET STATS
  =====================
  */

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/assets/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data);
    } catch {
      toast.error("Failed to load stats ❌");
    }
  };

  /*
  =====================
  FETCH ASSIGNMENTS
  =====================
  */

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAssignments(res.data);
    } catch {
      toast.error("Failed to load assignments ❌");
    }
  };

  /*
  =====================
  FETCH WARRANTY ALERTS
  =====================
  */

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/assets/warranty-alerts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setAlerts(res.data);
    } catch {
      toast.error("Failed to load alerts ❌");
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchStats();
      fetchAssignments();
      fetchAlerts();
    }
  }, []);

  /*
  =====================
  DOWNLOAD EXCEL REPORT
  =====================
  */

  const downloadReport = () => {
    try {
      const reportData = assignments.map((a) => ({
        Asset: a.asset?.assetName,
        Employee: a.employee?.name,
        Email: a.employee?.email,
        AssignedDate: new Date(
          a.assignedDate || a.createdAt,
        ).toLocaleDateString(),
        Status: a.returned ? "Returned" : "Assigned",
      }));

      const worksheet = XLSX.utils.json_to_sheet(reportData);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Report");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const file = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(file, "Asset_Audit_Report.xlsx");

      // ✅ SUCCESS TOAST
      toast.success("Report downloaded successfully ✅");
    } catch {
      toast.error("Download failed ❌");
    }
  };

  return (
    <div className="audit-container">
      <Sidebar />

      <div className="audit-main">
        {/* =========================
          PAGE HEADER SECTION
      ========================== */}

        <div className="page-header-section-audit">
         
            <PageHeader title="Audit Logs" />
          

          <button className="download-btn" onClick={downloadReport}>
            Download Report
          </button>
        </div>
        {/* =========================
          STATS
      ========================== */}

        <div className="audit-stats">
          <div className="audit-card">
            <h3>Total Assets</h3>
            <p>{stats.totalAssets || 0}</p>
          </div>

          <div className="audit-card">
            <h3>Assigned</h3>
            <p>{stats.assignedAssets || 0}</p>
          </div>

          <div className="audit-card">
            <h3>Available</h3>
            <p>{stats.availableAssets || 0}</p>
          </div>

          <div className="audit-card">
            <h3>Maintenance</h3>
            <p>{stats.maintenanceAssets || 0}</p>
          </div>
        </div>

        {/* =========================
          PIE CHART
      ========================== */}

        <div className="audit-chart">
          <h3>Asset Distribution</h3>

          <Pie
            data={{
              labels: ["Available", "Assigned", "Maintenance"],
              datasets: [
                {
                  data: [
                    stats.availableAssets || 0,
                    stats.assignedAssets || 0,
                    stats.maintenanceAssets || 0,
                  ],

                  backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
                },
              ],
            }}
          />
        </div>

        {/* =========================
          BAR CHART
      ========================== */}

        <div className="usage-chart">
          <h3>Monthly Asset Usage</h3>

          <Bar
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],

              datasets: [
                {
                  label: "Asset Assignments",

                  data: new Array(12).fill(0),

                  backgroundColor: "#4f46e5",
                },
              ],
            }}
          />
        </div>

        {/* =========================
          TABLE
      ========================== */}

        <div className="audit-table">
          <h3>Asset Assignment History</h3>

          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Employee</th>
                <th>Email</th>
                <th>Assigned Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {assignments
                .filter((a) => a.asset)
                .map((a) => (
                  <tr key={a._id}>
                    <td>{a.asset?.assetName}</td>

                    <td>{a.employee?.name}</td>

                    <td>{a.employee?.email}</td>

                    <td>
                      {new Date(
                        a.assignedDate || a.createdAt,
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={
                          a.returned ? "status returned" : "status assigned"
                        }
                      >
                        {a.returned ? "Returned" : "Assigned"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;
