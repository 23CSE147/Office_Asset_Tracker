// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./raisecomplaint.css";

// function RaiseComplaint() {
//   const [assets, setAssets] = useState([]);
//   const [assetId, setAssetId] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     if (!token) {
//       console.log("No token found");
//       return;
//     }

//     const fetchAssets = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/assets/my-assets",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         console.log("Assets Response:", res.data); // 🔥 DEBUG

//         setAssets(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.log(
//           "Error fetching assets:",
//           err.response?.data || err.message,
//         );
//       }
//     };

//     fetchAssets();
//   }, [token]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!assetId || !description) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:5000/api/complaints",
//         { assetId, description },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Complaint submitted");

//       setAssetId("");
//       setDescription("");
//     } catch (err) {
//       alert("Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="complaint-wrapper">
//       <form className="complaint-card" onSubmit={handleSubmit}>
//         <h2>Raise Complaint</h2>
//         <label>Select Asset</label>
//         <select value={assetId} onChange={(e) => setAssetId(e.target.value)}>
//           <option value="">Choose Asset</option>

//           {assets.length > 0 ? (
//             assets.map((a) => (
//               <option key={a._id} value={a._id}>
//                 {a.assetName} 
//               </option>
//             ))
//           ) : (
//             <option disabled>No assets assigned</option>
//           )}
//         </select>
  
//         <label>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter issue..."
//         />
//         <button type="submit">
//           {loading ? "Submitting..." : "Submit Complaint"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default RaiseComplaint;












import { useEffect, useState } from "react";
import axios from "axios";
import "./raisecomplaint.css";

function RaiseComplaint() {

  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // FETCH ASSETS
  useEffect(() => {
    if (!token) return;

    const fetchAssets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/assets/my-assets",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAssets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAssets();
  }, [token]);

  // SELECTED ASSET DETAILS
  const selectedAsset = assets.find(a => a._id === assetId);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assetId || !description) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/complaints",
        { assetId, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Complaint submitted successfully");

      setAssetId("");
      setDescription("");

    } catch (err) {
      setMessage("❌ Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="complaint-wrapper">

      <form className="complaint-card" onSubmit={handleSubmit}>

        <h2>Raise Complaint</h2>

        {/* MESSAGE */}
        {message && <div className="message">{message}</div>}

        {/* SELECT ASSET */}
        <label>Select Asset</label>

        <select
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
        >
          <option value="">Choose Asset</option>

          {assets.map((a) => (
            <option key={a._id} value={a._id}>
              {a.assetName}
            </option>
          ))}
        </select>

        {/* ASSET DETAILS */}
        {selectedAsset && (
          <div className="asset-info">
            <p><b>Name:</b> {selectedAsset.assetName}</p>
            <p><b>Category:</b> {selectedAsset.category || "N/A"}</p>
            <p><b>Status:</b> {selectedAsset.status || "Active"}</p>
          </div>
        )}

        {/* DESCRIPTION */}
        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue clearly..."
          maxLength={200}
        />

        <div className="char-count">
          {description.length}/200 characters
        </div>

        {/* BUTTON */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

      </form>

    </div>
  );
}

export default RaiseComplaint;