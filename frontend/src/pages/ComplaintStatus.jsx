// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./complaintstatus.css";

// function ComplaintStatus() {

//   const [complaints, setComplaints] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:5000/api/complaints/my",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setComplaints(res.data || []);

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   return (

//     <div className="status-container">

//       <h2>My Complaints</h2>

//       {loading ? (
//         <p className="loading">Loading...</p>
//       ) : complaints.length === 0 ? (
//         <div className="empty-box">
//           <h3>No Complaints</h3>
//           <p>You haven’t raised any complaints yet</p>
//         </div>
//       ) : (

//         <div className="table">

//           <div className="table-head">
//             <span>ID</span>
//             <span>Asset</span>
//             <span>Status</span>
//             <span>Action</span>
//           </div>

//           {complaints.map(c => (

//             <div key={c._id} className="table-row">

//               <span>#{c._id.slice(-5)}</span>

//               <span>{c.asset?.assetName || "N/A"}</span>

//               <span className={`badge ${c.status.toLowerCase().replace(" ", "-")}`}>
//                 {c.status}
//               </span>

//               <button
//                 className="view-btn"
//                 onClick={() => setSelected(c)}
//               >
//                 View
//               </button>

//             </div>

//           ))}

//         </div>

//       )}

//       {/* 🔥 MODAL (DETAIL VIEW) */}
//       {selected && (

//         <div className="modal">

//           <div className="modal-box">

//             <h3>Complaint Details</h3>

//             <p><b>ID:</b> #{selected._id}</p>

//             <p><b>Asset:</b> {selected.asset?.assetName}</p>

//             <p><b>Description:</b> {selected.description}</p>

//             <p><b>Status:</b> {selected.status}</p>

//             <p><b>Date:</b> {new Date(selected.createdAt).toLocaleString()}</p>

//             {/* 🔥 STATUS PROGRESS */}
//             <div className="progress-bar">

//               <div className={`step ${selected.status !== "Pending" ? "done" : ""}`}>
//                 Pending
//               </div>

//               <div className={`step ${selected.status === "In Progress" || selected.status === "Resolved" ? "done" : ""}`}>
//                 In Progress
//               </div>

//               <div className={`step ${selected.status === "Resolved" ? "done" : ""}`}>
//                 Resolved
//               </div>

//             </div>

//             <button onClick={() => setSelected(null)}>Close</button>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// }

// export default ComplaintStatus;
import { useEffect, useState } from "react";
import axios from "axios";
import "./complaintstatus.css";

function ComplaintStatus() {

  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]); // ✅ FIX
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/complaints/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data || [];

      setComplaints(data);
      setFiltered(data); // ✅ FIX

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔍 SEARCH (SAFE)
  const handleSearch = (value) => {
    const search = value.toLowerCase();

    const result = complaints.filter(c =>
      c.asset?.assetName?.toLowerCase().includes(search)
    );

    setFiltered(result);
  };

  return (

    <div className="status-container">

      {/* HEADER */}
      <div className="status-header">
        <h2>Complaint Dashboard</h2>

        <button className="refresh-btn" onClick={fetchComplaints}>
          Refresh
        </button>
      </div>


      {/* SUMMARY */}
      <div className="summary-cards">

        <div className="card total">
          <h3>{complaints.length}</h3>
          <p>Total</p>
        </div>

        <div className="card pending">
          <h3>{complaints.filter(c => c.status === "Pending").length}</h3>
          <p>Pending</p>
        </div>

        <div className="card progress">
          <h3>{complaints.filter(c => c.status === "In Progress").length}</h3>
          <p>In Progress</p>
        </div>

        <div className="card resolved">
          <h3>{complaints.filter(c => c.status === "Resolved").length}</h3>
          <p>Resolved</p>
        </div>

      </div>


      {/* SEARCH */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search complaints..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>


      {/* TABLE */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="no-data">No complaints found</p>
      ) : (

        <div className="table">

          <div className="table-head">
            <span>Asset</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filtered.map(c => (

            <div key={c._id} className="table-row">

              <span className="asset-name">
                {c.asset?.assetName || "N/A"}
              </span>

              <span className={`badge ${c.status.toLowerCase().replace(" ", "-")}`}>
                {c.status}
              </span>

              <button
                className="view-btn"
                onClick={() => setSelected(c)}
              >
                View Details
              </button>

            </div>

          ))}

        </div>

      )}


      {/* MODAL */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>

          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <h3>Complaint Details</h3>

              <button
                className="close-btnnn"
                onClick={() => setSelected(null)}
              >
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
                <p className={`badge ${selected.status.toLowerCase().replace(" ", "-")}`}>
                  {selected.status}
                </p>
              </div>

              <div className="detail-row">
                <span>Date</span>
                <p>{new Date(selected.createdAt).toLocaleString()}</p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ComplaintStatus;