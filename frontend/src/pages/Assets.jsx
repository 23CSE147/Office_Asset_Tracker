// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import "./assets.css";
// import PageHeader from "../components/PageHeader";

// function Assets() {
//   const [assets, setAssets] = useState([]);

//   const [filtered, setFiltered] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

//   const [categoryFilter, setCategoryFilter] = useState("");

//   const [statusFilter, setStatusFilter] = useState("");

//   const [selectedAsset, setSelectedAsset] = useState(null);

//   const role = localStorage.getItem("role");
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const selectedAssetId = queryParams.get("assetId");

//   /*
// ==========================
// FETCH
// ==========================
// */

//   const fetchAssets = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const role = localStorage.getItem("role");

//       let url = "http://localhost:5000/api/assets";

//       // 🔥 USER → only assigned assets
//       if (role !== "admin") {
//         url = "http://localhost:5000/api/assets/my-assets";
//       }

//       const res = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAssets(res.data);
//       setFiltered(res.data);
//     } catch (error) {
//       console.log(error);
//       alert("Failed Loading");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAssets();
//   }, []);
//   useEffect(() => {
//     if (selectedAssetId && assets.length > 0) {
//       const foundAsset = assets.find((a) => a._id === selectedAssetId);

//       if (foundAsset) {
//         setSelectedAsset(foundAsset); // ⭐ OPEN MODAL
//       }
//     }
//   }, [selectedAssetId, assets]);
//   /*
// ==========================
// SEARCH + FILTER
// ==========================
// */

//   useEffect(() => {
//     let data = [...assets];

//     // SEARCH

//     if (search) {
//       data = data.filter((a) =>
//         a.assetName
//           .toLowerCase()

//           .includes(search.toLowerCase()),
//       );
//     }

//     // CATEGORY

//     if (categoryFilter) {
//       data = data.filter((a) => a.category === categoryFilter);
//     }

//     // STATUS

//     if (statusFilter) {
//       data = data.filter((a) => a.status === statusFilter);
//     }

//     setFiltered(data);
//   }, [search, categoryFilter, statusFilter, assets]);

//   /*
// ==========================
// DELETE
// ==========================
// */

//   const deleteAsset = async (id) => {
//     if (!window.confirm("Delete Asset ?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:5000/api/assets/${id}`,

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       fetchAssets();
//     } catch {
//       alert("Delete Failed");
//     }
//   };

//   /*
// ==========================
// UI
// ==========================
// */

//   return (
//     <div className="assets-wrapper">
//       <PageHeader title="Assets Management" />

//       {/* FILTER */}

//       <div className="filter-bar">
//         <input
//           placeholder="Search Asset..."
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select onChange={(e) => setCategoryFilter(e.target.value)}>
//           <option value="">All Category</option>

//           <option>Laptop</option>
//           <option>Desktop</option>
//           <option>Printer</option>
//           <option>Router</option>
//           <option>Furniture</option>
//         </select>

//         <select onChange={(e) => setStatusFilter(e.target.value)}>
//           <option value="">All Status</option>

//           <option>Available</option>

//           <option>Assigned</option>

//           <option>Maintenance</option>
//         </select>
//       </div>

//       {/* TABLE */}

//       {loading ? (
//         <p className="loading-text">Loading Assets...</p>
//       ) : (
//         <div className="table-container">
//           <table className="assets-table">
//             <thead>
//               <tr>
//                 <th>Name</th>

//                 <th>Category</th>

//                 <th>Status</th>

//                 <th>Serial</th>

//                 <th>Purchase</th>

