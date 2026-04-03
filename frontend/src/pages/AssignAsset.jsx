// import { useEffect, useState } from "react";

// import axios from "axios";

// import "./assignasset.css";

// function AssignAsset() {
//   const [assets, setAssets] = useState([]);

//   const [employees, setEmployees] = useState([]);

//   const [asset, setAsset] = useState("");

//   const [employee, setEmployee] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const assetRes = await axios.get(
//         "http://localhost:5000/api/assets",

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setAssets(assetRes.data.filter((a) => a.status === "Available"));

//       const empRes = await axios.get(
//         "http://localhost:5000/api/auth/employees",

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setEmployees(empRes.data);
//     } catch {
//       alert("Load Failed");
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/assignments",

//         {
//           assetId: asset,

//           employeeId: employee,
//         },

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Assigned");
//     } catch {
//       alert("Assign Failed");
//     }
//   };

//   return (
//     <div className="assign-wrapper">
//       <form className="assign-card" onSubmit={submit}>
//         <h2>Assign Asset</h2>

//         <select required onChange={(e) => setAsset(e.target.value)}>
//           <option>Select Asset</option>

//           {assets.map((a) => (
//             <option key={a._id} value={a._id}>
//               {a.assetName}
//             </option>
//           ))}
//         </select>

//         <select required onChange={(e) => setEmployee(e.target.value)}>
//           <option>Select Employee</option>

//           {employees.map((emp) => (
//             <option key={emp._id} value={emp._id}>
//               {emp.name}
//             </option>
//           ))}
//         </select>

//         <button>Assign</button>
//       </form>
//     </div>
//   );
// }

// export default AssignAsset;
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./assignasset.css";

function AssignAsset() {

  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [asset, setAsset] = useState("");
  const [employee, setEmployee] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /*
  ======================
  TOAST CONFIG
  ======================
  */

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  /*
  ======================
  LOAD DATA
  ======================
  */

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {

      const assetRes = await axios.get(
        "http://localhost:5000/api/assets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAssets(assetRes.data.filter((a) => a.status === "Available"));

      const empRes = await axios.get(
        "http://localhost:5000/api/auth/employees",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEmployees(empRes.data);

    } catch (error) {

      Toast.fire({
        icon: "error",
        title: "Failed to load data",
      });

    }
  };

  /*
  ======================
  SUBMIT
  ======================
  */

  const submit = async (e) => {
    e.preventDefault();

    if (!asset || !employee) {

      Toast.fire({
        icon: "warning",
        title: "Select Asset & Employee",
      });

      return;
    }

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:5000/api/assignments",
        {
          assetId: asset,
          employeeId: employee,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ SUCCESS ALERT
      Swal.fire({
        icon: "success",
        title: "Asset Assigned",
        text: "Asset assigned successfully 🎉",
        confirmButtonColor: "#4f46e5",
      });

      load();
      setAsset("");
      setEmployee("");

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Assignment Failed",
        text: "Something went wrong",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-form-wrapper">

      <form className="assign-form-card" onSubmit={submit}>

        <h2>Assign Asset</h2>

        {/* ASSET */}
        <label>Select Asset</label>
        <select
          required
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
        >
          <option value="">Select Asset</option>

          {assets.map((a) => (
            <option key={a._id} value={a._id}>
              {a.assetName}
            </option>
          ))}
        </select>

        {/* EMPLOYEE */}
        <label>Select Employee</label>
        <select
          required
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>

        {/* BUTTON */}
        <button disabled={!asset || !employee || loading}>
          {loading ? "Assigning..." : "Assign Asset"}
        </button>

      </form>

    </div>
  );
}

export default AssignAsset;