// import "./features.css";
// import { FaLaptop, FaUserCheck, FaBell, FaClipboardList, FaChartLine, FaShieldAlt } from "react-icons/fa";

// function Features() {
//   return (
//     <section id="features" className="features">
      
//       <div className="features-header">
//         <span className="section-tag">Platform Features</span>
//         <h2>Everything You Need To Manage Assets</h2>
//         <p>
//           Powerful tools designed to streamline asset tracking,
//           employee assignments, and maintenance workflows.
//         </p>
//       </div>

//       <div className="feature-grid">

//         <div className="feature-card">
//           <FaLaptop className="feature-icon" />
//           <h3>Asset Tracking</h3>
//           <p>Track all office equipment in real time with complete lifecycle history.</p>
//         </div>

//         <div className="feature-card">
//           <FaUserCheck className="feature-icon" />
//           <h3>Employee Assignment</h3>
//           <p>Assign and reassign assets with transparent return tracking.</p>
//         </div>

//         <div className="feature-card">
//           <FaBell className="feature-icon" />
//           <h3>Maintenance Alerts</h3>
//           <p>Automatic warranty expiry and service reminders.</p>
//         </div>

//         <div className="feature-card">
//           <FaClipboardList className="feature-icon" />
//           <h3>Audit Logs</h3>
//           <p>Complete audit trail for compliance and accountability.</p>
//         </div>

//         <div className="feature-card">
//           <FaChartLine className="feature-icon" />
//           <h3>Analytics Dashboard</h3>
//           <p>Gain insights with visual reports and performance tracking.</p>
//         </div>

//         <div className="feature-card">
//           <FaShieldAlt className="feature-icon" />
//           <h3>Secure Access</h3>
//           <p>Role-based authentication for secure data management.</p>
//         </div>

//       </div>

//     </section>
//   );
// }

// export default Features;








import "./features.css";
import {
  FaLaptop,
  FaUserCheck,
  FaBell,
  FaClipboardList,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

function Features() {
  return (
    <section id="features" className="features">

      <div className="features-container">

        <div className="features-header">
          <span className="section-badge">Platform Features</span>
          <h2>Everything You Need To Manage Assets</h2>
          <p>
            Powerful tools designed to streamline asset tracking,
            employee assignments, maintenance workflows,
            and compliance reporting.
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <FaLaptop className="feature-icon" />
            <h3>Asset Tracking</h3>
            <p>Track all office equipment with complete lifecycle history.</p>
          </div>

          <div className="feature-card">
            <FaUserCheck className="feature-icon" />
            <h3>Employee Assignment</h3>
            <p>Assign and reassign assets with transparent tracking.</p>
          </div>

          <div className="feature-card">
            <FaBell className="feature-icon" />
            <h3>Maintenance Alerts</h3>
            <p>Automatic warranty expiry and service reminders.</p>
          </div>

          <div className="feature-card">
            <FaClipboardList className="feature-icon" />
            <h3>Audit Logs</h3>
            <p>Maintain full audit trail for compliance and security.</p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Analytics Dashboard</h3>
            <p>Gain insights with visual reports and real-time stats.</p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Secure Access</h3>
            <p>Role-based authentication with enterprise security.</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;
