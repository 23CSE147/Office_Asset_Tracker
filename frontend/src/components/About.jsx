// import "./about.css";

// function About() {
//   return (
//     <section id="about" className="about">

//       <div className="about-container">

//         <div className="about-image">
//           <img
//             src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
//             alt="Office Management"
//           />
//         </div>

//         <div className="about-content">
//           <span className="section-tag">About Us</span>

//           <h2>Transforming Asset Management For Modern Organizations</h2>

//           <p>
//             AssetTrack is a centralized platform designed to simplify
//             office asset tracking, employee assignments, and audit
//             transparency. Our system ensures accountability,
//             security, and operational efficiency.
//           </p>

//           <div className="about-highlights">
//             <div>
//               <h4>✔ Real-Time Monitoring</h4>
//               <p>Track assets across departments instantly.</p>
//             </div>

//             <div>
//               <h4>✔ Complete Audit Trails</h4>
//               <p>Maintain full lifecycle history of every asset.</p>
//             </div>

//             <div>
//               <h4>✔ Scalable Infrastructure</h4>
//               <p>Designed for startups and enterprises alike.</p>
//             </div>
//           </div>

//           <div className="about-stats">
//             <div>
//               <h3>5+</h3>
//               <p>Years Experience</p>
//             </div>
//             <div>
//               <h3>300+</h3>
//               <p>Organizations</p>
//             </div>
//             <div>
//               <h3>99%</h3>
//               <p>Client Satisfaction</p>
//             </div>
//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default About;



import "./about.css";
// import aboutImg from "../assets/about.jpg"; // optional if you add local image

function About() {
  return (
    <section id="about" className="about">

      <div className="about-container">

        {/* LEFT IMAGE */}
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            alt="Office Asset Management"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-content">

          <span className="section-badge">About AssetTrack</span>

          <h2>
            Transforming Office Asset Management
            For Modern Organizations
          </h2>

          <p>
            AssetTrack is a centralized platform designed to simplify 
            office asset tracking, employee assignments, maintenance 
            scheduling, and audit transparency. Our system ensures 
            accountability, security, and operational efficiency.
          </p>

          <div className="about-highlights">

            <div className="highlight-item">
              <h4>✔ Real-Time Monitoring</h4>
              <p>Track assets across departments instantly.</p>
            </div>

            <div className="highlight-item">
              <h4>✔ Complete Audit Trails</h4>
              <p>Maintain full lifecycle history of every asset.</p>
            </div>

            <div className="highlight-item">
              <h4>✔ Scalable Infrastructure</h4>
              <p>Built for startups, enterprises, and growing teams.</p>
            </div>

          </div>

          <div className="about-stats">

            <div>
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>

            <div>
              <h3>300+</h3>
              <p>Organizations</p>
            </div>

            <div>
              <h3>99%</h3>
              <p>Client Satisfaction</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
