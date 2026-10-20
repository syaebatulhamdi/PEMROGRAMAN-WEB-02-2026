import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Contact from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="font-sans text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Gallery />
      <Contact />
    </div>
  );
}
