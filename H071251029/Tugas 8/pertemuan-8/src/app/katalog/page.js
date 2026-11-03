"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { dataBuku } from "@/data/dataBuku";

const kategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
  const [filter, setFilter] = useState("Semua");
  const bukuTampil = filter === "Semua" ? dataBuku : dataBuku.filter((buku) => buku.kategori === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="rounded-3xl bg-gradient-to-r from-[#fce6f1] via-[#f4e5f3] to-[#e9e1f8] p-7 md:p-10">
        <p className="font-bold text-[#c16b96]">📚 Koleksi Pustaka Senja</p>
        <h2 className="mt-2 text-4xl font-black text-[#493453]">Katalog Buku</h2>
        <p className="mt-2 max-w-2xl text-gray-600">Pilih kategori untuk melihat koleksi yang kamu cari.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {kategori.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${filter === item ? "bg-gradient-to-r from-[#eeb8d5] to-[#c9b8ed] text-[#5b3f69] shadow-sm" : "bg-white text-[#674d78] shadow-sm hover:bg-[#fff0f6]"}`}>{item}</button>)}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {bukuTampil.map((buku) => <BukuCard key={buku.id} buku={buku} />)}
      </div>
      <p className="mt-6 text-sm font-medium text-gray-500">Menampilkan {bukuTampil.length} dari {dataBuku.length} buku.</p>
    </div>
  );
}
