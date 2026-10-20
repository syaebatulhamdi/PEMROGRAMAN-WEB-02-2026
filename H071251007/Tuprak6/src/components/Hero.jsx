import heroImg from "../assets/hero.png";

export default function Hero() {
  return (
    <section id="home" className="halftone m-3 rounded-3xl bg-[#c0130d] border-4 border-black overflow-hidden">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center px-6 md:px-10 pt-28 pb-14 min-h-[90vh]">
        
        <div className="space-y-6">
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] uppercase drop-shadow-[4px_4px_0_#000] text-white">
            Nurhayu Fiantika Gafar
          </h1>
          <p className="text-lg font-bold text-red-100 max-w-md">
            An Information Systems student building modern, responsive, and stylish web interfaces.
          </p>
          
          <a
            href="#galeri"
            onClick={() => console.log("[HERO] Tombol lihat karya ditekan!")}
            className="inline-flex items-center gap-3 rounded-full bg-white text-black border-4 border-black pl-6 pr-2 py-2 font-extrabold shadow-[5px_5px_0_#000] transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none cursor-pointer"
          >
            Projects
            <span className="grid place-items-center size-10 rounded-full bg-black text-white">↗</span>
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-sm rotate-2 transition-transform duration-500 hover:rotate-0">
          <div className="rounded-2xl border-4 border-black bg-white p-2 shadow-[10px_10px_0_#000] transition-shadow duration-300 hover:shadow-[16px_16px_0_#000]">
            <img src={heroImg} alt="Foto Nurhayu Fiantika Gafar" className="aspect-[3/4] w-full rounded-xl border-2 border-black object-cover" />
          </div>
          
          <span className="absolute -top-5 -left-6 -rotate-6 rounded-[50%] border-4 border-black bg-white px-5 py-2 font-comic text-3xl text-black shadow-[4px_4px_0_#000]">
            HELLO!
          </span>
          <span className="absolute -bottom-4 -right-4 rotate-3 rounded-xl border-2 border-black bg-yellow-400 px-4 py-2 font-black text-black shadow-[3px_3px_0_#000]">
            ★ ACTIVE DEV
          </span>
        </div>

      </div>
    </section>
  );
}