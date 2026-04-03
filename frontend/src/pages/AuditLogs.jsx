// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // import Sidebar from "../components/Sidebar";

// // import { Pie, Bar } from "react-chartjs-2";

// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// // } from "chart.js";

// // import * as XLSX from "xlsx";
// // import { saveAs } from "file-saver";

// // import "./auditlogs.css";

// // ChartJS.register(
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// // );

// // function AuditLogs() {
// //   const [stats, setStats] = useState({});
// //   const [assignments, setAssignments] = useState([]);
// //   const [alerts, setAlerts] = useState([]);

// //   const role = localStorage.getItem("role");

// //   /*
// //   =====================
// //   FETCH STATS
// //   =====================
// //   */

// //   const fetchStats = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axios.get("http://localhost:5000/api/assets/stats", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       setStats(res.data);
// //     } catch {
// //       console.log("Stats fetch error");
// //     }
// //   };

// //   /*
// //   =====================
// //   FETCH ASSIGNMENTS
// //   =====================
// //   */

// //   const fetchAssignments = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axios.get("http://localhost:5000/api/assignments", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       setAssignments(res.data);
// //     } catch {
// //       console.log("Assignment fetch error");
// //     }
// //   };

// //   /*
// //   =====================
// //   FETCH WARRANTY ALERTS
// //   =====================
// //   */

// //   const fetchAlerts = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axios.get(
// //         "http://localhost:5000/api/assets/warranty-alerts",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       setAlerts(res.data);
// //     } catch {
// //       console.log("Alert fetch error");
// //     }
// //   };

// //   useEffect(() => {
// //     if (role === "admin") {
// //       fetchStats();
// //       fetchAssignments();
// //       fetchAlerts();
// //     }
// //   }, []);

// //   /*
// //   =====================
// //   PIE CHART DATA
// //   =====================
// //   */

// //   const pieData = {
// //     labels: ["Available", "Assigned", "Maintenance"],
// //     datasets: [
// //       {
// //         label: "Assets",
// //         data: [
// //           stats.availableAssets || 0,
// //           stats.assignedAssets || 0,
// //           stats.maintenanceAssets || 0,
// //         ],
// //         backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
// //       },
// //     ],
// //   };

// //   /*
// //   =====================
// //   MONTHLY USAGE GRAPH
// //   =====================
// //   */

// //   const monthlyData = new Array(12).fill(0);

// //   assignments.forEach((a) => {
// //     const month = new Date(a.assignedDate).getMonth();
// //     monthlyData[month]++;
// //   });

// //   const usageChart = {
// //     labels: [
// //       "Jan",
// //       "Feb",
// //       "Mar",
// //       "Apr",
// //       "May",
// //       "Jun",
// //       "Jul",
// //       "Aug",
// //       "Sep",
// //       "Oct",
// //       "Nov",
// //       "Dec",
// //     ],

// //     datasets: [
// //       {
// //         label: "Asset Assignments",
// //         data: monthlyData,
// //         backgroundColor: "#4f46e5",
// //       },
// //     ],
// //   };

// //   /*
// //   =====================
// //   DOWNLOAD EXCEL REPORT
// //   =====================
// //   */

// //   const downloadReport = () => {
// //     const reportData = assignments.map((a) => ({
// //       Asset: a.asset?.assetName,
// //       Employee: a.employee?.name,
// //       Email: a.employee?.email,
// //       AssignedDate: new Date(a.assignedDate).toLocaleDateString(),
// //       Status: a.returned ? "Returned" : "Assigned",
// //     }));

// //     const worksheet = XLSX.utils.json_to_sheet(reportData);
// //     const workbook = XLSX.utils.book_new();

// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Report");

// //     const excelBuffer = XLSX.write(workbook, {
// //       bookType: "xlsx",
// //       type: "array",
// //     });

// //     const file = new Blob([excelBuffer], {
// //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //     });

// //     saveAs(file, "Asset_Audit_Report.xlsx");
// //   };

// //   return (
// //     <div className="audit-container">
// //       <Sidebar />

// //       <div className="audit-main">
// //         <h2>Asset Audit Dashboard</h2>

// //         {/* ================= STATS ================= */}

// //         <div className="audit-stats">
// //           <div className="audit-card">
// //             <h3>Total Assets</h3>
// //             <p>{stats.totalAssets || 0}</p>
// //           </div>

// //           <div className="audit-card">
// //             <h3>Assigned</h3>
// //             <p>{stats.assignedAssets || 0}</p>
// //           </div>

