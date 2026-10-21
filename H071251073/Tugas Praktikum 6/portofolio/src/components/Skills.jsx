
const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'SQL']

function Skills() {
  return (
    <section id="skills" className="bg-slate-100 px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900">
          Senjata yang Sedang Dipelajari
        </h2>

        <div className="mt-2 h-1 w-16 rounded bg-amber-400" />

        <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
          Saya sedang belajar HTML, CSS, JavaScript, React, dan SQL.
          Masih dalam proses memahami semuanya, karena menulis kode
          dan memahami kode sendiri ternyata dua cabang olahraga
          yang berbeda.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 shadow-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export default Skills;