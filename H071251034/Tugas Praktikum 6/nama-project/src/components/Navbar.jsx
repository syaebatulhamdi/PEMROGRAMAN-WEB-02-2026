function Navbar() {
  const nama = 'Aura'

  const menus = [
    { id: 1, label: 'Home', href: '#home', sorot: false },
    { id: 2, label: 'About', href: '#about', sorot: false },
    { id: 3, label: 'Skills', href: '#skills', sorot: false },
    { id: 4, label: 'Gallery', href: '#gallery', sorot: false },
  ]

  return (
    <header className="sticky top-0 z-50 border-b-2 border-stone-950 bg-amber-50/95 text-stone-950 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-3 sm:flex-row sm:justify-between">
        <a href="#beranda" className="flex items-center gap-2">
          <span aria-hidden="true" className="text-2xl text-orange-500">
            &#10022;
          </span>
          <span className="font-['unbounded'] text-2xl font-bold tracking-tight">
            {nama}
          </span>
        </a>

        <ul className="font-['unbounded'] flex items-center gap-1 sm:gap-2">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => console.log(menu.label)}
                className={`rounded-full px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-orange-500 sm:px-4 ${
                  menu.sorot
                    ? 'bg-orange-500 hover:bg-amber-400'
                    : 'hover:bg-stone-950 hover:text-amber-50'
                }`}
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

export default Navbar