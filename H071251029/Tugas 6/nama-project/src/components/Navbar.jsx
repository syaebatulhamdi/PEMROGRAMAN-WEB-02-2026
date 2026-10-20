// Data menu disimpan dalam array
const menu = [
  {
    id: 1,
    nama: "Home",
    tujuan: "#home",
  },
  {
    id: 2,
    nama: "About",
    tujuan: "#about",
  },
  {
    id: 3,
    nama: "Skills",
    tujuan: "#skills",
  },
  {
    id: 4,
    nama: "Gallery",
    tujuan: "#gallery",
  },
];

// Komponen Navbar
function Navbar() {
  // Fungsi untuk mengetahui menu yang diklik
  const handleMenuClick = (namaMenu) => {
    console.log("Menu yang diklik:", namaMenu);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-purple-100 bg-white/95 shadow-md backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo / nama */}
        <a
          href="#home"
          onClick={() => handleMenuClick("Home")}
          className="text-2xl font-black text-[#8B5CF6]"
        >
          Talis<span className="text-[#EC4899]"></span>
        </a>

        {/* Menu dari array menggunakan map */}
        <ul className="flex gap-1 sm:gap-3">
          {menu.map((item) => (
            <li key={item.id}>
              <a
                href={item.tujuan}
                onClick={() => handleMenuClick(item.nama)}
                className="rounded-full px-3 py-2 font-semibold text-[#374151] transition hover:bg-[#E9D5FF] hover:text-[#7C3AED] sm:px-4"
              >
                {item.nama}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;