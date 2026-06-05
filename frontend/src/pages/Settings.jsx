import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  FaBell,
  FaClock,
  FaKey,
  FaLanguage,
  FaMoon,
  FaSignOutAlt,
  FaTrash,
  FaUserEdit,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./Settings.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

function Settings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, isDarkMode, toggleTheme, setTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [savingPreference, setSavingPreference] = useState(false);
  const [preferences, setPreferences] = useState({
    language: localStorage.getItem("language") || "en",
    emailNotifications: true,
    systemNotifications: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res.data.user;
        setUser(profile);
        setPreferences({
          language: profile.language || localStorage.getItem("language") || "en",
          emailNotifications: profile.emailNotifications ?? true,
          systemNotifications: profile.systemNotifications ?? true,
        });

        if (profile.theme === "light" || profile.theme === "dark") {
          setTheme(profile.theme);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load settings");
      }
    };

    fetchProfile();
  }, [navigate, setTheme]);

  const persistPreferences = async (nextPreferences, nextTheme = theme) => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      toast.error(t("toast.loginAgain"));
      return;
    }

    try {
      setSavingPreference(true);

      const payload = {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        employeeId: user.employeeId || "",
        department: user.department || "",
        designation: user.designation || "",
        address: user.address || "",
        bio: user.bio || "",
        language: nextPreferences.language,
        theme: nextTheme,
        emailNotifications: nextPreferences.emailNotifications,
        systemNotifications: nextPreferences.systemNotifications,
      };

      const res = await axios.put(`${API_URL}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
      toast.success("Settings saved");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    } finally {
      setSavingPreference(false);
    }
  };

  const handleThemeChange = async () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    toggleTheme();
    await persistPreferences(preferences, nextTheme);
  };

  const handleLanguageChange = async (event) => {
    const language = event.target.value;
    const nextPreferences = { ...preferences, language };

    setPreferences(nextPreferences);
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
    await persistPreferences(nextPreferences);
  };

  const handleNotificationChange = async (name) => {
    const nextPreferences = {
      ...preferences,
      [name]: !preferences[name],
    };

    setPreferences(nextPreferences);
    await persistPreferences(nextPreferences);
  };

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Delete this account permanently? This action cannot be undone."
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${API_URL}/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.clear();
      toast.success("Account deleted successfully");
      navigate("/register", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  const lastLoginText = user?.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleString()
    : "No recent login activity found";

  return (
    <div className="settings-page">
      <div className="settings-shell">
        <section className="settings-hero">
          <div>
            <p className="settings-kicker">AssetTrack</p>
            <h1>{t("settings.title")}</h1>
            <p>{t("settings.subtitle")}</p>
          </div>
          <div className="settings-user-chip">
            <strong>{user?.name || localStorage.getItem("userName") || "User"}</strong>
            <span>{user?.email || localStorage.getItem("email")}</span>
          </div>
        </section>

        <div className="settings-grid">
          <section className="settings-panel">
            <h2>{t("settings.profile")}</h2>
            <div className="settings-row">
              <div className="settings-row-main">
                <FaUserEdit />
                <div>
                  <h3>{t("nav.editProfile")}</h3>
                  <p>{t("settings.editProfileDesc")}</p>
                </div>
              </div>
              <button onClick={() => navigate("/edit-profile")}>{t("nav.editProfile")}</button>
            </div>
          </section>

          <section className="settings-panel">
            <h2>{t("settings.security")}</h2>
            <div className="settings-row">
              <div className="settings-row-main">
                <FaKey />
                <div>
                  <h3>{t("nav.changePassword")}</h3>
                  <p>{t("settings.changePasswordDesc")}</p>
                </div>
              </div>
              <button onClick={() => navigate("/change-password")}>{t("password.update")}</button>
            </div>

            <div className="settings-row">
              <div className="settings-row-main">
                <FaClock />
                <div>
                  <h3>{t("settings.loginActivity")}</h3>
                  <p>{lastLoginText}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="settings-panel">
            <h2>{t("settings.appearance")}</h2>
            <div className="settings-row">
              <div className="settings-row-main">
                <FaMoon />
                <div>
                  <h3>{isDarkMode ? t("nav.lightMode") : t("nav.darkMode")}</h3>
                  <p>{t("settings.darkModeDesc")}</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={handleThemeChange}
                  disabled={savingPreference || !user}
                />
                <span />
              </label>
            </div>
          </section>

          <section className="settings-panel">
            <h2>{t("settings.preferences")}</h2>
            <div className="settings-row">
              <div className="settings-row-main">
                <FaLanguage />
                <div>
                  <h3>{t("settings.preferences")}</h3>
                  <p>{t("settings.languageDesc")}</p>
                </div>
              </div>
              <select
                value={preferences.language}
                onChange={handleLanguageChange}
                disabled={savingPreference || !user}
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </section>

          <section className="settings-panel">
            <h2>{t("settings.notifications")}</h2>
            <div className="settings-row">
              <div className="settings-row-main">
                <FaBell />
                <div>
                  <h3>{t("settings.emailNotifications")}</h3>
                  <p>Receive important account updates by email.</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={() => handleNotificationChange("emailNotifications")}
                  disabled={savingPreference || !user}
                />
                <span />
              </label>
            </div>

            <div className="settings-row">
              <div className="settings-row-main">
                <FaBell />
                <div>
                  <h3>{t("settings.systemNotifications")}</h3>
                  <p>Show in-app reminders, alerts, and workflow notifications.</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferences.systemNotifications}
                  onChange={() => handleNotificationChange("systemNotifications")}
                  disabled={savingPreference || !user}
                />
                <span />
              </label>
            </div>
          </section>

          <section className="settings-panel account-panel">
            <h2>{t("settings.account")}</h2>
            <div className="settings-row">
              <div className="settings-row-main">
                <FaSignOutAlt />
                <div>
                  <h3>{t("common.logout")}</h3>
                  <p>{t("settings.logoutDesc")}</p>
                </div>
              </div>
              <button onClick={logout}>{t("common.logout")}</button>
            </div>

            <div className="settings-row danger-row">
              <div className="settings-row-main">
                <FaTrash />
                <div>
                  <h3>{t("common.delete")}</h3>
                  <p>{t("settings.deleteDesc")}</p>
                </div>
              </div>
              <button className="danger-btn" onClick={deleteAccount}>{t("common.delete")}</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;
