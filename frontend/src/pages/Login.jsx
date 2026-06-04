// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import "./login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.user.role);
//       localStorage.setItem("userName", res.data.user.name);

//       navigate("/dashboard");
//     } catch (error) {
//       alert("Invalid Email or Password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">

//       {/* Background Shapes */}
//       <div className="bg-shape shape1"></div>
//       <div className="bg-shape shape2"></div>

//       <form className="login-card" onSubmit={handleLogin}>
//         <h2>Welcome Back</h2>
//         <p className="subtitle">
//           Sign in to manage your office assets
//         </p>

//         {/* Email */}
//         <div className="input-group">
//           <FaEnvelope className="input-icon" />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="input-group">
//           <FaLock className="input-icon" />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Signing In..." : "Sign In"}
//         </button>

//         <p className="register-link">
//           Don’t have an account?
//           <Link to="/register"> Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /*
  =============================
  TOAST CONFIG
  =============================
  */

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#ffffff",
    color: "#111827",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  /*
  =============================
  HANDLE LOGIN
  =============================
  */

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Toast.fire({
        icon: "warning",
        title: "Please enter email and password",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // SAVE USER DATA
      // SAVE USER DATA

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      localStorage.setItem("role", user.role);

      localStorage.setItem("userName", user.name);

      localStorage.setItem("userId", user.id);

      localStorage.setItem("email", user.email);

      /* =========================
   PROFILE IMAGE
========================= */

      localStorage.setItem(
        "profileImage",

        user.profileImage
          ? `http://localhost:5000/uploads/${user.profileImage}`
          : "https://i.pravatar.cc/150",
      );
      Toast.fire({
        icon: "success",
        title: "Login Successful",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Invalid Email or Password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>

      <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>

        <p className="subtitle-l">Sign in to manage office assets</p>

        {/* EMAIL */}

        <div className="input-group">
          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}

        <div className="input-group">
          <FaLock className="input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* LOGIN BUTTON */}

        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* REGISTER LINK */}

        <p className="register-link">
          Don’t have an account?
          <Link to="/register"> Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
