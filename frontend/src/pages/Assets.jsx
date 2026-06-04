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

//   // ==========================
//   // FETCH ASSETS
//   // ==========================
//   const fetchAssets = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       let url = "http://localhost:5000/api/assets";

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

//   // ==========================
//   // OPEN FROM NOTIFICATION
//   // ==========================
//   useEffect(() => {
//     if (selectedAssetId && assets.length > 0) {
//       const found = assets.find((a) => a._id === selectedAssetId);
//       if (found) setSelectedAsset(found);
//     }
//   }, [selectedAssetId, assets]);

//   // ==========================
//   // FILTER
//   // ==========================
//   useEffect(() => {
//     let data = [...assets];

//     if (search) {
//       data = data.filter((a) =>
//         a.assetName.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     if (categoryFilter) {
//       data = data.filter((a) => a.category === categoryFilter);
//     }

//     if (statusFilter) {
//       data = data.filter((a) => a.status === statusFilter);
//     }

//     setFiltered(data);
//   }, [search, categoryFilter, statusFilter, assets]);

//   // ==========================
//   // DELETE (ADMIN)
//   // ==========================
//   const deleteAsset = async (id) => {
//     if (!window.confirm("Delete Asset?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(`http://localhost:5000/api/assets/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       fetchAssets();
//     } catch {
//       alert("Delete Failed");
//     }
//   };

//   // ==========================
//   // RETURN (USER)
//   // ==========================
//   const returnAsset = async (assetId) => {
//     if (!window.confirm("Return this asset?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("http://localhost:5000/api/assignments", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const assignment = res.data.find(
//         (a) =>
//           a.asset && // ✅ check null
//           a.asset._id === assetId &&
//           !a.returned,
//       );

//       if (!assignment) {
//         alert("Assignment not found");
//         return;
//       }

//       await axios.put(
//         `http://localhost:5000/api/assignments/return/${assignment._id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       alert("Returned Successfully");
//       fetchAssets();
//     } catch (error) {
//       console.log(error);
//       alert("Return Failed");
//     }
//   };

//   // ==========================
//   // UI
//   // ==========================
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

//       {/* ================= ADMIN VIEW (TABLE) ================= */}
//       {role === "admin" ? (
//         loading ? (
//           <p className="loading-text">Loading Assets...</p>
//         ) : (
//           <div className="table-container">
//             <table className="assets-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Status</th>
//                   <th>Serial</th>
//                   <th>Purchase</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filtered.map((asset) => (
//                   <tr key={asset._id}>
//                     <td>{asset.assetName}</td>
//                     <td>{asset.category}</td>

//                     <td>
//                       <span className={`status ${asset.status.toLowerCase()}`}>
//                         {asset.status}
//                       </span>
//                     </td>

//                     <td>{asset.serialNumber}</td>

//                     <td>
//                       {asset.purchaseDate
//                         ? new Date(asset.purchaseDate).toLocaleDateString()
//                         : "-"}
//                     </td>

//                     <td>
//                       <button
//                         className="delete-btn"
//                         onClick={() => deleteAsset(asset._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )
//       ) : (
//         /* ================= USER VIEW (CARD) ================= */
//         <div className="card-grid">
//           {filtered.map((asset) => (
//             <div key={asset._id} className="asset-card">
//               <img
//                 src={
//                   asset?.image
//                     ? `http://localhost:5000/uploads/${asset.image}`
//                     : "https://dummyimage.com/300x200/4f46e5/ffffff&text=No+Image"
//                 }
//                 alt="asset"
//               />

//               <h3>{asset.assetName}</h3>
//               <p>Category: {asset.category}</p>

//               <span className={`status ${asset.status.toLowerCase()}`}>
//                 {asset.status}
//               </span>

//               <p>Serial: {asset.serialNumber}</p>

//               <button
//                 className="return-btn"
//                 onClick={() => returnAsset(asset._id)}
//               >
//                 Return
//               </button>
//             </div>
//           ))}
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

