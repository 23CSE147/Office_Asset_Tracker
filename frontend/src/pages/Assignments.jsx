import { useEffect, useState } from "react";
import axios from "axios";
import "./assignments.css";

// ✅ TOAST
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
function Assignments() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const role = localStorage.getItem("role");

  /*
  ======================
  FETCH ASSIGNMENTS
  ======================
  */

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Loading failed ❌");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  /*
  ======================
  SEARCH FILTER
  ======================
  */

  useEffect(() => {
    let temp = [...data];

    if (search) {
      temp = temp.filter((a) =>
        a.asset?.assetName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFiltered(temp);
  }, [search, data]);

  /*
  ======================
  RETURN ASSET
  ======================
  */

  const returnAsset = async (id) => {
    if (!window.confirm("Return Asset?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/assignments/return/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Returned successfully ✅");

      fetchAssignments();
    } catch {
      toast.error("Return failed ❌");
    }
  };

  return (
    <div className="assignments-wrapper">
      <div className="page-header-wrapper-assignments">
        <PageHeader title="Assigned Assets" />
      </div>

      <div className="top-bar">
      

        <input
          className="search"
          placeholder="Search Asset..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}

      <div className="card-grid">
        {filtered.map((assign) => (
          <div
            key={assign._id}
            className="assign-card"
            onClick={() => setSelected(assign)}
          >
            {/* IMAGE */}

            <div className="asset-image-box">
              {assign.asset?.image ? (
                <img
                  alt="asset"
                  className="asset-image"
                  src={`http://localhost:5000/uploads/${assign.asset.image}`}
                />
              ) : (
                <div className="no-image">NO IMAGE</div>
              )}
            </div>

            {/* CONTENT */}

            <div className="card-content">
              <h3>{assign.asset?.assetName}</h3>

              <p>
                <strong>Category:</strong> {assign.asset?.category}
              </p>

              <p
                className={
                  assign.returned ? "status returned" : "status assigned"
                }
              >
                {assign.returned ? "Returned" : "Assigned"}
              </p>

              {/* EMPLOYEE */}

              <div className="employee">
                <div className="avatar">{assign.employee?.name?.charAt(0)}</div>

                <div>
                  <h4>{assign.employee?.name}</h4>

                  <span>{assign.employee?.email}</span>
                </div>
              </div>

              {/* DATE */}

              <p className="date">
                Assigned :{" "}
                {assign.assignDate
                  ? new Date(assign.assignDate).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* RETURN */}

              {role === "admin" && !assign.returned && (
                <button
                  className="return-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    returnAsset(assign._id);
                  }}
                >
                  Return Asset
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Assignment Details</h3>

            <p>
              <strong>Asset:</strong> {selected.asset?.assetName}
            </p>

            <p>
              <strong>Employee:</strong> {selected.employee?.name}
            </p>

            <p>
              <strong>Email:</strong> {selected.employee?.email}
            </p>

            <p>
              <strong>Assigned Date:</strong>{" "}
              {selected.assignDate
                ? new Date(selected.assignDate).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selected.returned ? "Returned" : "Currently Assigned"}
            </p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assignments;
