import foto1 from '../assets/proyek-maber.jpeg'
import foto2 from '../assets/proyek-growseeds.jpeg'
import foto3 from '../assets/foto-osis2.jpeg'
import foto4 from '../assets/foto-acid.jpeg'
import foto5 from '../assets/foto-gambar.jpeg'

function Gallery() {
  const fotoList = [
    { id: 1, src: foto1, judul: 'Project Praktikum MABER' },
    { id: 2, src: foto2, judul: 'Project Praktikum GrowSeeds' },
    { id: 3, src: foto3, judul: 'Ketua Panitia OSIS' },
    { id: 4, src: foto4, judul: 'Keluarga Bahagia Acid' },
    { id: 5, src: foto5, judul: 'Gambar gabut' },
  ]

  const aturUkuran = (event) => {
    const jalur = event.currentTarget
    const pusat = jalur.scrollLeft + jalur.clientWidth / 2

    jalur.querySelectorAll('li').forEach((kartu) => {
      const tengahKartu = kartu.offsetLeft + kartu.offsetWidth / 2
      const rasio = Math.min(Math.abs(pusat - tengahKartu) / (kartu.offsetWidth + 24), 1)
      kartu.style.transform = `scale(${1 - rasio * 0.4})`
      kartu.style.opacity = 1 - rasio * 0.45
    })
  }

  const geser = (arah) => {
    const jalur = document.getElementById('jalur-galeri')
    const kartu = jalur?.querySelector('li')
    if (!jalur || !kartu) return
    jalur.scrollBy({ left: arah * (kartu.offsetWidth + 24), behavior: 'smooth' })
  }

  return (
    <section
      id="gallery"
      className="scroll-mt-26 bg-stone-950 py-16 text-amber-50 sm:scroll-mt-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <p
          aria-hidden="true"
          className="font-[family-name:Playfair_Display,serif] text-6xl font-black uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-amber-400)] sm:text-8xl"
        >
          Gallery
          <span aria-hidden="true" className="ml-2 text-3xl text-orange-400">
            &#10022;
          </span>
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-base font-medium text-amber-100">
          </p>
        </div>
      </div>

      <ul
        id="jalur-galeri"
        onScroll={aturUkuran}
        className="relative mt-4 flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-[calc(50%-8rem)] py-8 [scrollbar-width:none] sm:px-[calc(50%-10rem)] [&::-webkit-scrollbar]:hidden"
      >
        {fotoList.map((foto, index) => (
          <li
            key={foto.id}
            className={`w-64 shrink-0 snap-center sm:w-80 ${
              index === 0 ? '' : 'opacity-55 [transform:scale(0.6)]'
            }`}
          >
            <figure className="overflow-hidden rounded-xl border-4 border-amber-50 bg-amber-50 shadow-xl shadow-black/50">
              <img
                src={foto.src}
                alt={foto.judul}
                className="aspect-1/1 w-full rounded-md object-cover"
              />
              <figcaption className="flex items-center justify-between gap-3 px-3 py-3 text-stone-950">
                <span className="font-[family-name:Playfair_Display,serif] text-lg font-bold">
                  {foto.judul}
                </span>
                <span className="rounded-full bg-orange-400 px-2.5 py-0.5 text-xs font-bold">
                  0{foto.id}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default Gallery