import foto1 from "../assets/foto1.jpeg";
import foto2 from "../assets/foto2.jpeg";
import foto3 from "../assets/foto3.jpeg";
import foto4 from "../assets/foto4.jpeg";

function Gallery() {
  const galeriFoto = [
    { id: 1, src: foto1, judul: "Kegiatan Observasi" },
    { id: 2, src: foto2, judul: "Proyek Sukatani" },
    { id: 3, src: foto3, judul: "Kegiatan Pengabdian" },
    { id: 4, src: foto4, judul: "Proyek iot lingkungan" },
  ];

  return (
    <section id="gallery" className="bg-slate-900 text-white py-20 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block mb-4">
          Galeri Kegiatan
        </h2>
        <p className="text-gray-400 mb-12">Dokumentasi aktivitas perkuliahan dan proyek praktikum.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700/80 group hover:-translate-y-2 transition duration-300"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={foto.src}
                  alt={foto.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <figcaption className="p-4 text-sm font-semibold text-gray-200 bg-slate-800/90">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;