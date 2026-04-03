// // import "./hero.css";

// // function Hero() {
// //   return (
// //     <section id="hero" className="hero">

// //       <div className="hero-content">

// //         <div className="hero-text">
// //           <span className="hero-tag">Enterprise Asset Solution</span>

// //           <h1>
// //             Smart & Secure
// //             <br />
// //             Office Asset Management
// //           </h1>

// //           <p>
// //             Centralize your asset tracking, assignment, maintenance,
// //             and auditing in one powerful system designed for modern
// //             organizations.
// //           </p>

// //           <div className="hero-buttons">
// //             <button className="hero-btn primary">
// //               Get Started
// //             </button>

// //             <button className="hero-btn secondary">
// //               Learn More
// //             </button>
// //           </div>

// //           <div className="hero-stats">
// //             <div>
// //               <h3>500+</h3>
// //               <p>Assets Managed</p>
// //             </div>
// //             <div>
// //               <h3>200+</h3>
// //               <p>Employees</p>
// //             </div>
// //             <div>
// //               <h3>99.9%</h3>
// //               <p>System Uptime</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="hero-image">
// //           <img
// //             src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
// //             alt="Office Dashboard"
// //           />

// //           <div className="floating-card">
// //             <p>✔ Asset Assigned Successfully</p>
// //           </div>
// //         </div>

// //       </div>

// //     </section>
// //   );
// // }

// // export default Hero;



// import "./hero.css";

// function Hero() {
//   return (
//     <section id="hero" className="hero">

//       <div className="hero-content">

//         <div className="hero-text">
//           <span className="hero-tag">Enterprise Asset Solution</span>

//           <h1>
//             Smart & Secure
//             <br />
//             Office Asset Management
//           </h1>

//           <p>
//             Centralize your asset tracking, assignment, maintenance,
//             and auditing in one powerful system designed for modern
//             organizations.
//           </p>

//           <div className="hero-buttons">
//             <button className="hero-btn primary">
//               Get Started
//             </button>

//             <button className="hero-btn secondary">
//               Learn More
//             </button>
//           </div>

//           <div className="hero-stats">
//             <div>
//               <h3>500+</h3>
//               <p>Assets Managed</p>
//             </div>
//             <div>
//               <h3>200+</h3>
//               <p>Employees</p>
//             </div>
//             <div>
//               <h3>99.9%</h3>
//               <p>System Uptime</p>
//             </div>
//           </div>
//         </div>

//         <div className="hero-image">
//           <img
//             src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
//             alt="Office Dashboard"
//           />

//           <div className="floating-card">
//             <p>✔ Asset Assigned Successfully</p>
//           </div>
//         </div>

//       </div>

//     </section>
//   );
// }

// export default Hero;



import "./hero.css";

function Hero() {
  return (
    <section id="hero" className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <span className="hero-badge">
            Enterprise Asset Solution
          </span>

          <h1>
            Smart & Secure <br />
            Office Asset Management
          </h1>

          <p>
            Centralize asset tracking, assignment, maintenance,
            and auditing in one powerful platform built for
            modern organizations.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <span>Assets Managed</span>
            </div>

            <div>
              <h3>200+</h3>
              <span>Employees</span>
            </div>

            <div>
              <h3>99.9%</h3>
              <span>System Uptime</span>
            </div>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            alt="Office Dashboard"
          />

          <div className="floating-card">
            ✔ Asset Assigned Successfully
          </div>
        </div>

      </div>

    </section>
  );                        
}

export default Hero;
