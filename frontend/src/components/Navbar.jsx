// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";

// import "./navbar.css";

// function Navbar() {
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   const userName = localStorage.getItem("userName");

//   const [showMenu, setShowMenu] = useState(false);

//   const [scrolled, setScrolled] = useState(false);

//   const dropdownRef = useRef();

//   /*
// =====================
// SCROLL EFFECT
// =====================
// */

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   /*
// =====================
// CLICK OUTSIDE CLOSE
// =====================
// */

//   useEffect(() => {
//     const closeMenu = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", closeMenu);

//     return () => document.removeEventListener("mousedown", closeMenu);
//   }, []);

//   /*
// =====================
// SCROLL SECTION
// =====================
// */

//   const scrollTo = (id) => {
//     const section = document.getElementById(id);

//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   /*
// =====================
// LOGOUT
// =====================
// */

//   const logout = () => {
//     localStorage.clear();

//     navigate("/");
//   };

//   return (
//     <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
//       <div className="navbar-container">
//         {/* LEFT */}

//         <div className="navbar-left">
//           <h2 className="logo" onClick={() => scrollTo("hero")}>
//             AssetTrack
//           </h2>

//           <ul className="nav-links">
//             <li onClick={() => scrollTo("hero")}>Home</li>

//             <li onClick={() => scrollTo("features")}>Features</li>

//             <li onClick={() => scrollTo("about")}>About</li>

//             <li onClick={() => scrollTo("contact")}>Contact</li>
//           </ul>
//         </div>

//         {/* RIGHT */}

//         <div className="navbar-right">
//           {token ? (
//             <div className="profile-area" ref={dropdownRef}>
//               {/* AVATAR */}

//               <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
//                 {userName?.charAt(0).toUpperCase()}
//               </div>

//               {/* DROPDOWN */}

//               {showMenu && (
//                 <div className="dropdown">
//                   <p>👤 {userName}</p>

//                   <button onClick={() => navigate("/dashboard")}>
//                     Dashboard
//                   </button>

//                   <button onClick={logout} className="logout">
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <button
//                 className="nav-login-btn"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>

//               <button
//                 className="nav-start-btn"
//                 onClick={() => navigate("/register")}
//               >
//                 Get Started
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;









import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef();

  /*
  =====================
  SCROLL EFFECT
  =====================
  */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
  =====================
  CLICK OUTSIDE CLOSE
  =====================
  */
  useEffect(() => {
    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  /*
  =====================
  SCROLL SECTION
  =====================
  */
  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  /*
  =====================
  PROFESSIONAL LOGOUT
  =====================
  */
  const logout = () => {
    // remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    // toast notification
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    // redirect to login
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* LEFT */}
        <div className="navbar-left">
          <h2 className="logo" onClick={() => scrollTo("hero")}>
            AssetTrack
          </h2>

          <ul className="nav-links">
            <li onClick={() => scrollTo("hero")}>Home</li>
            <li onClick={() => scrollTo("features")}>Features</li>
            <li onClick={() => scrollTo("about")}>About</li>
            <li onClick={() => scrollTo("contact")}>Contact</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {token ? (
            <div className="profile-area" ref={dropdownRef}>
              {/* AVATAR */}
              <div
                className="avatar"
                onClick={() => setShowMenu(!showMenu)}
              >
                {userName?.charAt(0).toUpperCase()}
              </div>

              {/* DROPDOWN */}
              {showMenu && (
                <div className="dropdown">
                  <p>👤 {userName}</p>

                  <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </button>

                  <button onClick={logout} className="logout">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="nav-login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="nav-start-btn"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;