function Skills() {
  const keahlian = [
    'HTML & CSS',
    'JavaScript',
    'Tailwind CSS',
    'Java (OOP)',
    'Desain UI/UX',
    'Gradle'
  ]

  return (
    <section
      id="skills"
      className="scroll-mt-26 bg-amber-50 py-16 text-stone-950 sm:scroll-mt-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <p
          aria-hidden="true"
          className="font-[family-name:Playfair_Display] text-6xl font-black uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-orange-500)] sm:text-8xl"
        >
          Skills
        </p>
        <h2 className="mt-2 font-[family-name:Playfair_Display] text-4xl font-black tracking-tight sm:text-5xl">
          Keahlian
          <span aria-hidden="true" className="ml-2 text-3xl text-orange-500">
            &#10022;
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-stone-700">
          Teknologi dan bidang yang saya pelajari dan gunakan dalam tugas serta proyek kuliah.
        </p>

        <ul className="mt-9 flex flex-wrap gap-3">
          {keahlian.map((s, index) => (
            <li
              key={index}
              className="flex items-center gap-2 rounded-full bg-stone-950 px-5 py-2.5 text-base font-bold text-amber-50"
            >
              <span aria-hidden="true" className="text-orange-400">
                &#10022;
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


export default Skills