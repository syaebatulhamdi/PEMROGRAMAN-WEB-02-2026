function Navbar({ jumlahItem, totalHarga }) {
  return (
    <nav className="sticky top-0 z-30 h-16 bg-stone-900/85 text-orange-100 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#atas" className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-bold tracking-tight">
          Kopi Senja
        </a>

        <div className="flex items-center gap-6">
          <a href="#menu" className="hidden font-medium text-orange-100/80 transition hover:text-white sm:block">
            Menu
          </a>
          <a href="#pesan" className="hidden font-medium text-orange-100/80 transition hover:text-white sm:block">
            Pesanan
          </a>
          <a
            href="#pesan"
            className="flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-stone-900 transition hover:brightness-110"
            aria-label={`Lihat pesanan: ${jumlahItem} item, total Rp ${totalHarga.toLocaleString("id-ID")}`}
          >
            <span>{jumlahItem} item</span>
            <span aria-hidden="true">•</span>
            <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
