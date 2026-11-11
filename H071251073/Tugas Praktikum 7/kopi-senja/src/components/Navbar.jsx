function Navbar({ kategoriAktif, onKategoriClick, jumlahPesanan, totalHarga }) {
  const daftarKategori = [
    { id: 1, nama: "Semua" },
    { id: 2, nama: "Kopi" },
    { id: 3, nama: "Non-Kopi" },
    { id: 4, nama: "Makanan" },
  ];

  return (
    <nav className="sticky top-0 z-10 bg-amber-900 text-amber-50 shadow">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">☕ Kedai Kopi Senja</h1>

        <ul className="flex flex-wrap gap-2">
          {daftarKategori.map((item) => (
            <li
              key={item.id}
              className={
                item.nama === kategoriAktif
                  ? "cursor-pointer rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-900"
                  : "cursor-pointer rounded-full border border-amber-200/50 px-4 py-1.5 text-sm hover:bg-amber-800"
              }
              onClick={() => onKategoriClick(item.nama)}
            >
              {item.nama}
            </li>
          ))}
        </ul>

        <p className="text-sm">
          <span className="font-semibold">{jumlahPesanan}</span> item ·{" "}
          <span className="font-semibold">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
