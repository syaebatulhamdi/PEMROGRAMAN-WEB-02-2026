import { useState } from "react";

const gayaKategori = {
  Kopi: "from-amber-700 to-amber-950",
  "Non-Kopi": "from-olive-500 to-olive-700",
  Makanan: "from-orange-300 to-amber-600",
};

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, foto, jumlah, onTambah, onKurang }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);
  const warnaLatar = gayaKategori[kategori];

  return (
    <li className="overflow-hidden rounded-b-3xl rounded-t-full bg-orange-50 shadow-lg shadow-stone-900/15 ring-1 ring-stone-900/5">
      <div
        className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-t-full bg-linear-to-b ${warnaLatar} ${
          tersedia ? "" : "opacity-50 grayscale"
        }`}
      >
        <img src={foto} alt={nama} loading="lazy" className="h-full w-full object-cover" />
        {jumlah > 0 && (
          <span className="absolute right-[18%] top-[16%] flex h-8 min-w-8 items-center justify-center rounded-full bg-amber-300 px-2 text-sm font-bold text-stone-900 ring-2 ring-orange-50">
            {jumlah}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-['Cormorant_Garamond',Georgia,serif] text-2xl font-bold leading-tight ${tersedia ? "" : "text-stone-900/50"}`}>
            {nama}
          </h3>
          {!tersedia && (
            <span className="rounded-full bg-stone-900/10 px-2.5 py-0.5 text-xs font-semibold text-stone-900/60">
              Sedang habis
            </span>
          )}
        </div>
        <p className="text-sm text-amber-900/60">{kategori}</p>
        <p className={`mt-1 text-lg font-bold ${tersedia ? "text-amber-700" : "text-stone-900/40"}`}>
          Rp {harga.toLocaleString("id-ID")}
        </p>

        <button
          type="button"
          aria-expanded={detailTerbuka}
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          className="mt-1 rounded text-sm font-medium text-amber-900/70 underline decoration-amber-900/30 underline-offset-4 transition hover:text-stone-900"
        >
          {detailTerbuka ? "Tutup detail" : "Lihat detail"}
        </button>

        {detailTerbuka && (
          <p className="mt-3 rounded-2xl bg-orange-100 px-4 py-3 text-sm leading-relaxed text-stone-900/80">
            {deskripsi}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          {jumlah > 0 && (
            <button
              type="button"
              aria-label={`Kurangi ${nama}`}
              onClick={() => onKurang(id)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-stone-900/20 text-2xl transition hover:border-stone-900"
            >
              -
            </button>
          )}
          <button
            type="button"
            disabled={!tersedia}
            onClick={() => onTambah(id)}
            className="h-12 flex-1 rounded-full bg-stone-900 px-4 font-bold text-orange-100 transition hover:bg-amber-900 active:scale-95 disabled:cursor-not-allowed disabled:bg-stone-900/10 disabled:text-stone-900/40 disabled:active:scale-100"
          >
            {tersedia ? "Tambah" : "Habis"}
          </button>
        </div>
      </div>
    </li>
  );
}

export default MenuCard;
