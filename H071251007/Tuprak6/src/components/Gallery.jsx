import img1 from "../assets/karya1.png";
import img2 from "../assets/karya2.png";
import img3 from "../assets/karya3.png";
import img4 from "../assets/karya4.png";

const items = [
  { src: img1, title: "Smart Task Organizer", cat: "Logic Design", bg: "bg-purple-300", tilt: "-rotate-2", bubble: "bg-yellow-300" },
  { src: img2, title: "Libraria", cat: "Simple Application", bg: "bg-yellow-300", tilt: "rotate-1 md:mt-12", bubble: "bg-pink-300" },
  { src: img3, title: "Beauty Match", cat: "Java Design", bg: "bg-lime-300", tilt: "rotate-2", bubble: "bg-sky-200" },
  { src: img4, title: "Yurosé Flower Shop UI", cat: "Web Design", bg: "bg-sky-300", tilt: "-rotate-1 md:mt-12", bubble: "bg-orange-200" },
];

export default function Gallery() {
  return (
    <section id="galeri" className="m-3 rounded-3xl border-4 border-black bg-[#f6efdc] px-6 md:px-10 py-20 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto mb-16 w-fit">
          <span className="absolute -top-5 left-6 border-4 border-black bg-lime-400 px-4 font-comic text-xl tracking-wider">PORTFOLIO</span>
          <div className="relative border-4 border-black bg-white px-8 py-5 font-comic text-5xl md:text-7xl -skow-x-6 tracking-wide">
            MY <span className="text-red-600">PROJECTS</span>
          </div>
          <span className="absolute -right-8 -top-6 text-4xl text-yellow-400 [-webkit-text-stroke:2px_#000]">★</span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
          {items.map((it) => (
            <figure 
              key={it.title} 
              className={`relative ${it.tilt} transition-all duration-300 hover:rotate-0 hover:scale-[1.02] cursor-pointer`}
            >
              <div className={`halftone border-4 border-black p-4 pt-3 shadow-[8px_8px_0_#000] transition-shadow duration-300 hover:shadow-[14px_14px_0_#000] ${it.bg}`}>
                <div className="mb-3 flex items-center gap-2">
                  <i className="size-3.5 rounded-full border-2 border-black bg-red-500" />
                  <i className="size-3.5 rounded-full border-2 border-black bg-blue-500" />
                  <i className="size-3.5 rounded-full border-2 border-black bg-lime-400" />
                  <span className="ml-1 font-comic tracking-wider">{it.cat}</span>
                </div>
                <img src={it.src} alt={it.title} className="aspect-[4/3] w-full border-2 border-black bg-white object-contain" />
              </div>
              <figcaption className={`absolute -bottom-5 right-4 rotate-2 rounded-2xl border-4 border-black px-4 py-1 font-comic text-xl md:text-2xl tracking-wide ${it.bubble}`}>
                {it.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}