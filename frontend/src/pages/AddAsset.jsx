import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import "./addasset.css";
import PageHeader from "../components/PageHeader";

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
        formData.append(key, asset[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://localhost:5000/api/assets",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Asset Added Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error("Failed to add asset");

    }
  };

  return (

    <div className="addasset-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header-wrapper">
        <PageHeader title="Add Asset" />
      </div>

      <form className="addasset-card" onSubmit={submit}>

        <h2>Add New Asset</h2>

        <input
          name="assetName"
          placeholder="Asset Name"
          required
          onChange={change}
        />

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

        <input
          type="date"
          name="purchaseDate"
          onChange={change}
        />

        <label>Warranty Expiry</label>

        <input
          type="date"
          name="warrantyExpiry"
          onChange={change}
        />

        <select name="condition" onChange={change}>
          <option>New</option>
          <option>Good</option>
          <option>Needs Maintenance</option>
          <option>Damaged</option>
        </select>

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