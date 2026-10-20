import aboutBg from "../assets/about.png";

const bio = [
  ["Name", "Nurhayu Fiantika Gafar"],
  ["Nickname", "Ayu / Yuyu"],
  ["Music Fav", "Multo - Cup of Joe"],
  ["Major", "System Information"],
  ["Hobby", "Reading comics and playing Mobile Legends"],
  ["Fun Fact", "I can stay up all day just because of push rank"],
];

const offsets = ["md:mr-12", "md:ml-12", "md:mr-4", "md:ml-16", "md:mr-10", "md:ml-6"];

export default function About() {
  return (
    <section id="about" className="halftone m-3 rounded-3xl border-4 border-black px-6 md:px-10 py-20 text-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none" 
        style={{ backgroundImage: `url(${aboutBg})` }} 
      />

      <div className="relative mx-auto max-w-6xl grid md:grid-cols-[1fr_1.3fr] gap-12 items-center mr-23">
        <div className="space-y-6">
        </div>
        <div className="space-y-4">
          {bio.map(([label, value], i) => {
            const isFunFact = label === "Fun Fact";
            return (
              <div 
                key={label} 
                className={`flex items-center justify-between gap-4 rounded-2xl border-2 border-black px-6 py-5 cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${offsets[i]} ${
                  isFunFact ? "bg-red-700 text-white" : "bg-white text-neutral-900"
                }`}
              >
                <h3 className="font-display text-lg uppercase w-28 shrink-0">{label}</h3>
                <p className="text-lg font-bold text-right pr-5">{value}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}