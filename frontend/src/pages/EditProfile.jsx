import './EditProfile.css';
function EditProfile() {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Edit Profile</h2>

        <input placeholder="Name" />

        <input placeholder="Email" />

        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default EditProfile;
