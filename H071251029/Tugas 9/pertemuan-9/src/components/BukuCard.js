"use client";

import Link from "next/link";
import { useState } from "react";
import TombolHapus from "@/components/TombolHapus";

const warnaKategori = {
  Teknologi: "bg-sky-100 text-sky-700",
  Fiksi: "bg-pink-100 text-pink-700",
  "Pengembangan Diri": "bg-violet-100 text-violet-700",
};

export default function BukuCard({ buku }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white bg-white p-5 shadow-lg shadow-violet-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500" />
      <button onClick={() => setFavorit(!favorit)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-pink-50 text-xl hover:bg-pink-100" aria-label="Favorit">
        {favorit ? "💗" : "♡"}
      </button>
      <div className="pr-12">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${warnaKategori[buku.kategori] ?? "bg-gray-100 text-gray-700"}`}>{buku.kategori}</span>
        <h3 className="mt-4 text-xl font-black text-violet-900">{buku.judul}</h3>
        <p className="mt-1 font-medium text-gray-500">{buku.penulis}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-gray-500">Tahun {buku.tahun}</span>
        <span className={`rounded-full px-3 py-1.5 font-bold ${buku.tersedia ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>
      <Link href={`/katalog/${buku.id}`} className="mt-5 block rounded-xl bg-gradient-to-r from-pink-400 to-violet-500 px-4 py-3 text-center font-bold text-white transition hover:brightness-105">Lihat Detail →</Link>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Link href={`/katalog/${buku.id}/edit`} className="rounded-xl bg-violet-50 px-4 py-2.5 text-center text-sm font-bold text-violet-700 transition hover:bg-violet-100">✏️ Edit</Link>
        <TombolHapus id={buku.id} judul={buku.judul} className="w-full" />
      </div>
    </article>
  );
}
