import { useState } from "react";

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, onTambah }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <article
      className={
        tersedia
          ? "rounded-xl bg-white p-4 shadow-sm"
          : "rounded-xl bg-stone-200 p-4 opacity-75"
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{nama}</h3>
          <span className="text-xs text-stone-500">{kategori}</span>
        </div>
        <p className="font-semibold text-amber-900">
          Rp {harga.toLocaleString("id-ID")}
        </p>
      </div>

      {detailTerbuka && <p className="mt-2 text-sm text-stone-600">{deskripsi}</p>}

      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          className="text-sm text-amber-800 underline"
        >
          {detailTerbuka ? "Tutup detail" : "Lihat detail"}
        </button>

        <button
          type="button"
          onClick={() => onTambah(id)}
          disabled={!tersedia}
          className="rounded-lg bg-amber-800 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {tersedia ? "Tambah" : "Habis"}
        </button>
      </div>
    </article>
  );
}

export default MenuCard;
