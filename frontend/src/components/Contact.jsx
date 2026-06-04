import "./contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact">

      {/* SECTION HEADER */}
      <div className="contact-header">
        <span className="section-badge">Get In Touch</span>
        <h2>Let’s Talk About Your Asset Management Needs</h2>
        <p>
          Have questions or need a custom solution? Our team is here
          to help you streamline and secure your asset operations.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="contact-container">

        {/* LEFT SIDE - CONTACT INFO */}
        <div className="contact-info">

          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email</h4>
              <p>support@assettrack.com</p>
            </div>
          </div>

          <div className="info-card">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Location</h4>
              <p>Coimbatore, Tamil Nadu</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>

      </div>

    </section>
  );
}

export default Contact;
