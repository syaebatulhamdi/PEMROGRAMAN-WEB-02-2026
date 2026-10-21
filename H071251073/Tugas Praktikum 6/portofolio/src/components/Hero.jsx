
const sapaan = 'Halo, saya Ayu Anggraini'

const deskripsi =
  'Mahasiswa yang masih menjelajahi dunia teknologi. Masih mencari tahu mau jadi apa nanti. Untuk sekarang, yang penting bukan cuma bisa bilang "Hello World".'

function Hero() {
  return (
    <section
      id="hero"
      className="bg-slate-900 px-5 py-16 text-white sm:py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {sapaan}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            {deskripsi}
          </p>

          <a
            href="#about"
            className="mt-8 inline-block rounded-full bg-amber-400 px-7 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Kenalan Yuk
          </a>
        </div>

        <img
          src="/profil.jpg"
          alt="Foto profil Ayu Anggraini"
          className="h-56 w-56 rounded-full border-4 border-amber-400 object-cover shadow-2xl sm:h-72 sm:w-72"
        />
      </div>
    </section>
  )
}
export default Hero;