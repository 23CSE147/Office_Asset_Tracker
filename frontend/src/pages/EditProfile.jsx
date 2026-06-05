import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaEnvelope, FaIdBadge, FaPhone, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./EditProfile.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users/profile`;
const UPLOAD_URL = `${import.meta.env.VITE_API_URL}/uploads`;

function EditProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    localStorage.getItem("profileImage") || "https://i.pravatar.cc/150"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    designation: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(t("toast.loginAgain"));
        navigate("/login");
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          employeeId: user.employeeId || "",
          department: user.department || "",
          designation: user.designation || "",
          address: user.address || "",
          bio: user.bio || "",
        });

        if (user.profileImage) {
          setPreviewImage(`${UPLOAD_URL}/${user.profileImage}`);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, t]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile image must be less than 2MB");
      return;
    }

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.warning(t("toast.required"));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.warning(t("toast.validEmail"));
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
      navigate("/login");
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (imageFile) {
      payload.append("profileImage", imageFile);
    }

    try {
      setSaving(true);

      const res = await axios.put(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const user = res.data.user;

      localStorage.setItem("userName", user.name);
      localStorage.setItem("email", user.email);

      if (user.profileImage) {
        const imageUrl = `${UPLOAD_URL}/${user.profileImage}`;
        localStorage.setItem("profileImage", imageUrl);
        setPreviewImage(imageUrl);
      }

      toast.success(res.data.message || "Profile updated successfully");
      setImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-title">
          <h2>{t("profile.title")}</h2>
          <p>{t("profile.subtitle")}</p>
        </div>

        <div className="profile-image-section">
          <img src={previewImage} alt="Profile preview" className="profile-image" />

          <label className="upload-btn" title={t("profile.upload")}>
            <FaCamera />
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>
        </div>

        <div className="profile-form">
          <label>
            <span><FaUser /> {t("profile.fullName")}</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("profile.fullName")}
              disabled={loading}
            />
          </label>

          <label>
            <span><FaEnvelope /> {t("profile.email")}</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("profile.email")}
              disabled={loading}
            />
          </label>

          <label>
            <span><FaPhone /> {t("profile.phone")}</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("profile.phone")}
              disabled={loading}
            />
          </label>

          <label>
            <span><FaIdBadge /> {t("profile.employeeId")}</span>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder={t("profile.employeeId")}
              disabled={loading}
            />
          </label>

          <label>
            <span>{t("profile.department")}</span>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder={t("profile.department")}
              disabled={loading}
            />
          </label>

          <label>
            <span>{t("profile.designation")}</span>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder={t("profile.designation")}
              disabled={loading}
            />
          </label>

          <label className="span-2">
            <span>{t("profile.address")}</span>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t("profile.address")}
              disabled={loading}
            />
          </label>

          <label className="span-2">
            <span>{t("profile.bio")}</span>
            <textarea
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder={t("profile.bio")}
              disabled={loading}
            />
          </label>
        </div>

        <div className="profile-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate("/settings")} disabled={saving}>
            {t("common.cancel")}
          </button>

          <button type="submit" className="save-btn" disabled={saving || loading}>
            {saving ? "Saving..." : t("common.save")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
