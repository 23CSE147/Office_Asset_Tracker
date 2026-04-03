// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "./register.css";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Password validation
//   const validatePassword = (password) => {
//     const errors = [];

//     if (password.length < 8)
//       errors.push("Minimum 8 characters required");

//     if (!/[A-Z]/.test(password))
//       errors.push("At least 1 uppercase letter required");

//     if (!/[a-z]/.test(password))
//       errors.push("At least 1 lowercase letter required");

//     if (!/[0-9]/.test(password))
//       errors.push("At least 1 number required");

//     if (!/[@$!%*?&]/.test(password))
//       errors.push("At least 1 special character required");

//     return errors;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const passwordErrors = validatePassword(password);

//     if (password !== confirmPassword) {
//       passwordErrors.push("Passwords do not match");
//     }

//     if (passwordErrors.length > 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Requirements",
//         html: `
//           <div style="text-align:left;">
//             ${passwordErrors
//               .map((err) => `<p style="margin:6px 0;">• ${err}</p>`)
//               .join("")}
//           </div>
//         `,
//         confirmButtonColor: "#4f46e5",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         name,
//         email,
//         password,
//         role: "employee",
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Registration Successful 🎉",
//         text: "Your account has been created successfully!",
//         confirmButtonColor: "#4f46e5",
//       }).then(() => {
//         navigate("/login");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Registration Failed",
//         text:
//           error.response?.data?.message || "Something went wrong",
//         confirmButtonColor: "#4f46e5",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       <div className="bg-shape shape1"></div>
//       <div className="bg-shape shape2"></div>

//       <form className="register-card" onSubmit={handleRegister}>
//         <h2>Create Account</h2>
//         <p className="subtitle">
//           Register to manage office assets
//         </p>

//         <div className="input-group">
//           <FaUser className="input-icon" />
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

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

//         <div className="input-group">
//           <FaLock className="input-icon" />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) =>
//               setConfirmPassword(e.target.value)
//             }
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <p className="login-link">
//           Already have an account?
//           <Link to="/login"> Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;






import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /*
  ===============================
  TOAST CONFIG (TOP RIGHT POPUP)
  ===============================
  */

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ffffff",
    color: "#111827",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  /*
  ===============================
  PASSWORD VALIDATION
  ===============================
  */

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8)
      errors.push("Minimum 8 characters required");

    if (!/[A-Z]/.test(password))
      errors.push("At least 1 uppercase letter required");

    if (!/[a-z]/.test(password))
      errors.push("At least 1 lowercase letter required");

    if (!/[0-9]/.test(password))
      errors.push("At least 1 number required");

    if (!/[@$!%*?&]/.test(password))
      errors.push("At least 1 special character required");

    return errors;
  };

  /*
  ===============================
  REGISTER FUNCTION
  ===============================
  */

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Toast.fire({
        icon: "warning",
        title: "Please fill all fields",
      });
      return;
    }

    const passwordErrors = validatePassword(password);

    if (password !== confirmPassword) {
      passwordErrors.push("Passwords do not match");
    }

    if (passwordErrors.length > 0) {
      Toast.fire({
        icon: "error",
        title: passwordErrors[0],
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role: "employee",
      });

      Toast.fire({
        icon: "success",
        title: "Registration Successful",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Registration Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>

      <form className="register-card" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <p className="subtitle">
          Register to manage office assets
        </p>

        {/* NAME */}

        <div className="input-group">
          <FaUser className="input-icon" />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        {/* CONFIRM PASSWORD */}

        <div className="input-group">
          <FaLock className="input-icon" />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </div>

        {/* BUTTON */}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN LINK */}

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;