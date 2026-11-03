"use client";

import { useState } from "react";
import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export default function KatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Ambil daftar kategori unik dari dataBuku
  const categories = ["Semua", ...new Set(dataBuku.map((b) => b.kategori))];

  // Filter buku berdasarkan pencarian dan kategori
  const filteredBuku = dataBuku.filter((buku) => {
    const matchesSearch =
      buku.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buku.penulis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || buku.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fungsi mengecek ketersediaan buku menggunakan tipe boolean (tersedia: true/false)
  const isAvailable = (buku) => {
    if (!buku) return false;
    if (typeof buku.tersedia === "boolean") return buku.tersedia;
    if (typeof buku.stok === "number") return buku.stok > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#ECE7E1] p-4 md:p-8 font-sans">
      
      {/* KARTU DASHBOARD UTAMA (FULL SATU LAYAR) */}
      <div className="w-full max-w-7xl mx-auto bg-[#F7F4EF] border border-[#DCD5CB] rounded-[36px] shadow-2xl p-6 md:p-10 overflow-hidden">
        
        {/* TOP BAR: Menu Kategori & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-[#DCD5CB]/50">
          
          {/* Menu Kategori Buku */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#6F3742] text-white shadow-md"
                    : "bg-[#EBE5DC] text-[#526161] hover:text-[#1D2B38] border border-[#D8D0C5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#526161]">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search in My Library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 border border-[#D8D0C5] rounded-full py-2 pl-11 pr-4 text-xs text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40 shadow-2xs"
            />
          </div>
        </div>

        {/* BOOKSHELF UTAMA (PENUH SATU LAYAR) */}
        <div className="space-y-12">
          
          {filteredBuku.length > 0 ? (
            [0, 1, 2].map((rowIndex) => {
              const rowBooks = filteredBuku.slice(rowIndex * 4, (rowIndex + 1) * 4);
              if (rowBooks.length === 0) return null;

              return (
                <div key={rowIndex} className="relative pt-4">
                  {/* Grid Buku (Rata Kiri) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-end px-1 z-10 relative justify-items-start">
                    {rowBooks.map((buku) => {
                      const coverSrc = buku.cover || `/book${buku.id}.png`;
                      const available = isAvailable(buku);

                      return (
                        <Link
                          key={buku.id}
                          href={`/katalog/${buku.id}`}
                          className="group flex flex-col items-center cursor-pointer transition transform hover:-translate-y-2"
                        >
                          <div className="w-28 h-40 rounded-md overflow-hidden shadow-lg bg-white relative">
                            <img
                              src={coverSrc}
                              alt={buku.judul}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Badge penanda jika buku sedang dipinjam */}
                            {!available && (
                              <span className="absolute top-2 right-2 bg-rose-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                                Dipinjam
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#1D2B38] mt-2 text-center line-clamp-1 w-28 group-hover:text-[#6F3742] transition">
                            {buku.judul}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Papan Rak Kayu 3D */}
                  <div className="w-full h-3 bg-gradient-to-r from-[#E3DACD] via-[#F3EDE3] to-[#E3DACD] border-t border-[#C8BFA8] shadow-md rounded-sm mt-0 relative z-0">
                    <div className="w-full h-2 bg-[#D5CAB3] rounded-b-sm"></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 text-[#526161]">
              <p className="text-sm font-medium">Tidak ada buku dalam kategori atau pencarian ini.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}