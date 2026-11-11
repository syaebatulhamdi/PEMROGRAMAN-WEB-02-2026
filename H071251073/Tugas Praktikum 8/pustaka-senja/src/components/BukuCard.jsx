"use client";

import { useState } from "react";
import Link from "next/link";

export default function BukuCard({ buku }) {
  const { id, judul, penulis, kategori, tahun, tersedia } = buku;
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug">{judul}</h3>
        <span
          className={
            tersedia
              ? "shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
              : "shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800"
          }
        >
          {tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>
      <p className="mt-1 text-slate-600">{penulis}</p>
      <p className="mt-3 text-sm text-slate-500">
        {kategori} &middot; {tahun}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setFavorit(!favorit)}
          aria-pressed={favorit}
          className={
            favorit
              ? "rounded-lg border border-orange-300 bg-orange-100 px-3 py-2 text-sm font-medium text-orange-700"
              : "rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          }
        >
          {favorit ? "Tersimpan" : "Simpan"}
        </button>
        <Link
          href={`/katalog/${id}`}
          className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}