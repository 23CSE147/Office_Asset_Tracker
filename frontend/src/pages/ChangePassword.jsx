import './ChangePassword.css';

function ChangePassword() {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Change Password</h2>

        <input type="password" placeholder="Current Password" />

        <input type="password" placeholder="New Password" />

        <input type="password" placeholder="Confirm Password" />

        <button>Update Password</button>
      </div>
    </div>
  );
}

export default ChangePassword;
