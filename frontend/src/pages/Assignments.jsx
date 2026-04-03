// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./assignments.css";

// function Assignments() {
//   const [data, setData] = useState([]);

//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");

//   const [selected, setSelected] = useState(null);

//   const role = localStorage.getItem("role");

//   /*
//   ======================
//   FETCH ASSIGNMENTS
//   ======================
//   */

//   const fetchAssignments = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("http://localhost:5000/api/assignments", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setData(res.data);

//       setFiltered(res.data);
//     } catch {
//       alert("Loading Failed");
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   /*
//   ======================
//   SEARCH FILTER
//   ======================
//   */

//   useEffect(() => {
//     let temp = [...data];

//     if (search) {
//       temp = temp.filter((a) =>
//         a.asset?.assetName?.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     setFiltered(temp);
//   }, [search, data]);

//   /*
//   ======================
//   RETURN ASSET
//   ======================
//   */

//   const returnAsset = async (id) => {
//     if (!window.confirm("Return Asset ?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.put(
//         `http://localhost:5000/api/assignments/return/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Returned Successfully");

//       fetchAssignments();
//     } catch (err) {
//       alert("Return Failed");
//     }
//   };

//   return (
//     <div className="assignments-wrapper">
//       <h2>Assigned Assets</h2>

//       {/* SEARCH */}

//       <input
//         className="search"
//         placeholder="Search Asset..."
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="card-grid">
//         {filtered.map((assign) => (
//           <div
//             key={assign._id}
//             className="assign-card"
//             onClick={() => setSelected(assign)}
//           >
//             {/* IMAGE */}

//             <img
//               alt="asset"
//               src={
//                 assign.asset?.image
//                   ? `http://localhost:5000/uploads/${assign.asset.image}`
//                   : "https://via.placeholder.com/300"
//               }
//             />

//             <h3>{assign.asset?.assetName}</h3>

//             <p>Category :{assign.asset?.category}</p>

//             {/* EMPLOYEE */}

//             <div className="employee">
//               <img src="https://i.pravatar.cc/100" alt="employee" />

//               <div>
//                 <h4>{assign.employee?.name}</h4>

//                 <span>{assign.employee?.email}</span>
//               </div>
//             </div>

//             <p className="date">
//               Assigned :{new Date(assign.assignDate).toLocaleDateString()}
//             </p>

//             {role === "admin" && (
//               <button
//                 className="return-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();

//                   returnAsset(assign._id);
//                 }}
//               >
//                 Return
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}

//       {selected && (
//         <div className="modal" onClick={() => setSelected(null)}>
//           <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//             <h3>Assignment Details</h3>

//             <p>Asset :{selected.asset?.assetName}</p>

//             <p>Employee :{selected.employee?.name}</p>

//             <p>
//               Assigned :{new Date(selected.assignDate).toLocaleDateString()}
//             </p>

//             <button onClick={() => setSelected(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Assignments;








import { useEffect, useState } from "react";
import axios from "axios";
import "./assignments.css";

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
      alert("Loading Failed");
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
        a.asset?.assetName?.toLowerCase().includes(search.toLowerCase())
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
        }
      );

      alert("Returned Successfully");

      fetchAssignments();
    } catch {
      alert("Return Failed");
    }
  };

  return (
    <div className="assignments-wrapper">
      <h2>Assigned Assets</h2>

      {/* SEARCH */}

      <input
        className="search"
        placeholder="Search Asset..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}

      <div className="card-grid">
        {filtered.map((assign) => (
          <div
            key={assign._id}
            className="assign-card"
            onClick={() => setSelected(assign)}
          >
            {/* IMAGE */}

            <img
              alt="asset"
              src={
                assign.asset?.image
                  ? `http://localhost:5000/uploads/${assign.asset.image}`
                  : "https://via.placeholder.com/300"
              }
            />

            {/* ASSET INFO */}

            <h3>{assign.asset?.assetName}</h3>

            <p>Category : {assign.asset?.category}</p>

            {/* STATUS */}

            <p
              style={{
                color: assign.returned ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              Status : {assign.returned ? "Returned" : "Assigned"}
            </p>

            {/* EMPLOYEE */}

            <div className="employee">
              <img src="https://i.pravatar.cc/100" alt="employee" />

              <div>
                <h4>{assign.employee?.name}</h4>

                <span>{assign.employee?.email}</span>
              </div>
            </div>

            {/* DATE */}

            <p className="date">
              Assigned :
              {assign.assignDate
                ? new Date(assign.assignDate).toLocaleDateString()
                : "N/A"}
            </p>

            {/* RETURN BUTTON */}

            {role === "admin" && !assign.returned && (
              <button
                className="return-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  returnAsset(assign._id);
                }}
              >
                Return
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Assignment Details</h3>

            <p>Asset : {selected.asset?.assetName}</p>

            <p>Employee : {selected.employee?.name}</p>

            <p>
              Assigned :
              {selected.assignDate
                ? new Date(selected.assignDate).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              Status :{" "}
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