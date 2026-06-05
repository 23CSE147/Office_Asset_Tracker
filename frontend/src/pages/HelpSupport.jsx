import "./HelpSupport.css";

import {
  FaQuestionCircle,
  FaLaptop,
  FaTools,
  FaUndo,
  FaLock,
  FaEnvelope,
  FaPhoneAlt,
  FaHeadset,
} from "react-icons/fa";

function HelpSupport() {
  return (
    <div className="help-page">

      <div className="help-card">

        <div className="help-header">
          <FaHeadset className="help-main-icon" />
          <h2>Help & Support Center</h2>
          <p>
            Find answers to common questions and get support quickly.
          </p>
        </div>

        <div className="help-item">
          <h3>
            <FaLaptop /> How to add a new asset?
          </h3>
          <p>
            Navigate to Dashboard → Add Asset and fill in all required asset details.
          </p>
        </div>

        <div className="help-item">
          <h3>
            <FaTools /> How to raise a complaint?
          </h3>
          <p>
            Open Raise Complaint, select an asset, describe the issue and submit.
          </p>
        </div>

        <div className="help-item">
          <h3>
            <FaUndo /> How to return an asset?
          </h3>
          <p>
            Go to My Assets and click the Return button for the assigned asset.
          </p>
        </div>

        <div className="help-item">
          <h3>
            <FaLock /> Forgot password?
          </h3>
          <p>
            Use the Change Password option or contact your administrator.
          </p>
        </div>

        <div className="help-item">
          <h3>
            <FaQuestionCircle /> Complaint status not updating?
          </h3>
          <p>
            Refresh the Complaint Status page or contact support for assistance.
          </p>
        </div>

        <div className="support-box">
          <h3>Contact Support</h3>

          <div className="support-info">
            <p><FaEnvelope /> support@assettrack.com</p>
            <p><FaPhoneAlt /> +91 98765 43210</p>
          </div>

          <button className="support-btn">
            Contact Support
          </button>
        </div>

      </div>

    </div>
  );
}

export default HelpSupport;