import "./Settings.css";

function Settings() {

  return (

    <div className="settings-page">

      <div className="settings-card">

        <h2>Settings</h2>

        {/* DARK MODE */}

        <div className="setting-item">

          <div>

            <h4>Dark Mode</h4>

            <p>
              Enable dark theme for better experience
            </p>

          </div>

          <button>
            Enable
          </button>

        </div>

        {/* LANGUAGE */}

        <div className="setting-item">

          <div>

            <h4>Language</h4>

            <p>
              Change application language
            </p>

          </div>

          <button>
            English
          </button>

        </div>

        {/* NOTIFICATIONS */}

        <div className="setting-item">

          <div>

            <h4>Notifications</h4>

            <p>
              Manage notification preferences
            </p>

          </div>

          <button>
            Manage
          </button>

        </div>

        {/* SECURITY */}

        <div className="setting-item">

          <div>

            <h4>Security</h4>

            <p>
              Update privacy and security settings
            </p>

          </div>

          <button>
            Open
          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;