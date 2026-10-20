const skills = [
  ["HTML, CSS & Tailwind", "Creating a neat, responsive, and consistent web layout."],
  ["JavaScript & React.js", "Creating a neat, responsive, and consistent web layout."],
  ["Python & Data", "Processing and analyzing data with efficient scripts."],
  ["Java & OOP", "Designing structured programs with object oriented principles."],
  ["PostgreSQL & SQLite", "Designing and managing databases for applications."],
  ["Saya Imo", "Achieving the highest rank in Mobile Legends and becoming a skilled roamer. BEEP BEEP roamer jago mau lewat!"]
];

export default function Skills() {
  return (
    <section id="skills" className="m-3 rounded-3xl bg-[#1b1819] px-6 md:px-10 py-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_1.7fr] gap-12 items-start">
        
        <div className="space-y-6">
          <h2 className="font-display text-4xl md:text-5xl uppercase leading-tight text-white">
            Skills <span className="text-[#c0130d]">&amp; Expertise</span>
          </h2>
          <p className="text-neutral-300 max-w-sm">
            The technical skills I mastered during college and practical projects.
          </p>
          <a href="#galeri" className="inline-flex items-center gap-3 rounded-full bg-[#c0130d] pl-6 pr-2 py-2 font-extrabold text-white">
            Projects
            <span className="grid place-items-center size-9 rounded-full bg-white text-black">↗</span>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map(([title, desc], i) => (
            <div 
              key={title} 
              className={`relative rounded-2xl bg-neutral-100 p-6 text-neutral-900 border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-[6px_6px_0_#fff] cursor-pointer ${
                i >= 4 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="absolute top-4 right-4 grid place-items-center size-7 rounded-full bg-red-700 text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-display text-lg uppercase pr-8 leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}