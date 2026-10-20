// Daftar kemampuan disimpan dalam array
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "UI/UX Design",
  "Database",
];

// Warna untuk setiap skill
const warnaSkill = [
  "bg-[#FCE7F3] text-[#BE185D] border-[#F9A8D4]",
  "bg-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD]",
  "bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]",
  "bg-[#EDE9FE] text-[#6D28D9] border-[#C4B5FD]",
  "bg-[#D1FAE5] text-[#047857] border-[#86EFAC]",
  "bg-[#FFE4E6] text-[#BE123C] border-[#FDA4AF]",
];

// Komponen Skills
function Skills() {
  return (
    <section
      id="skills"
      className="bg-gradient-to-br from-[#EDE9FE] via-[#FDF2F8] to-[#DBEAFE] px-6 py-24"
    >

      <div className="mx-auto max-w-6xl">

        {/* Judul */}
        <div className="mb-12 text-center">

          <p className="font-bold text-[#8B5CF6]">
             Kemampuan
          </p>

          <h2 className="mt-2 text-4xl font-black text-[#312E81]">
            My Skills
          </h2>

          <p className="mt-3 text-[#6B6475]">
            Beberapa kemampuan yang sedang saya kembangkan.
          </p>

        </div>

        {/* Skills dari array */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">

          {skills.map((skill, index) => (
            <div
              key={index}
              className={`rounded-3xl border-2 p-7 text-center shadow-md transition hover:-translate-y-2 hover:shadow-lg ${warnaSkill[index]}`}
            >

              <h3 className="text-xl font-black">
                {skill}
              </h3>

              <p className="mt-2 text-sm opacity-75">
                Skill yang sedang dipelajari
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Skills;