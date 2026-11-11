
"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";

export default function KatalogClient({ buku }) {
  const [kategori, setKategori] = useState("Semua");

  const daftarKategori = [
    "Semua",
    ...new Set(buku.map((item) => item.kategori)),
  ];

  const bukuTampil =
    kategori === "Semua"
      ? buku
      : buku.filter((item) => item.kategori === kategori);

  return (
    <div>
      <h1 className="text-3xl font-bold">Katalog Buku</h1>

      <p className="mt-1 text-slate-600">
        Menampilkan {bukuTampil.length} buku.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {daftarKategori.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKategori(item)}
            className={
              kategori === item
                ? "rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white"
                : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            }
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bukuTampil.map((item) => (
          <BukuCard key={item.id} buku={item} />
        ))}
      </div>
    </div>
  );
}
