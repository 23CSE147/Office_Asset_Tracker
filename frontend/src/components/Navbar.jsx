import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  FaBell,
  FaCog,
  FaDesktop,
  FaEdit,
  FaKey,
  FaLaptop,
  FaMoon,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "https://i.pravatar.cc/150"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/dashboard");
    }
  };

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "ta" : language === "ta" ? "hi" : "en";
    setLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
    i18n.changeLanguage(nextLanguage);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      return;
    }

    document.exitFullscreen();
  };

  const handleImage = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${res.data.profileImage}`;
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
      toast.success("Profile photo updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  const menuItems = [
    { label: t("nav.dashboard"), icon: <FaDesktop />, action: () => navigate("/dashboard") },
    { label: t("nav.editProfile"), icon: <FaEdit />, action: () => navigate("/edit-profile") },
    { label: t("nav.changePassword"), icon: <FaKey />, action: () => navigate("/change-password") },
    { label: t("nav.assets"), icon: <FaLaptop />, action: () => navigate("/assets") },
    { label: t("nav.complaints"), icon: <FaTools />, action: () => navigate("/complaint-status") },
    { label: t("nav.notifications"), icon: <FaBell />, action: () => navigate("/notifications") },
    {
      label: isDarkMode ? t("nav.lightMode") : t("nav.darkMode"),
      icon: <FaMoon />,
      action: toggleTheme,
    },
    { label: language.toUpperCase(), icon: <FaCog />, action: toggleLanguage },
    { label: "Fullscreen", icon: <FaDesktop />, action: toggleFullscreen },
    { label: t("nav.settings"), icon: <FaCog />, action: () => navigate("/settings") },
    { label: t("nav.help"), icon: <FaQuestionCircle />, action: () => navigate("/help-support") },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <h2 className="logo" onClick={() => scrollTo("hero")}>
            AssetTrack
          </h2>

          <ul className="nav-links">
            <li onClick={() => scrollTo("hero")}>{t("nav.home")}</li>
            <li onClick={() => scrollTo("features")}>{t("nav.features")}</li>
            <li onClick={() => scrollTo("about")}>{t("nav.about")}</li>
            <li onClick={() => scrollTo("contact")}>{t("nav.contact")}</li>
          </ul>
        </div>

        <div className="navbar-right">
          {token ? (
            <div className="profile-area" ref={dropdownRef}>
              <button className="avatar" type="button" onClick={() => setShowMenu(!showMenu)}>
                {userName.charAt(0).toUpperCase()}
              </button>

              {showMenu && (
                <div className="profile-dropdown">
                  <div className="profile-top-section">
                    <div className="profile-image-wrapper">
                      <img src={profileImage} alt="profile" className="profile-image-large" />
                      <label className="edit-photo-btn">
                        <FaEdit />
                        <input type="file" accept="image/*" hidden onChange={handleImage} />
                      </label>
                    </div>

                    <div className="profile-user-details">
                      <h3>{userName}</h3>
                      <p>{localStorage.getItem("role")}</p>
                      <span className="online-status">Online</span>
                    </div>
                  </div>

                  <div className="profile-menu">
                    {menuItems.map((item) => (
                      <button type="button" key={item.label} onClick={item.action}>
                        <span>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}

                    <div className="profile-divider" />

                    <button className="logout-btn-profile" type="button" onClick={logout}>
                      <span><FaSignOutAlt /></span>
                      {t("common.logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="nav-login-btn" onClick={() => navigate("/login")}>
                Login
              </button>

              <button className="nav-start-btn" onClick={() => navigate("/register")}>
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
