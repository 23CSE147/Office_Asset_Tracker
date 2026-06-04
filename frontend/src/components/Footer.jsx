import "./footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 - Brand */}
        <div className="footer-col">
          <h3 className="footer-logo">AssetTrack</h3>
          <p>
            Smart office asset management platform designed to
            streamline tracking, assignments, and maintenance
            workflows for modern organizations.
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaGithub />
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li>Documentation</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: support@assettrack.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Coimbatore, Tamil Nadu</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} AssetTrack. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
