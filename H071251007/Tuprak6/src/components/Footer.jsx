import contactImg from "../assets/footer.png";

const links = [
  ["GitHub", "https://github.com"],
  ["LinkedIn", "https://linkedin.com"],
  ["Email", "mailto:h071251007@student.unhas.ac.id"],
];

export default function Contact() {
  return (
    <section id="kontak" className="relative m-3 min-h-[600px] overflow-hidden rounded-3xl border-4 border-black bg-[#c0130d]">
      <img
        src={contactImg}
        alt="Ilustrasi pop-art"
        className="absolute right-0 top-0 h-full w-full object-cover object-right opacity-40 md:w-[55%] md:opacity-100 [mask-image:linear-gradient(to_right,transparent,black_45%)]"
      />
      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-center gap-8 px-6 md:px-10 py-16">
        <h2 className="-rotate-3 font-comic text-7xl italic leading-none md:text-9xl [paint-order:stroke_fill] [-webkit-text-stroke:6px_#000] drop-shadow-[5px_5px_0_#000]">
          CONTACT<br />ME
        </h2>
        <p className="max-w-md font-medium text-red-50">
          Interested in collaborating or just want to connect? Follow me on{" "}
          {links.map(([name, href], i) => (
            <span key={name}>
              <a href={href} target="_blank" rel="noreferrer" className="underline hover:text-black">{name}</a>
              {i < links.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p className="text-sm font-bold uppercase tracking-wider text-red-100">
          &copy; {new Date().getFullYear()} Nurhayu Fiantika Gafar (H071251007)
        </p>
      </div>
    </section>
  );
}
