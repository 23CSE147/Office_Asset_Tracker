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
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import HelpSupport from "./pages/HelpSupport";
import AuditLogs from "./pages/AuditLogs";
import WarrantyAlerts from "./pages/WarrantyAlerts";

/* ================= COMPONENTS ================= */

import ProtectedRoute from "./components/ProtectedRoute";

/* ================= STYLES ================= */

import "./App.css";
import Notifications from "./pages/Notifications";
import ComplaintStatus from "./pages/ComplaintStatus";
import AdminComplaints from "./pages/AdminComplaints";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
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
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/help-support" element={<HelpSupport />} />
      </Routes>
    </Router>
  );
}

export default App;
