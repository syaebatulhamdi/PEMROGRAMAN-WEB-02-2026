"use client";

import { useState } from "react";
import Link from "next/link";

export default function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [suka, setSuka] = useState(false);
  // Menggunakan angka statis/konsisten agar tidak melanggar aturan pure function React Compiler
  const [jumlahSuka, setJumlahSuka] = useState(Number(id) * 3 + 5);

  const handleSuka = (e) => {
    e.preventDefault();
    if (suka) {
      setSuka(false);
      setJumlahSuka(jumlahSuka - 1);
    } else {
      setSuka(true);
      setJumlahSuka(jumlahSuka + 1);
    }
  };

  return (
    <div className="bg-[#B6ADA2]/15 border border-[#526161]/20 rounded-3xl p-5 shadow-sm flex flex-col justify-between transition hover:shadow-md hover:border-[#6F3742]/40 relative overflow-hidden group">
      <div>
        {/* Header Kartu: Kategori & Status Ketersediaan */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold bg-[#6F3742]/10 text-[#6F3742] px-3 py-1 rounded-full">
            {kategori}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              tersedia
                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                : "bg-[#C36765]/10 text-[#C36765] border border-[#C36765]/20"
            }`}
          >
            {tersedia ? "✔ Tersedia" : "✖ Dipinjam"}
          </span>
        </div>

        {/* Informasi Buku */}
        <h3 className="text-lg font-bold text-[#1D2B38] mb-1 line-clamp-1 group-hover:text-[#6F3742] transition">
          {judul}
        </h3>
        <p className="text-sm text-[#526161] mb-2 font-medium">Oleh: {penulis}</p>
        <p className="text-xs text-[#526161]/80 mb-4">Tahun Terbit: {tahun}</p>
      </div>

      {/* Bagian Bawah: Tombol Suka & Tautan Detail */}
      <div className="pt-4 border-t border-[#526161]/15 flex items-center justify-between">
        <button
          onClick={handleSuka}
          className={`text-xs font-medium px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
            suka
              ? "bg-[#C36765] text-white shadow-sm"
              : "bg-[#526161]/10 text-[#1D2B38] hover:bg-[#526161]/20"
          }`}
        >
          <span>{suka ? "❤️" : "🤍"}</span>
          <span>{jumlahSuka}</span>
        </button>

        <Link
          href={`/katalog/${id}`}
          className="text-xs font-semibold text-[#6F3742] hover:underline flex items-center gap-1"
        >
          Lihat Detail &rarr;
        </Link>
      </div>
    </div>
  );
}