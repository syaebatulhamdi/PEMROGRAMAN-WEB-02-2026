import profileImg from "../assets/profile.jpg";

function Hero() {
  const handleButtonClick = () => {
    console.log("Tombol 'Jelajahi Profil' di Hero diklik!");
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-indigo-500/30">
            Selamat Datang di Portofolio Saya
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Hai, Saya <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Chereen Bunga</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            Mahasiswa sisfo yang antusias mempelajari pengembangan antarmuka web modern, interaktif, dan responsif.
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            Jelajahi Profil
          </button>
        </div>
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden border-4 border-indigo-500/50 shadow-2xl shadow-indigo-500/20 rotate-3 hover:rotate-0 transition duration-300">
          <img
            src={profileImg}
            alt="Foto Profil"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;