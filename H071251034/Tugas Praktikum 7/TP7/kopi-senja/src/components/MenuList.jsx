import MenuCard from "./MenuCard.jsx";

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function MenuList({ menu, fotoMenu, kategoriAktif, onPilihKategori, pesanan, onTambah, onKurang }) {
  const menuTampil =
    kategoriAktif === "Semua"
      ? menu
      : menu.filter((m) => m.kategori === kategoriAktif);

  return (
    <section id="menu" className="scroll-mt-20">
      <div className="text-center">
        <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-semibold sm:text-5xl">Menu pilihan</h2>
        <p className="mt-2 text-amber-900/70">
          Menampilkan {menuTampil.length} dari {menu.length} menu
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih kategori">
          {daftarKategori.map((kategori) => {
            const aktif = kategori === kategoriAktif;
            return (
              <button
                key={kategori}
                type="button"
                aria-pressed={aktif}
                onClick={() => onPilihKategori(kategori)}
                className={
                  aktif
                    ? "rounded-full border-2 border-stone-900 bg-stone-900 px-5 py-2 font-semibold text-orange-100 transition"
                    : "rounded-full border-2 border-stone-900/25 px-5 py-2 font-semibold text-stone-900/75 transition hover:border-stone-900 hover:text-stone-900"
                }
              >
                {kategori}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 items-start gap-4 sm:gap-6 xl:grid-cols-3">
        {menuTampil.map((item) => {
          const dipesan = pesanan.find((p) => p.id === item.id);
          return (
            <MenuCard
              key={item.id}
              id={item.id}
              nama={item.nama}
              kategori={item.kategori}
              harga={item.harga}
              tersedia={item.tersedia}
              deskripsi={item.deskripsi}
              foto={fotoMenu[item.id]}
              jumlah={dipesan ? dipesan.jumlah : 0}
              onTambah={onTambah}
              onKurang={onKurang}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MenuList;
