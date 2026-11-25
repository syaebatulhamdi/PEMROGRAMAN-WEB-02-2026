function Skills() {
  const skillList = [
    "HTML & CSS",
    "JavaScript",
    "React.js Framework",
    "Tailwind CSS",
    "Git & GitHub Version Control"
  ];

  return (
    <section id="skills" className="bg-slate-950 text-white py-20 px-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block mb-4">
          Keahlian (Skills)
        </h2>
        <p className="text-gray-400 mb-10">Teknologi dan tools yang telah saya pelajari selama perkuliahan.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {skillList.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 text-gray-200 font-medium py-3 px-6 rounded-2xl shadow-lg border border-slate-800 hover:border-transparent text-sm md:text-base"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;