// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// /* Pages */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import AddAsset from "./pages/AddAsset";
// import Assets from "./pages/Assets";
// import AssignAsset from "./pages/AssignAsset";
// import RaiseComplaint from "./pages/RaiseComplaint";
// import Maintenance from "./pages/Maintenance";
// import Assignments from "./pages/Assignments";
// /* Components */
// import ProtectedRoute from "./components/ProtectedRoute";

// /* Global Styles */
// import "./App.css";
// import AuditLogs from "./pages/AuditLogs";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ================= PUBLIC ROUTES ================= */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ================= PROTECTED ROUTES ================= */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/assets"
//           element={
//             <ProtectedRoute>
//               <Assets />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/add-asset"
//           element={
//             <ProtectedRoute>
//               <AddAsset />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/assign-asset"
//           element={
//             <ProtectedRoute>
//               <AssignAsset />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/raise-complaint"
//           element={
//             <ProtectedRoute>
//               <RaiseComplaint />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/maintenance"
//           element={
//             <ProtectedRoute>
//               <Maintenance />
//             </ProtectedRoute>
//           }
//         />
//           {/* AUDIT PAGE */}

//         <Route
//           path="/audit"
//           element={
//             <ProtectedRoute>
//               <AuditLogs />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/assignments"
//           element={
//             <ProtectedRoute>
//               <Assignments />
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= 404 PAGE ================= */}
//         <Route
//           path="*"
//           element={
//             <div style={{ padding: "50px", textAlign: "center" }}>
//               <h1>404 - Page Not Found</h1>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ================= PAGES ================= */

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AddAsset from "./pages/AddAsset";
import Assets from "./pages/Assets";

import AssignAsset from "./pages/AssignAsset";
import Assignments from "./pages/Assignments";

import RaiseComplaint from "./pages/RaiseComplaint";
// import Maintenance from "./pages/Maintenance";

import AuditLogs from "./pages/AuditLogs";
import WarrantyAlerts from "./pages/WarrantyAlerts";

/* ================= COMPONENTS ================= */

import ProtectedRoute from "./components/ProtectedRoute";

/* ================= STYLES ================= */

import "./App.css";
import Notifications from "./pages/Notifications";
import ComplaintStatus from "./pages/ComplaintStatus";
import AdminComplaints from "./pages/AdminComplaints";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ASSET MANAGEMENT ================= */}

        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-asset"
          element={
            <ProtectedRoute>
              <AddAsset />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-asset"
          element={
            <ProtectedRoute>
              <AssignAsset />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />

        {/* ================= EMPLOYEE MODULE ================= */}

        <Route
          path="/raise-complaint"
          element={
            <ProtectedRoute>
              <RaiseComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint-status"
          element={
            <ProtectedRoute>
              <ComplaintStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-complaints"
          element={
            <ProtectedRoute>
              <AdminComplaints />
            </ProtectedRoute>
          }
        />
        {/* ================= AUDIT MODULE ================= */}

        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        {/* ================= WARRANTY ALERTS ================= */}

        <Route
          path="/warranty-alerts"
          element={
            <ProtectedRoute>
              <WarrantyAlerts />
            </ProtectedRoute>
          }
        />
        <Route path="/notifications" element={<Notifications />} />

        {/* ================= 404 PAGE ================= */}

        <Route
          path="*"
          element={
            <div style={{ padding: "50px", textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
