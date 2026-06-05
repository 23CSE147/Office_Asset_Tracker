import { useEffect, useState } from "react";
import axios from "axios";
import "./raisecomplaint.css";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";

function RaiseComplaint() {
  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium"); // 🔥 NEW
  const [image, setImage] = useState(null); // 🔥 NEW
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchAssets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/assets/my-assets`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setAssets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("Failed to load assets ❌");
      }
    };

    fetchAssets();
  }, [token]);

  const selectedAsset = assets.find((a) => a._id === assetId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assetId || !description || !image) {
      toast.warning("All fields including proof image are required ⚠️");
      return;
    }

    if (description.length < 10) {
      toast.warning("Description must be at least 10 characters");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("assetId", assetId);
      formData.append("description", description);
      formData.append("priority", priority);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/complaints`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Complaint submitted successfully ✅");

      setAssetId("");
      setDescription("");
      setPriority("Medium");
      setImage(null);
    } catch (err) {
      toast.error("Failed to submit complaint ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-wrapper">
      <div className="complaint-header">
        <PageHeader title="Raise Complaint" />
      </div>
      <form className="complaint-card" onSubmit={handleSubmit}>
        {/* ASSET */}
        <label>Select Asset</label>
        <select value={assetId} onChange={(e) => setAssetId(e.target.value)}>
          <option value="">Choose Asset</option>
          {assets.map((a) => (
            <option key={a._id} value={a._id}>
              {a.assetName}
            </option>
          ))}
        </select>

        {/* ASSET INFO */}
        {selectedAsset && (
          <div className="asset-info">
            <p>
              <b>Name:</b> {selectedAsset.assetName}
            </p>
            <p>
              <b>Category:</b> {selectedAsset.category || "N/A"}
            </p>
            <p>
              <b>Status:</b> {selectedAsset.status || "Active"}
            </p>
          </div>
        )}

        {/* PRIORITY */}
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* DESCRIPTION */}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue clearly..."
          maxLength={200}
        />

        <div className="char-count">{description.length}/200 characters</div>

        {/* IMAGE */}
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* BUTTON */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}

export default RaiseComplaint;
