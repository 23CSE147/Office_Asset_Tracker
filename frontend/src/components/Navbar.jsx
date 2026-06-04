// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import Swal from "sweetalert2";
// import "./navbar.css";

// function Navbar() {
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const userName = localStorage.getItem("userName");

//   const [showMenu, setShowMenu] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const dropdownRef = useRef();

//   /*
//   =====================
//   SCROLL EFFECT
//   =====================
//   */
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   /*
//   =====================
//   CLICK OUTSIDE CLOSE
//   =====================
//   */
//   useEffect(() => {
//     const closeMenu = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", closeMenu);

//     return () => document.removeEventListener("mousedown", closeMenu);
//   }, []);

//   /*
//   =====================
//   SCROLL SECTION
//   =====================
//   */
//   const scrollTo = (id) => {
//     const section = document.getElementById(id);

//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   /*
//   =====================
//   PROFESSIONAL LOGOUT
//   =====================
//   */
//   const logout = () => {
//     // remove authentication data
//     localStorage.clear();
//     // toast notification
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "success",
//       title: "Logged out successfully",
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true,
//     });

//     // redirect to login
//     setTimeout(() => {
//       navigate("/login", { replace: true });
//     }, 1000);
//   };

//   return (
//     <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
//       <div className="navbar-container">
//         {/* LEFT */}
//         <div className="navbar-left">
//           <h2 className="logo" onClick={() => scrollTo("hero")}>
//             AssetTrack
//           </h2>

//           <ul className="nav-links">
//             <li onClick={() => scrollTo("hero")}>Home</li>
//             <li onClick={() => scrollTo("features")}>Features</li>
//             <li onClick={() => scrollTo("about")}>About</li>
//             <li onClick={() => scrollTo("contact")}>Contact</li>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="navbar-right">
//           {token ? (
//             <div className="profile-area" ref={dropdownRef}>
//               {/* AVATAR */}

//               <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
//                 {userName?.charAt(0).toUpperCase()}
//               </div>

//               {/* PROFILE DROPDOWN */}

//               {showMenu && (
//                 <div className="profile-dropdown">
//                   {/* =====================================
//               PROFILE HEADER
//           ===================================== */}

//                   <div className="profile-header">
//                     <div className="profile-image-wrapper">
//                       <img
//                         src={
//                           localStorage.getItem("profileImage") ||
//                           "https://i.pravatar.cc/150"
//                         }
//                         alt="profile"
//                         className="profile-image-large"
//                       />

//                       {/* EDIT PHOTO */}

//                       <label className="edit-photo-btn">
//                         ✎
//                         <input type="file" hidden />
//                       </label>
//                     </div>

//                     {/* USER DETAILS */}

//                     <div className="profile-details">
//                       <h3>{userName}</h3>

//                       <p>{localStorage.getItem("role")}</p>

//                       <span className="online-status">● Online</span>
//                     </div>
//                   </div>

//                   {/* =====================================
//               PROFILE MENU
//           ===================================== */}

//                   <div className="profile-menu">
//                     {/* ACCOUNT */}

//                     <button onClick={() => navigate("/dashboard")}>
//                       🏠 Dashboard
//                     </button>

//                     <button>👤 My Profile</button>

//                     <button>✏️ Edit Profile</button>

//                     <button>📸 Change Photo</button>

//                     <button>🔒 Change Password</button>

//                     {/* WORK */}

//                     <button onClick={() => navigate("/assets")}>
//                       💻 My Assets
//                     </button>

//                     <button onClick={() => navigate("/complaint-status")}>
//                       🛠 Complaints
//                     </button>

//                     <button onClick={() => navigate("/notifications")}>
//                       🔔 Notifications
//                     </button>

//                     {/* SETTINGS */}

//                     <button>⚙️ Settings</button>

//                     <button>🌙 Dark Mode</button>

//                     <button>🌐 Language</button>

//                     {/* HELP */}

//                     <button>❓ Help & Support</button>

//                     <button>📄 Privacy Policy</button>

//                     <button>📑 Terms & Conditions</button>

//                     {/* DIVIDER */}

//                     <div className="profile-divider"></div>

//                     {/* LOGOUT */}

//                     <button className="logout-btn-profile" onClick={logout}>
//                       🚪 Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <button
//                 className="nav-login-btn"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>

