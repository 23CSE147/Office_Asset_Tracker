import { useEffect, useState } from "react";
import axios from "axios";
import "./adminComplaints.css";

// ✅ toast only
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH
  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComplaints(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      console.log(err);

      // ❌ ERROR TOAST
      toast.error("Failed to load complaints ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // ✅ SUCCESS TOAST
      toast.success("Status updated successfully ✅");

      fetchComplaints();
    } catch (err) {
      console.log(err);

      // ❌ ERROR TOAST
      toast.error("Failed to update status ❌");
    }
  };

  // FILTER
  const handleFilter = (status) => {
    if (status === "All") {
      setFiltered(complaints);
    } else {
      setFiltered(complaints.filter((c) => c.status === status));
    }
  };

  return (
    <div className="admin-container">
      {/* HEADER */}
      {/* ================= HEADER ================= */}

      <div className="page-header-section-admin">
        <PageHeader title="Complaint Management" />

        <button className="refresh-btn-admin" onClick={fetchComplaints}>
          Refresh
        </button>
      </div>

      {/* SUMMARY */}
      <div className="admin-cards">
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

      {/* FILTER */}
      <div className="admin-filter">
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="admin-table">
          <div className="table-head">
            <span>User</span>
            <span>Asset</span>
            <span>Description</span>
            <span>Status</span>
          </div>

          {filtered.map((c) => (
            <div key={c._id} className="table-row">
              <span>{c.user?.name || "User"}</span>

              <span>{c.asset?.assetName}</span>

              <span className="desc">{c.description}</span>

              <select
                value={c.status}
                onChange={(e) => updateStatus(c._id, e.target.value)}
                className={`status-select ${c.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminComplaints;
