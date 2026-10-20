import profil from '../assets/foto-profil.jpeg'

function Hero() {
  const banner = ['PORTOFOLIO', 'PORTOFOLIO', 'PORTOFOLIO']
  const sapaan = 'Halo semuanya,'
  const perkenalan = 'Aku Aura!'
  const deskripsi =
    'Saya suka membangun aplikasi dan website yang rapi, mudah dipakai, dan nyaman dilihat. Saat ini saya belajar pengembangan perangkat lunak, desain UI/UX, dan jaringan komputer.'

  const tagList = [
    { id: 1, teks: 'Mahasiswa Sistem Informasi' },
    { id: 2, teks: 'Universitas Hasanuddin' },
  ]

  const handleClick = () => {
    console.log('Kenal aku lebih jauh')
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="scroll-mt-26 sm:scroll-mt-18">
      <div aria-hidden="true" className="overflow-hidden bg-lime-900 py-6 text-center">
        {banner.map((tulisan, index) => (
          <p
            key={index}
            className={`font-[family-name:Playfair_Display,serif] text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-9xl ${
              index === 0
                ? 'text-amber-50'
                : 'text-transparent [-webkit-text-stroke:1.5px_var(--color-amber-400)]'
            }`}
          >
            {tulisan}
          </p>
        ))}
      </div>

      <div className="bg-amber-50 text-stone-950">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-14 md:grid-cols-2 md:py-20">
          <div className="text-center md:text-left">
            <h1 className="font-[family-name:Playfair_Display,serif] text-6xl font-black leading-[1.02] tracking-tight sm:text-7xl">
              {sapaan}
              <br />
              {perkenalan}
              <span aria-hidden="true" className="ml-2 text-4xl text-orange-500">
                &#10022;
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-stone-700 md:mx-0">
              {deskripsi}
            </p>
            <button
              type="button"
              onClick={handleClick}
              className="mt-8 rounded-full bg-orange-500 px-8 py-3.5 text-base font-bold text-stone-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
            >
              Lihat tentang saya
            </button>
          </div>

          <div className="relative mx-auto mb-8 w-72 sm:w-80">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-orange-500" />
            <div className="relative bg-lime-900 p-3">
              <img
                src={profil}
                alt="Foto profil Aura"
                className="h-96 w-full object-cover"
              />
            </div>

            <ul className="absolute -left-6 top-10 flex flex-col items-start gap-3">
              {tagList.map((tag) => (
                <li
                  key={tag.id}
                  className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-stone-950 shadow-md"
                >
                  {tag.teks}
                </li>
              ))}
            </ul>

            <div className=" rounded absolute -bottom-13 -right-5 px-5 py-4">
              <span aria-hidden="true" className="ml-2 text-3xl text-amber-500">
                &#10022; &#10022; &#10022;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Hero