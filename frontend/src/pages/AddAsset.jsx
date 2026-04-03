// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // function AddAsset() {
// //   const [assetName, setAssetName] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [serialNumber, setSerialNumber] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await axios.post(
// //         "http://localhost:5000/api/assets",
// //         {
// //           assetName,
// //           category,
// //           serialNumber
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`
// //           }
// //         }
// //       );

// //       alert("Asset Added Successfully");
// //       navigate("/assets");

// //     } catch (error) {
// //       alert("Error Adding Asset");
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "center", marginTop: "100px" }}>
// //       <h2>Add Asset</h2>

// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Asset Name"
// //           onChange={(e) => setAssetName(e.target.value)}
// //           required
// //         />
// //         <br /><br />

// //         <input
// //           type="text"
// //           placeholder="Category"
// //           onChange={(e) => setCategory(e.target.value)}
// //           required
// //         />
// //         <br /><br />

// //         <input
// //           type="text"
// //           placeholder="Serial Number"
// //           onChange={(e) => setSerialNumber(e.target.value)}
// //           required
// //         />
// //         <br /><br />

// //         <button type="submit">Add Asset</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AddAsset;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddAsset() {
//   const [assetName, setAssetName] = useState("");
//   const [category, setCategory] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/assets",
//         {
//           assetName,
//           category,
//           serialNumber
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );
//       alert("Asset Added Successfully");
//       navigate("/assets");
//     } catch (error) {
//       alert("Error Adding Asset");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Add Asset</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Asset Name"
//           onChange={(e) => setAssetName(e.target.value)}
//           required
//         />
//         <br /><br />

//         <input
//           type="text"
//           placeholder="Category"
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />
//         <br /><br />

//         <input
//           type="text"
//           placeholder="Serial Number"
//           onChange={(e) => setSerialNumber(e.target.value)}
//           required
//         />
//         <br /><br />

//         <button type="submit">Add Asset</button>
//       </form>
//     </div>
//   );
// }

// export default AddAsset;



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./addasset.css";

function AddAsset() {
  const navigate = useNavigate();

  const [asset, setAsset] = useState({
    assetName: "",

    category: "Laptop",

    serialNumber: "",

    purchaseDate: "",

    warrantyExpiry: "",

    condition: "Good",
  });

  const [image, setImage] = useState(null);

  const change = (e) => {
    setAsset({
      ...asset,

      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      Object.keys(asset).forEach((key) => {
        formData.append(
          key,

          asset[key],
        );
      });

      if (image) {
        formData.append(
          "image",

          image,
        );
      }

      await axios.post(
        "http://localhost:5000/api/assets",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Asset Added");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };

  return (
    <div className="addasset-wrapper">
      <form className="addasset-card" onSubmit={submit}>
        <h2>Add New Asset</h2>

        <input
          name="assetName"
          placeholder="Asset Name"
          required
          onChange={change}
        />

        {/* CATEGORY */}

        <select name="category" onChange={change}>
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

        <input
          name="serialNumber"
          placeholder="Serial Number"
          required
          onChange={change}
        />

        <label>Purchase Date</label>

        <input type="date" name="purchaseDate" onChange={change} />

        <label>Warranty Expiry</label>

        <input type="date" name="warrantyExpiry" onChange={change} />

        {/* CONDITION */}

        <select name="condition" onChange={change}>
          <option>New</option>

          <option>Good</option>

          <option>Needs Maintenance</option>

          <option>Damaged</option>
        </select>

        {/* IMAGE */}

        <label>Asset Image (Optional)</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button>Add Asset</button>
      </form>
    </div>
  );
}

export default AddAsset;
