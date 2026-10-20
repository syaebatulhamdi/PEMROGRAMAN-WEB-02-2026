import { useState } from "react";

const menus = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Gallery", "galeri1"],
  ["Contact", "kontak"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const click = (name) => {
    console.log(`NAVBAR Menu "${name}" diklik!`);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="w-full flex items-center justify-between">
        <a 
          href="#home" 
          className="grid place-items-center size-15 rounded-full bg-white text-black font-display border-3 border-black font-bold ml-[20px] mt-[5px] text-2xl"
        >
          A
        </a>

        <div className="flex items-center gap-[300px] mr-2">
          <ul className="hidden md:flex gap-1 rounded-full bg-black/90 backdrop-blur px-3 py-2 text-sm font-bold text-white">
            {menus.map(([name, id]) => (
              <li key={id}>
                <a 
                  href={`#${id}`} 
                  onClick={() => click(name)} 
                  className="block px-4 py-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>

          <a 
            href="#kontak" 
            className="hidden md:block rounded-full bg-white text-black px-8 py-2 text-sm font-extrabold border-2 border-black mr-[20px] text-lg"
          >
            Contact me love~
          </a>

          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden rounded-full bg-black px-4 py-2 text-sm font-bold text-white cursor-pointer"
          >
            {open ? "X" : "☰ Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden mt-3 rounded-2xl bg-black/95 p-3 font-bold text-white">
          {menus.map(([name, id]) => (
            <li key={id}>
              <a 
                href={`#${id}`} 
                onClick={() => click(name)} 
                className="block px-4 py-2 rounded-xl hover:bg-red-600"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}