"use client";

import { use, useState } from "react";
import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export default function DetailBukuPage({ params }) {
  const resolvedParams = use(params);
  const bukuId = parseInt(resolvedParams.id, 10);
  const buku = dataBuku.find((b) => b.id === bukuId);

  // Inisialisasi state langsung dari localStorage tanpa useEffect agar bebas dari warning/error
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!buku) return false;
    try {
      const favorites = JSON.parse(localStorage.getItem("pustaka_favorites") || "[]");
      return favorites.includes(buku.id);
    } catch (e) {
      return false;
    }
  });

  const toggleFavorite = () => {
    if (!buku) return;
    try {
      const favorites = JSON.parse(localStorage.getItem("pustaka_favorites") || "[]");
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter((id) => id !== buku.id);
      } else {
        updatedFavorites = [...favorites, buku.id];
      }
      localStorage.setItem("pustaka_favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error("Gagal menyimpan favorites:", e);
    }
  };

  if (!buku) {
    return (
      <div className="min-h-screen bg-[#ECE7E1] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-2xl font-bold text-[#1D2B38] mb-4">Buku Tidak Ditemukan</h1>
        <p className="text-sm text-[#526161] mb-6">Maaf, buku yang kamu cari tidak tersedia di Pustaka Senja.</p>
        <Link
          href="/katalog"
          className="bg-[#6F3742] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#6F3742]/90 transition"
        >
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isAvailable = typeof buku.tersedia === "boolean" ? buku.tersedia : buku.stok > 0;

  return (
    <div className="min-h-screen bg-[#ECE7E1] p-4 md:p-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#F7F4EF] border border-[#DCD5CB] rounded-[36px] shadow-2xl p-6 md:p-10 text-left">
        
        {/* Navigation & Tombol Favorit */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#526161] hover:text-[#1D2B38] transition"
          >
            <span>&larr;</span>
            <span>Kembali ke Katalog</span>
          </Link>

          {/* Tombol Favorit Menggunakan fav.svg & notFav.svg */}
          <button
            onClick={toggleFavorite}
            className="flex items-center gap-2 bg-white border border-[#D8D0C5] px-2 py-2 rounded-full text-xs font-bold text-[#1D2B38] shadow-xs hover:bg-white transition cursor-pointer"
          >
            <img
              src={isFavorite ? "/fav.svg" : "/notFav.svg"}
              alt="Favorite Icon"
              className="w-10 h-10 object-contain"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Cover Buku */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-48 h-68 rounded-2xl overflow-hidden shadow-xl bg-white border border-[#D8D0C5]">
              <img
                src={buku.cover || `/book${buku.id}.png`}
                alt={buku.judul}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Informasi Lengkap Buku */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-white bg-[#6F3742] px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                {buku.kategori}
              </span>
              <h1 className="text-2xl font-extrabold text-[#1D2B38] leading-tight">
                {buku.judul}
              </h1>
              <p className="text-sm text-[#526161] mt-1">
                Oleh <strong className="text-[#1D2B38]">{buku.penulis}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#526161]">
              <span>Tahun Terbit: <strong className="text-[#1D2B38]">{buku.tahun}</strong></span>
              <span>•</span>
              <span className="text-amber-500 font-bold">★★★★★ (4.9 / 5.0)</span>
            </div>

            {/* Teks Sinopsis Lengkap */}
            <div className="bg-white/80 border border-[#D8D0C5] rounded-2xl p-4 text-xs space-y-1.5">
              <span className="font-bold text-[#1D2B38] block">Sinopsis Lengkap:</span>
              <p className="text-[#526161] leading-relaxed">
                {buku.sinopsis}
              </p>
            </div>

            {/* Status Ketersediaan */}
            <div className="flex items-center justify-between bg-[#ECE7E1]/50 border border-[#D8D0C5] px-4 py-2.5 rounded-xl text-xs">
              <span className="text-[#526161]">Status Ketersediaan:</span>
              <span className={`font-bold ${isAvailable ? "text-emerald-700" : "text-rose-700"}`}>
                {isAvailable ? "Tersedia" : "Sedang Dipinjam"}
              </span>
            </div>

            {/* Tombol Aksi */}
            {isAvailable ? (
              <button
                onClick={() => alert(`Berhasil mengajukan peminjaman buku: "${buku.judul}"`)}
                className="w-full bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-bold py-3 rounded-2xl text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📖</span>
                <span>Pinjam Buku Ini</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-[#B6ADA2]/40 text-[#526161] font-bold py-3 rounded-2xl text-xs cursor-not-allowed flex items-center justify-center gap-2 border border-[#D8D0C5]"
              >
                <span>⏳</span>
                <span>Sedang Dipinjam</span>
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}