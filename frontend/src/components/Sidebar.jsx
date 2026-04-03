// import { useNavigate } from "react-router-dom";

// import {
//   FaLaptop,
//   FaClipboardList,
//   FaUserCheck,
//   FaTools,
//   FaTachometerAlt,
//   FaPlusSquare,
//   FaTasks
// } from "react-icons/fa";

// import "./sidebar.css";

// function Sidebar() {
//   const navigate = useNavigate();

//   const role = localStorage.getItem("role");

//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-logo" onClick={() => navigate("/dashboard")}>
//         AssetTrack
//       </h2>

//       <ul>
//         {/* DASHBOARD */}
//         <li onClick={() => navigate("/dashboard")}>
//           <FaTachometerAlt />
//           Dashboard
//         </li>

//         {/* ASSETS */}
//         <li onClick={() => navigate("/assets")}>
//           <FaLaptop />
//           Assets
//         </li>

//         {/* ADMIN OPTIONS */}
//         {role === "admin" && (
//           <>
//             <li onClick={() => navigate("/add-asset")}>
//               <FaPlusSquare />
//               Add Asset
//             </li>

//             <li onClick={() => navigate("/assign-asset")}>
//               <FaUserCheck />
//               Assign Asset
//             </li>

//             <li onClick={() => navigate("/assignments")}>
//               <FaClipboardList />
//               Assigned Assets
//             </li>
//           </>
//         )}

//         {/* COMMON ASSIGNMENTS */}
//         <li onClick={() => navigate("/assignments")}>
//           <FaClipboardList />
//           Assignments
//         </li>

//         {/* EMPLOYEE OPTIONS */}
//         {role === "employee" && (
//           <>
//             <li onClick={() => navigate("/raise-complaint")}>
//               <FaTools />
//               Raise Complaint
//             </li>

//             <li onClick={() => navigate("/maintenance")}>
//               <FaTasks />
//               Complaint Status
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import { useNavigate } from "react-router-dom";

import {
  FaLaptop,
  FaClipboardList,
  FaUserCheck,
  FaTools,
  FaChartPie,
  FaHome,
  FaBell,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo" onClick={() => navigate("/dashboard")}>
        AssetTrack
      </h2>

      <ul>
        <li onClick={() => navigate("/dashboard")}>
          <FaHome />
          Dashboard
        </li>

        <li onClick={() => navigate("/assets")}>
          <FaLaptop />
          Assets
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
              Complaint
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

            <li onClick={() => navigate("/maintenance")}>
              <FaClipboardList />
              Complaint Status
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
