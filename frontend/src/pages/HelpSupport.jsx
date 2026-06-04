import "./HelpSupport.css";

function HelpSupport() {

  return (

    <div className="help-page">

      <div className="help-card">

        <h2>Help & Support</h2>

        {/* FAQ 1 */}

        <div className="help-item">

          <h3>
            How to add new asset?
          </h3>

          <p>

            Go to dashboard → Add Asset page
            and fill the asset details form.

          </p>

        </div>

        {/* FAQ 2 */}

        <div className="help-item">

          <h3>
            How to raise complaint?
          </h3>

          <p>

            Open Raise Complaint page,
            select asset and submit issue details.

          </p>

        </div>

        {/* FAQ 3 */}

        <div className="help-item">

          <h3>
            How to return asset?
          </h3>

          <p>

            Open My Assets page and click
            Return button for assigned asset.

          </p>

        </div>

        {/* FAQ 4 */}

        <div className="help-item">

          <h3>
            Forgot password?
          </h3>

          <p>

            Use Change Password page or
            contact administrator support.

          </p>

        </div>

        {/* CONTACT */}

        <div className="help-item">

          <h3>
            Contact Support
          </h3>

          <p>

            📧 support@assettrack.com

            <br />

            📞 +91 9876543210

          </p>

        </div>

      </div>

    </div>

  );

}

export default HelpSupport;