// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Features from "../components/Features";
// import About from "../components/About";
// import Contact from "../components/Contact";
// import Footer from "../components/Footer";

// function Home() {
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <Features />
//       <About />
//       <Contact />
//       <Footer />
//     </div>
//   );
// }

// export default Home;








import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />

      <main className="home-content">
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
