import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./ChangePassword.css";

function ChangePassword() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (!password) return "";
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const validateForm = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.warning(t("toast.required"));
      return false;
    }

    if (formData.newPassword.length < 8) {
      toast.warning(t("toast.passwordLength"));
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.warning(t("toast.passwordMismatch"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error(t("toast.loginAgain"));
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password updated successfully");
      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-page">

      <form className="password-card" onSubmit={handleSubmit}>

        <div className="password-header">
          <FaLock className="lock-icon" />
          <h2>{t("password.title")}</h2>
          <p>{t("password.subtitle")}</p>
        </div>

        {/* CURRENT PASSWORD */}

        <div className="input-group">
          <input
            name="currentPassword"
            type={showCurrent ? "text" : "password"}
            placeholder={t("password.current")}
            value={formData.currentPassword}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowCurrent(!showCurrent)}
            aria-label={showCurrent ? "Hide current password" : "Show current password"}
          >
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* NEW PASSWORD */}

        <div className="input-group">
          <input
            name="newPassword"
            type={showNew ? "text" : "password"}
            placeholder={t("password.new")}
            value={formData.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowNew(!showNew)}
            aria-label={showNew ? "Hide new password" : "Show new password"}
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {passwordStrength && (
          <div className={`strength-meter strength-${passwordStrength}`}>
            <div className="strength-track">
              <span />
            </div>
            <p>
              {t("password.strength")}: {t(`password.${passwordStrength}`)}
            </p>
          </div>
        )}

        {/* CONFIRM PASSWORD */}

        <div className="input-group">
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder={t("password.confirm")}
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* PASSWORD RULES */}

        <div className="password-rules">
          <h4>{t("password.requirements")}</h4>
          <ul>
            <li>{t("password.min")}</li>
            <li>{t("password.upper")}</li>
            <li>{t("password.lower")}</li>
            <li>{t("password.number")}</li>
            <li>{t("password.special")}</li>
          </ul>
        </div>

        {/* BUTTONS */}

        <div className="password-actions">
          <button
            type="submit"
            className="update-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : t("password.update")}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
            disabled={loading}
          >
            {t("common.cancel")}
          </button>
        </div>

      </form>

    </div>
  );
}

export default ChangePassword;
