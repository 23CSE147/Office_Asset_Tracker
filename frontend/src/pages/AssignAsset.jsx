// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "./assignasset.css";

// function AssignAsset() {

//   const [assets, setAssets] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [asset, setAsset] = useState("");
//   const [employee, setEmployee] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   /*
//   ======================
//   TOAST CONFIG
//   ======================
//   */

//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 2500,
//     timerProgressBar: true,
//   });

//   /*
//   ======================
//   LOAD DATA
//   ======================
//   */

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {

//       const assetRes = await axios.get(
//         "http://localhost:5000/api/assets",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setAssets(assetRes.data.filter((a) => a.status === "Available"));

//       const empRes = await axios.get(
//         "http://localhost:5000/api/auth/employees",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setEmployees(empRes.data);

//     } catch (error) {

//       Toast.fire({
//         icon: "error",
//         title: "Failed to load data",
//       });

//     }
//   };

//   /*
//   ======================
//   SUBMIT
//   ======================
//   */

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!asset || !employee) {

//       Toast.fire({
//         icon: "warning",
//         title: "Select Asset & Employee",
//       });

//       return;
//     }

//     setLoading(true);

//     try {

//       await axios.post(
//         "http://localhost:5000/api/assignments",
//         {
//           assetId: asset,
//           employeeId: employee,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ SUCCESS ALERT
//       Swal.fire({
//         icon: "success",
//         title: "Asset Assigned",
//         text: "Asset assigned successfully 🎉",
//         confirmButtonColor: "#4f46e5",
//       });

//       load();
//       setAsset("");
//       setEmployee("");

//     } catch (error) {

//       Swal.fire({
//         icon: "error",
//         title: "Assignment Failed",
//         text: "Something went wrong",
//       });

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="assign-form-wrapper">

//       <form className="assign-form-card" onSubmit={submit}>

//         <h2>Assign Asset</h2>

//         {/* ASSET */}
//         <label>Select Asset</label>
//         <select
//           required
//           value={asset}
//           onChange={(e) => setAsset(e.target.value)}
//         >
//           <option value="">Select Asset</option>

//           {assets.map((a) => (
//             <option key={a._id} value={a._id}>
//               {a.assetName}
//             </option>
//           ))}
//         </select>

//         {/* EMPLOYEE */}
//         <label>Select Employee</label>
//         <select
//           required
//           value={employee}
//           onChange={(e) => setEmployee(e.target.value)}
//         >
//           <option value="">Select Employee</option>

//           {employees.map((emp) => (
//             <option key={emp._id} value={emp._id}>
//               {emp.name} ({emp.email})
//             </option>
//           ))}
//         </select>

//         {/* BUTTON */}
//         <button disabled={!asset || !employee || loading}>
//           {loading ? "Assigning..." : "Assign Asset"}
//         </button>

//       </form>

//     </div>
//   );
// }

// export default AssignAsset;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "./assignasset.css";

// function AssignAsset() {

//   const [assets, setAssets] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [asset, setAsset] = useState("");
//   const [employee, setEmployee] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   /*
//   ======================
//   TOAST CONFIG
//   ======================
//   */

//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-right", // 🔥 better position
//     showConfirmButton: false,
//     timer: 2500,
//     timerProgressBar: true,
//   });

//   /*
//   ======================
//   LOAD DATA
//   ======================
//   */

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {

//       const assetRes = await axios.get(
//         "http://localhost:5000/api/assets",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setAssets(assetRes.data.filter((a) => a.status === "Available"));

//       const empRes = await axios.get(
//         "http://localhost:5000/api/auth/employees",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setEmployees(empRes.data);

//     } catch (error) {

//       Toast.fire({
//         icon: "error",
//         title: "Failed to load data ❌",
//       });

//     }
//   };

//   /*
//   ======================
//   SUBMIT
//   ======================
//   */

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!asset || !employee) {

//       Toast.fire({
//         icon: "warning",
//         title: "Select Asset & Employee ⚠️",
//       });

//       return;
//     }

//     setLoading(true);

//     try {

//       await axios.post(
//         "http://localhost:5000/api/assignments",
//         {
//           assetId: asset,
//           employeeId: employee,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ SUCCESS TOAST
//       Toast.fire({
//         icon: "success",
//         title: "Asset Assigned Successfully",
//       });

//       load();
//       setAsset("");
//       setEmployee("");

//     } catch (error) {

//       Toast.fire({
//         icon: "error",
//         title: "Assignment Failed ❌",
//       });

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="assign-form-wrapper">

//       <form className="assign-form-card" onSubmit={submit}>

//         <h2>Assign Asset</h2>

//         {/* ASSET */}
//         <label>Select Asset</label>
//         <select
//           required
//           value={asset}
//           onChange={(e) => setAsset(e.target.value)}
//         >
//           <option value="">Select Asset</option>

//           {assets.map((a) => (
//             <option key={a._id} value={a._id}>
//               {a.assetName}
//             </option>
//           ))}
//         </select>

//         {/* EMPLOYEE */}
//         <label>Select Employee</label>
//         <select
//           required
//           value={employee}
//           onChange={(e) => setEmployee(e.target.value)}
//         >
//           <option value="">Select Employee</option>

//           {employees.map((emp) => (
//             <option key={emp._id} value={emp._id}>
//               {emp.name} ({emp.email})
//             </option>
//           ))}
//         </select>

//         {/* BUTTON */}
//         <button disabled={!asset || !employee || loading}>
//           {loading ? "Assigning..." : "Assign Asset"}
//         </button>

//       </form>

//     </div>
//   );
// }

// export default AssignAsset;

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaLaptop, FaUser, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import "./assignasset.css";
import PageHeader from "../components/PageHeader";
function AssignAsset() {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [asset, setAsset] = useState("");
  const [employee, setEmployee] = useState("");

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /*
  ======================
  TOAST
  ======================
  */

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
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
      const assetRes = await axios.get("http://localhost:5000/api/assets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const availableAssets = assetRes.data.filter(
        (a) => a.status === "Available",
      );

      setAssets(availableAssets);

      const empRes = await axios.get(
        "http://localhost:5000/api/auth/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
  ASSIGN
  ======================
  */

  const submit = async (e) => {
    e.preventDefault();

    if (!asset || !employee) {
      Toast.fire({
        icon: "warning",
        title: "Select asset & employee",
      });

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/assignments",
        {
          assetId: asset,
          employeeId: employee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.fire({
        icon: "success",
        title: "Asset Assigned Successfully",
      });

      setAsset("");
      setEmployee("");

      setSelectedAsset(null);
      setSelectedEmployee(null);

      load();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Assignment Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
  ======================
  HANDLE SELECT
  ======================
  */

  const handleAsset = (id) => {
    setAsset(id);

    const found = assets.find((a) => a._id === id);

    setSelectedAsset(found);
  };

  const handleEmployee = (id) => {
    setEmployee(id);

    const found = employees.find((e) => e._id === id);

    setSelectedEmployee(found);
  };

  return (
    <div className="assign-page">
       <PageHeader title="Assign Asset" />
      <div className="assign-card">
        <div className="assign-header">
          <h2>Assign Asset</h2>

          <p>Allocate company assets to employees</p>
        </div>

        <form onSubmit={submit}>
          {/* ASSET */}

          <div className="input-box">
            <label>Select Asset</label>

            <select value={asset} onChange={(e) => handleAsset(e.target.value)}>
              <option value="">Choose Asset</option>

              {assets.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.assetName}
                </option>
              ))}
            </select>
          </div>

          {/* EMPLOYEE */}

          <div className="input-box">
            <label>Select Employee</label>

            <select
              value={employee}
              onChange={(e) => handleEmployee(e.target.value)}
            >
              <option value="">Choose Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* PREVIEW */}

          {(selectedAsset || selectedEmployee) && (
            <div className="preview-box">
              {selectedAsset && (
                <div className="preview-item">
                  <FaLaptop />

                  <div>
                    <h4>{selectedAsset.assetName}</h4>
                    <p>Status: Available</p>
                  </div>
                </div>
              )}

              <FaArrowRight className="arrow" />

              {selectedEmployee && (
                <div className="preview-item">
                  <FaUser />

                  <div>
                    <h4>{selectedEmployee.name}</h4>
                    <p>{selectedEmployee.email}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BUTTON */}

          <button type="submit" disabled={!asset || !employee || loading}>
            {loading ? (
              "Assigning..."
            ) : (
              <>
                <FaCheckCircle />
                Assign Asset
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignAsset;
