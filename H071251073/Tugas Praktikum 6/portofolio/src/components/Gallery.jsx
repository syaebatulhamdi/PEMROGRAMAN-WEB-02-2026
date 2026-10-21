import foto1 from '../assets/gallery/kegiatan.jpeg'
import foto2 from '../assets/gallery/projekpertama.jpeg'
import foto3 from '../assets/gallery/tim.jpeg'
import foto4 from '../assets/gallery/hobi.jpeg'

const fotos = [
  { id: 1, src: foto1, alt: 'Kegiatan kampus', caption: 'Kegiatan kampus' },
  { id: 2, src: foto2, alt: 'Proyek pertama', caption: 'Proyek pertama' },
  { id: 3, src: foto3, alt: 'Bersama tim', caption: 'Bersama tim' },
  { id: 4, src: foto4, alt: 'Hobi saya', caption: 'Hobi saya' },
]

function Gallery() {
  return (
    <section id="gallery" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900">Galeri</h2>
        <div className="mt-2 h-1 w-16 rounded bg-amber-400" />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fotos.map((foto) => (
            <figure
              key={foto.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-md"
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <figcaption className="px-4 py-3 text-sm font-medium text-slate-700">
                {foto.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Gallery;