// //           <div className="audit-card">
// //             <h3>Available</h3>
// //             <p>{stats.availableAssets || 0}</p>
// //           </div>

// //           <div className="audit-card">
// //             <h3>Maintenance</h3>
// //             <p>{stats.maintenanceAssets || 0}</p>
// //           </div>
// //         </div>

// //         {/* ================= PIE CHART ================= */}

// //         <div className="audit-chart">
// //           <h3>Asset Distribution</h3>

// //           <Pie data={pieData} />
// //         </div>

// //         {/* ================= USAGE GRAPH ================= */}

// //         <div className="usage-chart">
// //           <h3>Monthly Asset Usage</h3>

// //           <Bar data={usageChart} />
// //         </div>

// //         {/* ================= WARRANTY ALERTS ================= */}

// //         {alerts.length > 0 && (
// //           <div className="alert-box">
// //             <h3>Warranty Expiring Soon</h3>

// //             <ul>
// //               {alerts.map((asset) => (
// //                 <li key={asset._id}>
// //                   {asset.assetName} -
// //                   {new Date(asset.warrantyExpiry).toLocaleDateString()}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}

// //         {/* ================= DOWNLOAD REPORT ================= */}

// //         <button className="download-btn" onClick={downloadReport}>
// //           Download Audit Report
// //         </button>

// //         {/* ================= ASSIGNMENT TABLE ================= */}

// //         <div className="audit-table">
// //           <h3>Asset Assignment History</h3>

// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Asset</th>
// //                 <th>Employee</th>
// //                 <th>Email</th>
// //                 <th>Assigned Date</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {assignments.map((a) => (
// //                 <tr key={a._id}>
// //                   <td>{a.asset?.assetName}</td>

// //                   <td>{a.employee?.name}</td>

// //                   <td>{a.employee?.email}</td>

// //                   <td>{new Date(a.assignedDate).toLocaleDateString()}</td>

// //                   <td>
// //                     {a.returned ? (
// //                       <span className="returned">Returned</span>
// //                     ) : (
// //                       <span className="active">Assigned</span>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* ================= ACTIVITY TIMELINE ================= */}

// //         <div className="timeline">
// //           <h3>Recent Asset Activity</h3>

// //           {assignments.slice(0, 6).map((a) => {
// //             const date = new Date(a.assignedDate);

// //             return (
// //               <div key={a._id} className="activity-card">
// //                 <div className="activity-icon">💻</div>

// //                 <div className="activity-info">
// //                   <h4>{a.asset?.assetName}</h4>

// //                   <p>
// //                     {a.returned
// //                       ? `Returned by ${a.employee?.name}`
// //                       : `Assigned to ${a.employee?.name}`}
// //                   </p>

// //                   <span>
// //                     {date.toLocaleDateString()} • {date.toLocaleTimeString()}
// //                   </span>
// //                 </div>

// //                 <div
// //                   className={`status-badge ${a.returned ? "returned" : "assigned"}`}
// //                 >
// //                   {a.returned ? "Returned" : "Assigned"}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AuditLogs;

// import { useEffect, useState } from "react";
// import axios from "axios";

// import Sidebar from "../components/Sidebar";

// import { Pie, Bar } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// import "./auditlogs.css";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// function AuditLogs() {
//   const [stats, setStats] = useState({});
//   const [assignments, setAssignments] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [search, setSearch] = useState("");

//   const role = localStorage.getItem("role");

//   /*
//   =====================
//   FETCH STATS
//   =====================
//   */

//   const fetchStats = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("http://localhost:5000/api/assets/stats", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setStats(res.data);
//   };

//   /*
//   =====================
//   FETCH ASSIGNMENTS
//   =====================
//   */

//   const fetchAssignments = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("http://localhost:5000/api/assignments", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setAssignments(res.data);
//   };

//   /*
//   =====================
//   FETCH ALERTS
//   =====================
//   */

//   const fetchAlerts = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       "http://localhost:5000/api/assets/warranty-alerts",
//       { headers: { Authorization: `Bearer ${token}` } },
//     );

//     setAlerts(res.data);
//   };

//   useEffect(() => {
//     if (role === "admin") {
//       fetchStats();
//       fetchAssignments();
//       fetchAlerts();
//     }
//   }, []);

//   /*
//   =====================
//   PIE CHART
//   =====================
//   */

//   const pieData = {
//     labels: ["Available", "Assigned", "Maintenance"],