//             <p>Category: {selectedAsset.category}</p>
//             <p>Status: {selectedAsset.status}</p>
//             <p>Serial: {selectedAsset.serialNumber}</p>

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

// ✅ TOAST
import { toast } from "react-toastify";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editAsset, setEditAsset] = useState(null);
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
      toast.error("Failed to load assets ❌");
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

      toast.success("Asset deleted successfully");
      fetchAssets();
    } catch {
      toast.error("Delete failed ❌");
    }
  };
  const updateAsset = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("assetName", editAsset.assetName);
      formData.append("category", editAsset.category);
      formData.append("serialNumber", editAsset.serialNumber);
      formData.append("purchaseDate", editAsset.purchaseDate);
      formData.append("warrantyExpiry", editAsset.warrantyExpiry);
      formData.append("condition", editAsset.condition);

      if (editAsset.newImage) {
        formData.append("image", editAsset.newImage);
      }

      await axios.put(
        `http://localhost:5000/api/assets/${editAsset._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Asset updated successfully ✅");

      setEditAsset(null);
      fetchAssets();
    } catch (error) {
      console.log(error);
      toast.error("Update failed ❌");
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
        (a) => a.asset && a.asset._id === assetId && !a.returned,
      );

      if (!assignment) {
        toast.warning("Assignment not found ⚠️");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/assignments/return/${assignment._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Returned successfully");
      fetchAssets();
    } catch (error) {
      console.log(error);
      toast.error("Return failed ❌");
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

      {loading ? (
        <p className="loading-text">Loading Assets...</p>
      ) : role === "admin" ? (
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
                      className="edit-btn"
                      onClick={() => setEditAsset(asset)}
                    >
                      Edit
                    </button>
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
      ) : (
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
      {editAsset && (
        <div className="asset-modal" onClick={() => setEditAsset(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Asset</h3>

            {/* NAME */}
            <input
              value={editAsset.assetName}
              onChange={(e) =>
                setEditAsset({ ...editAsset, assetName: e.target.value })
              }
              placeholder="Asset Name"
            />

            {/* CATEGORY */}
            <select
              value={editAsset.category}
              onChange={(e) =>
                setEditAsset({ ...editAsset, category: e.target.value })
              }
            >
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Monitor</option>
              <option>Printer</option>
              <option>Keyboard</option>
              <option>Mouse</option>
              <option>Router</option>
              <option>Server</option>
              <option>Furniture</option>
              <option>Other</option>
            </select>

            {/* SERIAL */}
            <input
              value={editAsset.serialNumber}
              onChange={(e) =>
                setEditAsset({ ...editAsset, serialNumber: e.target.value })
              }
              placeholder="Serial Number"
            />

            {/* PURCHASE DATE */}
            <div className="form-group">
            <label>Purchase Date</label>
            <input
              type="date"
              value={editAsset.purchaseDate?.substring(0, 10)}
              onChange={(e) =>
                setEditAsset({ ...editAsset, purchaseDate: e.target.value })
              }
            />
            

            {/* WARRANTY */}
            <label>Warranty Expiry</label>
            <input
              type="date"
              value={editAsset.warrantyExpiry?.substring(0, 10)}
              onChange={(e) =>
                setEditAsset({ ...editAsset, warrantyExpiry: e.target.value })
              }
            />
            </div>
            {/* CONDITION */}
            <select
              value={editAsset.condition}
              onChange={(e) =>
                setEditAsset({ ...editAsset, condition: e.target.value })
              }
            >
              <option>New</option>
              <option>Good</option>
              <option>Needs Maintenance</option>
              <option>Damaged</option>
            </select>

            {/* IMAGE */}
            <input
              type="file"
              onChange={(e) =>
                setEditAsset({ ...editAsset, newImage: e.target.files[0] })
              }
            />

            {/* BUTTON */}
            <button onClick={updateAsset}>Update Asset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;
