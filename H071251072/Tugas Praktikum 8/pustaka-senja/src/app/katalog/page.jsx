"use client";

import { useState } from "react";
import { dataBuku } from "@/data/dataBuku";
import BukuCard from "@/components/BukuCard";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
const [kategoriAktif, setKategoriAktif] = useState("Semua");

const bukuFiltered =
    kategoriAktif === "Semua"
    ? dataBuku
    : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

return (
    <section>
    <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Katalog Buku</h1>
        <p className="text-slate-400">
        Jelajahi seluruh koleksi buku yang tersedia di Pustaka Senja.
        </p>
    </div>

      {/* Filter Kategori */}
    <div className="flex flex-wrap gap-2 mb-8">
        {daftarKategori.map((kat) => (
        <button
            key={kat}
            onClick={() => setKategoriAktif(kat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            kategoriAktif === kat
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
            }`}
        >
            {kat}
        </button>
        ))}
    </div>

      {/* Grid Kartu Buku */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bukuFiltered.map((buku) => (
        <BukuCard key={buku.id} buku={buku} />
        ))}
    </div>
    </section>
);
}