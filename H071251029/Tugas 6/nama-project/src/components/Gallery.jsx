// Mengimpor foto dari folder src/assets/gallery
import foto1 from "../assets/project.jpeg";
import foto2 from "../assets/pekael.jpeg";
import foto3 from "../assets/pkl.jpeg";
import foto4 from "../assets/acid.jpeg";

// Data foto disimpan dalam array of object
const fotoGallery = [
  {
    id: 1,
    src: foto1,
    title: "Project Miniverse",
    warna: "bg-[#FCE7F3]",
  },
  {
    id: 2,
    src: foto2,
    title: "Kegiatan Selama Pkl",
    warna: "bg-[#EDE9FE]",
  },
  {
    id: 3,
    src: foto3,
    title: "Membuat   Logbook Pkl",
    warna: "bg-[#DBEAFE]",
  },
  {
    id: 4,
    src: foto4,
    title: "Keluarga Acid",
    warna: "bg-[#D1FAE5]",
  },
];

// Komponen Gallery
function Gallery() {
  return (
    <section id="gallery" className="bg-white px-6 py-24">

      <div className="mx-auto max-w-6xl">

        {/* Judul */}
        <div className="mb-12 text-center">

          <p className="font-bold text-[#EC4899]">
            Galeri
          </p>

          <h2 className="mt-2 text-4xl font-black text-[#312E81]">
            My Gallery
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#6B6475]">
            Beberapa dokumentasi kegiatan dan project yang pernah saya kerjakan.
          </p>

        </div>

        {/* Gallery menggunakan map */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {fotoGallery.map((foto) => (
            <div
              key={foto.id}
              className={`overflow-hidden rounded-3xl p-2 shadow-md transition hover:-translate-y-2 hover:shadow-xl ${foto.warna}`}
            >

              <img
                src={foto.src}
                alt={foto.title}
                className="h-64 w-full rounded-2xl object-cover"
              />

              <div className="px-3 py-4">

                <h3 className="font-bold text-[#312E81]">
                  {foto.title}
                </h3>

                <p className="mt-1 text-sm text-[#6B6475]">
                  Dokumentasi portfolio
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Gallery;