//                 {role === "admin" && <th>Action</th>}
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((asset) => (
//                 <tr key={asset._id} onClick={() => setSelectedAsset(asset)}>
//                   <td>{asset.assetName}</td>

//                   <td>{asset.category}</td>

//                   {/* STATUS BADGE */}

//                   <td>
//                     <span
//                       className={`status
// ${asset.status.toLowerCase()}`}
//                     >
//                       {asset.status}
//                     </span>
//                   </td>

//                   <td>{asset.serialNumber}</td>

//                   <td>
//                     {asset.purchaseDate
//                       ? new Date(asset.purchaseDate).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   {role === "admin" && (
//                     <td>
//                       <button
//                         className="delete-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();

//                           deleteAsset(asset._id);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* MODAL */}

//       {selectedAsset && (
//         <div className="asset-modal" onClick={() => setSelectedAsset(null)}>
//           <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//             <h3>{selectedAsset.assetName}</h3>

//             {selectedAsset.image && (
//               <img
//                 src={`http://localhost:5000/uploads/${selectedAsset.image}`}
//                 alt="asset"
//               />
//             )}

//             <p>Category :{selectedAsset.category}</p>

//             <p>Condition :{selectedAsset.condition}</p>

//             <p>Status :{selectedAsset.status}</p>

//             <p>Serial :{selectedAsset.serialNumber}</p>

//             <p>
//               Warranty :
//               {selectedAsset.warrantyExpiry
//                 ? new Date(selectedAsset.warrantyExpiry).toLocaleDateString()
//                 : "-"}
//             </p>

//             <button onClick={() => setSelectedAsset(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Assets;

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./assets.css";
import PageHeader from "../components/PageHeader";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedAsset, setSelectedAsset] = useState(null);

  const role = localStorage.getItem("role");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedAssetId = queryParams.get("assetId");

  // ==========================
  // FETCH ASSETS
  // ==========================
  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:5000/api/assets";

      if (role !== "admin") {
        url = "http://localhost:5000/api/assets/my-assets";
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssets(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed Loading");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // ==========================
  // OPEN FROM NOTIFICATION
  // ==========================
  useEffect(() => {
    if (selectedAssetId && assets.length > 0) {
      const found = assets.find((a) => a._id === selectedAssetId);
      if (found) setSelectedAsset(found);
    }
  }, [selectedAssetId, assets]);

  // ==========================
  // FILTER
  // ==========================
  useEffect(() => {
    let data = [...assets];

    if (search) {
      data = data.filter((a) =>
        a.assetName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (categoryFilter) {
      data = data.filter((a) => a.category === categoryFilter);
    }

    if (statusFilter) {
      data = data.filter((a) => a.status === statusFilter);
    }

    setFiltered(data);
  }, [search, categoryFilter, statusFilter, assets]);

  // ==========================
  // DELETE (ADMIN)
  // ==========================
  const deleteAsset = async (id) => {
    if (!window.confirm("Delete Asset?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/assets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAssets();
    } catch {
      alert("Delete Failed");
    }
  };

  // ==========================
  // RETURN (USER)
  // ==========================
  const returnAsset = async (assetId) => {
    if (!window.confirm("Return this asset?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const assignment = res.data.find(
        (a) =>
          a.asset && // ✅ check null
          a.asset._id === assetId &&
          !a.returned,
      );

      if (!assignment) {
        alert("Assignment not found");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/assignments/return/${assignment._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Returned Successfully");
      fetchAssets();
    } catch (error) {
      console.log(error);
      alert("Return Failed");
    }
  };

  // ==========================
  // UI
  // ==========================
  return (
    <div className="assets-wrapper">
      <PageHeader title="Assets Management" />

      {/* FILTER */}
      <div className="filter-bar">
        <input
          placeholder="Search Asset..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Category</option>
          <option>Laptop</option>
          <option>Desktop</option>
          <option>Printer</option>
          <option>Router</option>
          <option>Furniture</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Available</option>
          <option>Assigned</option>
          <option>Maintenance</option>
        </select>
      </div>

      {/* ================= ADMIN VIEW (TABLE) ================= */}
      {role === "admin" ? (
        loading ? (
          <p className="loading-text">Loading Assets...</p>
        ) : (
          <div className="table-container">
            <table className="assets-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Serial</th>
                  <th>Purchase</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((asset) => (
                  <tr key={asset._id}>
                    <td>{asset.assetName}</td>
                    <td>{asset.category}</td>

                    <td>
                      <span className={`status ${asset.status.toLowerCase()}`}>
                        {asset.status}
                      </span>
                    </td>

                    <td>{asset.serialNumber}</td>

                    <td>
                      {asset.purchaseDate
                        ? new Date(asset.purchaseDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteAsset(asset._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* ================= USER VIEW (CARD) ================= */
        <div className="card-grid">
          {filtered.map((asset) => (
            <div key={asset._id} className="asset-card">
              <img
                src={
                  asset?.image
                    ? `http://localhost:5000/uploads/${asset.image}`
                    : "https://dummyimage.com/300x200/4f46e5/ffffff&text=No+Image"
                }
                alt="asset"
              />

              <h3>{asset.assetName}</h3>
              <p>Category: {asset.category}</p>

              <span className={`status ${asset.status.toLowerCase()}`}>
                {asset.status}
              </span>

              <p>Serial: {asset.serialNumber}</p>

              <button
                className="return-btn"
                onClick={() => returnAsset(asset._id)}
              >
                Return
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedAsset && (
        <div className="asset-modal" onClick={() => setSelectedAsset(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedAsset.assetName}</h3>

            {selectedAsset.image && (
              <img
                src={`http://localhost:5000/uploads/${selectedAsset.image}`}
                alt="asset"
              />
            )}

            <p>Category: {selectedAsset.category}</p>
            <p>Status: {selectedAsset.status}</p>
            <p>Serial: {selectedAsset.serialNumber}</p>

            <button onClick={() => setSelectedAsset(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;
