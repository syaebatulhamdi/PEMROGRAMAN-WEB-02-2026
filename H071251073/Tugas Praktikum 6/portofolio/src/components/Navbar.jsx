
const logo = 'Ayu Anggraini'

const menus = [
  { id: 1, label: 'Beranda', href: '#hero' },
  { id: 2, label: 'Tentang Saya', href: '#about' },
  { id: 3, label: 'Keahlian', href: '#skills' },
  { id: 4, label: 'Galeri', href: '#gallery' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-3 sm:flex-row sm:justify-between">
        <a
          href="#hero"
          className="text-xl font-bold tracking-tight text-amber-400"
        >
          {logo}
        </a>

        <ul className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href} 
                onClick={() => console.log(menu.label)}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-amber-400 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                {menu.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
export default Navbar;