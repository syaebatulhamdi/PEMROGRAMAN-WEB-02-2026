function About() {
  const biodata = [
    { id: 1, label: "Nama Lengkap", value: "Chereen Bunga C Ramba" },
    { id: 2, label: "Jurusan / Prodi", value: "Sistem Informasi" },
    { id: 3, label: "Kampus", value: "Universitas Hasanuddin" },
    { id: 4, label: "Status", value: "Mahasiswa Aktif" },
  ];

  return (
    <section id="about" className="bg-slate-900 text-white py-20 px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block">
            Tentang Saya
          </h2>
          <p className="text-gray-400 mt-2">Mengenal saya lebih dekat melalui latar belakang akademik.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/60 p-8 rounded-2xl shadow-lg space-y-4">
            <h3 className="text-xl font-semibold text-indigo-300">Biodata Singkat</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Saya memiliki ketertarikan tinggi pada dunia pemrograman khususnya pembuatan Single Page Application (SPA) menggunakan React dan styling berbasis utility-first seperti Tailwind CSS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {biodata.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 hover:border-indigo-500/50 transition shadow-md"
              >
                <span className="text-cyan-400 font-medium text-xs uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <span className="text-gray-100 font-semibold text-base">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;