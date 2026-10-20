function About() {
  const perkenalan = [
    'Kenalin aku Aura, mahasiswa Sistem Informasi di Universitas Hasanuddin. Saya tertarik pada Desain UI/UX.',
    'Di perkuliahan, saya mengerjakan proyek seperti aplikasi desktop berbasis Java, website destinasi wisata, dan website UMKM. Dari situ saya belajar bahwa kode yang baik harus rapi dan tampilan harus mudah dipahami.',
  ]

  const dataDiri = [
    { id: 1, label: 'Nama', value: 'Aura Resky Ramadhani' },
    { id: 2, label: 'Kampus', value: 'Universitas Hasanuddin' },
    { id: 3, label: 'Program studi', value: 'Sistem Informasi' },
    { id: 4, label: 'Minat', value: 'Manajemen Sistem Informasi' },
  ]

  return (
    <section
      id="about"
      className="scroll-mt-26 bg-lime-900 py-16 text-amber-50 sm:scroll-mt-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-[family-name:Playfair_Display,serif] text-4xl font-black tracking-tight text-amber-400 sm:text-5xl">
          Tentang saya
        </h2>

        <div className="mt-12 grid gap-14 md:grid-cols-2 md:items-start">
          {/* Bagian Data Diri */}
          <ul className="ml-3 space-y-8 border-l-2 border-orange-400">
            {dataDiri.map((item) => (
              <li key={item.id} className="relative pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-3 top-0 bg-lime-900 text-2xl leading-none text-orange-400"
                >
                  &#10022;
                </span>
                <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
                  {item.label}
                </p>
                <p className="font-[family-name:Playfair_Display,serif] text-2xl font-bold">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>

          <div className="relative">
            
            <div className="rounded absolute -left-7 -top-10 px-5 py-4 z-10">
              <span aria-hidden="true" className="ml-2 text-5xl text-white drop-shadow-md">
                &#10022;
              </span>
            </div>
            <div className="bg-amber-400 p-7 text-stone-950 sm:p-9 rounded-3xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-500/20">
              <h3 className="font-['unbounded'] text-3xl font-black">
                Halo Semuanya!
              </h3>
              <div className="mt-4 space-y-4 text-lg font-medium leading-relaxed">
                {perkenalan.map((paragraf, index) => (
                  <p key={index}>{paragraf}</p>
                ))}
              </div>
            </div>

            <div className="rounded absolute -bottom-10 -right-4 px-5 py-4 z-10">
              <span aria-hidden="true" className="ml-2 text-5xl text-white drop-shadow-md">
                &#10022;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About