//     datasets: [
//       {
//         data: [
//           stats.availableAssets || 0,
//           stats.assignedAssets || 0,
//           stats.maintenanceAssets || 0,
//         ],
//         backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
//       },
//     ],
//   };

//   /*
//   =====================
//   MONTHLY GRAPH
//   =====================
//   */

//   const monthlyData = new Array(12).fill(0);

//   assignments.forEach((a) => {
//     const month = new Date(a.assignedDate).getMonth();
//     monthlyData[month]++;
//   });

//   const usageChart = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],

//     datasets: [
//       {
//         label: "Asset Assignments",
//         data: monthlyData,
//         backgroundColor: "#4f46e5",
//       },
//     ],
//   };

//   /*
//   =====================
//   CATEGORY ANALYTICS
//   =====================
//   */

//   const categoryCounts = {};

//   assignments.forEach((a) => {
//     const cat = a.asset?.category || "Other";

//     if (!categoryCounts[cat]) categoryCounts[cat] = 0;

//     categoryCounts[cat]++;
//   });

//   const categoryChart = {
//     labels: Object.keys(categoryCounts),

//     datasets: [
//       {
//         label: "Assets by Category",
//         data: Object.values(categoryCounts),
//         backgroundColor: "#06b6d4",
//       },
//     ],
//   };

//   /*
//   =====================
//   SEARCH FILTER
//   =====================
//   */

//   const filteredAssignments = assignments.filter((a) =>
//     a.asset?.assetName?.toLowerCase().includes(search.toLowerCase()),
//   );

//   /*
//   =====================
//   DOWNLOAD REPORT
//   =====================
//   */

//   const downloadReport = () => {
//     const reportData = assignments.map((a) => ({
//       Asset: a.asset?.assetName,
//       Employee: a.employee?.name,
//       Email: a.employee?.email,
//       AssignedDate: new Date(a.assignedDate).toLocaleDateString(),
//       Status: a.returned ? "Returned" : "Assigned",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Report");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const file = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     saveAs(file, "Asset_Audit_Report.xlsx");
//   };

//   return (
//     <div className="audit-container">
//       <Sidebar />

//       <div className="audit-main">
//         <h2>Asset Audit Dashboard</h2>

//         {/* STATS */}

//         <div className="audit-stats">
//           <div className="audit-card">
//             <h3>Total Assets</h3>
//             <p>{stats.totalAssets || 0}</p>
//           </div>

//           <div className="audit-card">
//             <h3>Assigned</h3>
//             <p>{stats.assignedAssets || 0}</p>
//           </div>

//           <div className="audit-card">
//             <h3>Available</h3>
//             <p>{stats.availableAssets || 0}</p>
//           </div>

//           <div className="audit-card">
//             <h3>Maintenance</h3>
//             <p>{stats.maintenanceAssets || 0}</p>
//           </div>
//         </div>

//         {/* PIE CHART */}

//         <div className="audit-chart">
//           <h3>Asset Distribution</h3>

//           <Pie data={pieData} />
//         </div>

//         {/* CATEGORY CHART */}

//         <div className="usage-chart">
//           <h3>Assets by Category</h3>

//           <Bar data={categoryChart} />
//         </div>

//         {/* MONTHLY GRAPH */}

//         <div className="usage-chart">
//           <h3>Monthly Asset Usage</h3>

//           <Bar data={usageChart} />
//         </div>

//         {/* ALERTS */}

//         {alerts.length > 0 && (
//           <div className="alert-box">
//             <h3>Warranty Expiring Soon</h3>

//             <ul>
//               {alerts.map((asset) => (
//                 <li key={asset._id}>
//                   {asset.assetName} -
//                   {new Date(asset.warrantyExpiry).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* DOWNLOAD */}

//         <button className="download-btn" onClick={downloadReport}>
//           Download Audit Report
//         </button>

//         {/* SEARCH */}

//         <input
//           className="audit-search"
//           placeholder="Search Asset..."
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* TABLE */}

//         <div className="audit-table">
//           <h3>Asset Assignment History</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>Asset</th>
//                 <th>Employee</th>
//                 <th>Email</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredAssignments.map((a) => (
//                 <tr key={a._id}>
//                   <td>{a.asset?.assetName}</td>

//                   <td>{a.employee?.name}</td>

//                   <td>{a.employee?.email}</td>

//                   <td>{new Date(a.assignedDate).toLocaleDateString()}</td>