//               <button
//                 className="nav-start-btn"
//                 onClick={() => navigate("/register")}
//               >
//                 Get Started
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const userName = localStorage.getItem("userName") || "User";

  const userEmail = localStorage.getItem("email") || "user@gmail.com";

  /* =========================
     STATES
  ========================= */

  const [showMenu, setShowMenu] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN",
  );

  const [showProfile, setShowProfile] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [editName, setEditName] = useState(userName);

  const [editEmail, setEditEmail] = useState(userEmail);

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultImage = "https://i.pravatar.cc/150";

  const savedImage = localStorage.getItem("profileImage");

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "https://i.pravatar.cc/150",
  );
  const dropdownRef = useRef();

  /* =========================
     DARK MODE
  ========================= */

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /* =========================
     SCROLL EFFECT
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     CLICK OUTSIDE
  ========================= */

  useEffect(() => {
    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  /* =========================
     SCROLL SECTION
  ========================= */

  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.clear();

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    setTimeout(() => {
      navigate("/login", {
        replace: true,
      });
    }, 1000);
  };

  /* =========================
     DARK MODE TOGGLE
  ========================= */

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  /* =========================
     LANGUAGE
  ========================= */

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "தமிழ்" : "EN";

    setLanguage(newLang);

    localStorage.setItem("language", newLang);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  /* =========================
     PROFILE IMAGE
  ========================= */

  /* =========================
   PROFILE IMAGE
========================= */

const handleImage = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append("image", file);

    const res = await axios.put(

      "http://localhost:5000/api/users/profile-image",

      formData,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "multipart/form-data",

        },
      }
    );

    const imageUrl =
      `http://localhost:5000/uploads/${res.data.profileImage}`;

    setProfileImage(imageUrl);

    localStorage.setItem(
      "profileImage",
      imageUrl
    );

    Swal.fire({

      icon: "success",

      title:
        "Profile photo updated",

      timer: 1500,

      showConfirmButton: false,

    });

  } catch (error) {

    console.log(error);

    Swal.fire({

      icon: "error",

      title: "Upload failed",

    });

  }

};

  /* =========================
     SAVE PROFILE
  ========================= */

  // const saveProfile = () => {
  //   localStorage.setItem("userName", editName);

  //   localStorage.setItem("email", editEmail);

  //   Swal.fire({
  //     icon: "success",
  //     title: "Profile Updated",
  //     timer: 1500,
  //     showConfirmButton: false,
  //   });

  //   setShowProfile(false);
  // };

  /* =========================
     CHANGE PASSWORD
  ========================= */

  const updatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "All fields required",
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Password Changed Successfully",
      timer: 1800,
      showConfirmButton: false,
    });

    setShowPassword(false);

    setCurrentPassword("");

    setNewPassword("");

    setConfirmPassword("");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* LEFT */}

        <div className="navbar-left">
          <h2 className="logo" onClick={() => scrollTo("hero")}>
            AssetTrack
          </h2>

          <ul className="nav-links">
            <li onClick={() => scrollTo("hero")}>Home</li>

            <li onClick={() => scrollTo("features")}>Features</li>

            <li onClick={() => scrollTo("about")}>About</li>

            <li onClick={() => scrollTo("contact")}>Contact</li>
          </ul>
        </div>

        {/* RIGHT */}

        <div className="navbar-right">
          {token ? (
            <div className="profile-area" ref={dropdownRef}>
              {/* AVATAR */}

              <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
                {userName?.charAt(0).toUpperCase()}
              </div>

              {/* DROPDOWN */}

              {/* =========================
   PROFILE DROPDOWN
========================= */}

              {showMenu && (
                <div className="profile-dropdown">
                  {/* =========================
       PROFILE TOP
    ========================= */}

                  <div className="profile-top-section">
                    {/* PROFILE IMAGE */}

                    <div className="profile-image-wrapper">
                      <img
                        src={profileImage}
                        alt="profile"
                        className="profile-image-large"
                      />

                      {/* CHANGE PHOTO */}

                      <label className="edit-photo-btn">
                        ✎
                        <input type="file" hidden onChange={handleImage} />
                      </label>
                    </div>

                    {/* USER DETAILS */}

                    <div className="profile-user-details">
                      <h3>{userName}</h3>

                      <p>{localStorage.getItem("role")}</p>

                      <span className="online-status">● Online</span>
                    </div>
                  </div>

                  {/* =========================
       PROFILE MENU
    ========================= */}

                  <div className="profile-menu">
                    {/* DASHBOARD */}

                    <button onClick={() => navigate("/dashboard")}>
                      <span>🏠</span>
                      Dashboard
                    </button>

                    {/* EDIT PROFILE */}

                    <button onClick={() => navigate("/edit-profile")}>
                      <span>✏️</span>
                      Edit Profile
                    </button>

                    {/* PASSWORD */}

                    <button onClick={() => navigate("/change-password")}>
                      <span>🔒</span>
                      Change Password
                    </button>

                    {/* ASSETS */}

                    <button onClick={() => navigate("/assets")}>
                      <span>💻</span>
                      My Assets
                    </button>

                    {/* COMPLAINTS */}

                    <button onClick={() => navigate("/complaint-status")}>
                      <span>🛠</span>
                      Complaints
                    </button>

                    {/* NOTIFICATIONS */}

                    <button onClick={() => navigate("/notifications")}>
                      <span>🔔</span>
                      Notifications
                    </button>

                    {/* DARK MODE */}

                    <button onClick={toggleDarkMode}>
                      <span>{darkMode ? "☀️" : "🌙"}</span>

                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>

                    {/* LANGUAGE */}

                    <button onClick={toggleLanguage}>
                      <span>🌐</span>

                      {language}
                    </button>

                    {/* FULLSCREEN */}

                    <button onClick={toggleFullscreen}>
                      <span>🖥</span>
                      Fullscreen
                    </button>

                    {/* HELP */}

                    <button onClick={() => navigate("/help-support")}>
                      <span>❓</span>
                      Help & Support
                    </button>

                    {/* DIVIDER */}

                    <div className="profile-divider"></div>

                    {/* LOGOUT */}

                    <button className="logout-btn-profile" onClick={logout}>
                      <span>🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="nav-login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="nav-start-btn"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      {/* =========================
         PROFILE MODAL
      ========================= */}

      {showProfile && (
        <div className="profile-modal" onClick={() => setShowProfile(false)}>
          <div
            className="profile-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Profile</h2>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter Name"
            />

            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Enter Email"
            />

            <button onClick={saveProfile}>Save Changes</button>
          </div>
        </div>
      )}

      {/* =========================
         PASSWORD MODAL
      ========================= */}

      {showPassword && (
        <div className="profile-modal" onClick={() => setShowPassword(false)}>
          <div
            className="profile-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Change Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={updatePassword}>Update Password</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
