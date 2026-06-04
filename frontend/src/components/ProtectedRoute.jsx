// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }

// export default ProtectedRoute;





import { Navigate } from "react-router-dom";
import checkToken from "../../../backend/utils/checkToken";


function ProtectedRoute({ children }) {

  const isAuthenticated = checkToken();

  return isAuthenticated
    ? children
    : <Navigate to="/" replace />;
}

export default ProtectedRoute;