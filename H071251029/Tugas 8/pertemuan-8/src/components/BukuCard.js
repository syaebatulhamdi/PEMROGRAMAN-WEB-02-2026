"use client";

import Link from "next/link";
import { useState } from "react";

const warnaKategori = {
  Teknologi: "bg-sky-100 text-sky-700",
  Fiksi: "bg-[#f9dce9] text-[#a55279]",
  "Pengembangan Diri": "bg-[#eee6f7] text-[#674d78]",
};

export default function BukuCard({ buku }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white bg-white p-5 shadow-lg shadow-[#e9def1] transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#f3b9d7] via-[#e5c8ee] to-[#cdbcf0]" />
      <button onClick={() => setFavorit(!favorit)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#fff0f6] text-xl hover:bg-[#f9dce9]" aria-label="Favorit">
        {favorit ? "💗" : "♡"}
      </button>
      <div className="pr-12">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${warnaKategori[buku.kategori]}`}>{buku.kategori}</span>
        <h3 className="mt-4 text-xl font-black text-[#493453]">{buku.judul}</h3>
        <p className="mt-1 font-medium text-gray-500">{buku.penulis}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-gray-500">Tahun {buku.tahun}</span>
        <span className={`rounded-full px-3 py-1.5 font-bold ${buku.tersedia ? "bg-[#dff3e9] text-[#3f8061]" : "bg-[#f8e0e8] text-[#a65370]"}`}>
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>
      <Link href={`/katalog/${buku.id}`} className="mt-5 block rounded-xl bg-gradient-to-r from-[#eeb8d5] to-[#c9b8ed] px-4 py-3 text-center font-bold text-[#5b3f69] transition hover:brightness-105">Lihat Detail →</Link>
    </article>
  );
}
