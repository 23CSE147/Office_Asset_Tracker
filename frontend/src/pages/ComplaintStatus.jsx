import { useEffect, useState } from "react";
import axios from "axios";
import "./complaintstatus.css";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import { FaSyncAlt } from "react-icons/fa";
function ComplaintStatus() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data || [];

      setComplaints(data);
      setFiltered(data);
    } catch (error) {
      toast.error("Failed to load complaints ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSearch = (value) => {
    const search = value.toLowerCase();

    const result = complaints.filter((c) =>
      c.asset?.assetName?.toLowerCase().includes(search),
    );

    setFiltered(result);
  };

  return (
    <div className="status-container">
      <div className="top-bar">
        <PageHeader title="Complaint Management" />

        <button className="refresh-btn" onClick={fetchComplaints}>
          <FaSyncAlt className="refresh-icon" />

          <span className="refresh-text">Refresh</span>
        </button>
      </div>
      {/* SUMMARY */}
      <div className="summary-cards">
        <div className="card total">
          <h3>{complaints.length}</h3>
          <p>Total</p>
        </div>

        <div className="card pending">
          <h3>{complaints.filter((c) => c.status === "Pending").length}</h3>
          <p>Pending</p>
        </div>

        <div className="card progress">
          <h3>{complaints.filter((c) => c.status === "In Progress").length}</h3>
          <p>In Progress</p>
        </div>

        <div className="card resolved">
          <h3>{complaints.filter((c) => c.status === "Resolved").length}</h3>
          <p>Resolved</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="filters">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search complaints..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="skeleton-container">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-row"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-box">
          <h3>📭 No Complaints</h3>
          <p>You haven't raised any complaints yet.</p>
        </div>
      ) : (
        <div className="table">
          <div className="table-head">
            <span>ID</span>

            <span>ASSET</span>

            <span>STATUS</span>

            <span>DATE</span>

            <span>ACTION</span>
          </div>

          {filtered.map((c) => (
            <div
              key={c._id}
              className="table-row"
              onClick={() => setSelected(c)}
            >
              {/* ID */}
              <span className="complaint-id">#{c._id.slice(-4)}</span>

              {/* ASSET */}
              <span className="asset-name">{c.asset?.assetName || "N/A"}</span>

              {/* STATUS */}
              <span className="status-wrapper">
                <span
                  className={`status-dot ${c.status.toLowerCase().replace(" ", "-")}`}
                ></span>

                <span
                  className={`badge ${c.status.toLowerCase().replace(" ", "-")}`}
                >
                  {c.status}
                </span>
              </span>

              {/* DATE */}
              <span className="date">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>

              {/* ACTION */}
              <div className="action-cell">
                <button
                  className="view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(c);
                  }}
                >
                  👁 View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Complaint Details</h3>

              <button className="close-btnnn" onClick={() => setSelected(null)}>
                ✖
              </button>
            </div>

            <div className="modal-content">
              <div className="detail-row">
                <span>ID</span>
                <p>#{selected._id.slice(-6)}</p>
              </div>

              <div className="detail-row">
                <span>Asset</span>
                <p>{selected.asset?.assetName}</p>
              </div>

              <div className="detail-row">
                <span>Description</span>
                <p>{selected.description}</p>
              </div>

              <div className="detail-row">
                <span>Status</span>
                <p
                  className={`badge ${selected.status.toLowerCase().replace(" ", "-")}`}
                >
                  {selected.status}
                </p>
              </div>

              <div className="detail-row">
                <span>Date</span>
                <p>{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              {selected.image && (
                <div className="detail-row">
                  <span>Proof</span>

                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${selected.image}`}
                    alt="complaint"
                    className="complaint-image"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintStatus;