//                   <td>
//                     <span className={a.returned ? "returned" : "active"}>
//                       {a.returned ? "Returned" : "Assigned"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* TIMELINE */}

//         <div className="timeline">
//           <h3>Recent Asset Activity</h3>

//           {assignments.slice(0, 6).map((a) => {
//             const date = new Date(a.assignedDate);

//             return (
//               <div key={a._id} className="activity-card">
//                 <div className="activity-icon">💻</div>

//                 <div className="activity-info">
//                   <h4>{a.asset?.assetName}</h4>

//                   <p>
//                     {a.returned
//                       ? `Returned by ${a.employee?.name}`
//                       : `Assigned to ${a.employee?.name}`}
//                   </p>

//                   <span>
//                     {date.toLocaleDateString()} • {date.toLocaleTimeString()}
//                   </span>
//                 </div>

//                 <div
//                   className={`status-badge ${a.returned ? "returned" : "assigned"}`}
//                 >
//                   {a.returned ? "Returned" : "Assigned"}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuditLogs;

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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

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

      const res = await axios.get("http://localhost:5000/api/assets/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data);
    } catch {
      console.log("Stats fetch error");
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

      const res = await axios.get("http://localhost:5000/api/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAssignments(res.data);
    } catch {
      console.log("Assignment fetch error");
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
        "http://localhost:5000/api/assets/warranty-alerts",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setAlerts(res.data);
    } catch {
      console.log("Alert fetch error");
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
  PIE CHART DATA
  =====================
  */

  const pieData = {
    labels: ["Available", "Assigned", "Maintenance"],
    datasets: [
      {
        label: "Assets",
        data: [
          stats.availableAssets || 0,
          stats.assignedAssets || 0,
          stats.maintenanceAssets || 0,
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
      },
    ],
  };

  /*
  =====================
  MONTHLY USAGE GRAPH
  =====================
  */

  const monthlyData = new Array(12).fill(0);

  assignments.forEach((a) => {
    const month = new Date(a.assignedDate || a.createdAt).getMonth();
    monthlyData[month]++;
  });

  const usageChart = {
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
        data: monthlyData,
        backgroundColor: "#4f46e5",
      },
    ],
  };

  /*
  =====================
  DOWNLOAD EXCEL REPORT
  =====================
  */

  const downloadReport = () => {
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
  };

  return (
    <div className="audit-container">
      <Sidebar />

      <div className="audit-main">
        <h2>Asset Audit Dashboard</h2>

        {/* ================= STATS ================= */}

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

        {/* ================= PIE CHART ================= */}

        <div className="audit-chart">
          <h3>Asset Distribution</h3>
          <Pie data={pieData} />
        </div>

        {/* ================= MONTHLY USAGE ================= */}

        <div className="usage-chart">
          <h3>Monthly Asset Usage</h3>
          <Bar data={usageChart} />
        </div>

        {/* ================= WARRANTY ALERT ================= */}

        {/* ================= DOWNLOAD REPORT ================= */}

        <button className="download-btn" onClick={downloadReport}>
          Download Audit Report
        </button>

        {/* ================= ASSIGNMENT TABLE ================= */}

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
                    <td>{a.asset ? a.asset.assetName : "Deleted Asset"}</td>
                    <td>{a.employee?.name}</td>
                    <td>{a.employee?.email}</td>
                    <td>
                      {new Date(
                        a.assignedDate || a.createdAt,
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {a.returned ? (
                        <span className="returned">Returned</span>
                      ) : (
                        <span className="active">Assigned</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ================= ACTIVITY TIMELINE ================= */}

        <div className="timeline">
          <h3>Recent Asset Activity</h3>

          {assignments
            .filter((a) => a.asset)
            .slice(0, 6)
            .map((a) => {
              const date = new Date(a.assignedDate);

              return (
                <div key={a._id} className="activity-card">
                  <div className="activity-icon">💻</div>

                  <div className="activity-info">
                    <h4>{a.asset ? a.asset.assetName : "Deleted Asset"}</h4>

                    <p>
                      {a.returned
                        ? `Returned by ${a.employee?.name}`
                        : `Assigned to ${a.employee?.name}`}
                    </p>

                    <span>
                      {date.toLocaleDateString()} • {date.toLocaleTimeString()}
                    </span>
                  </div>

                  <div
                    className={`status-badge ${
                      a.returned ? "returned" : "assigned"
                    }`}
                  >
                    {a.returned ? "Returned" : "Assigned"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;
