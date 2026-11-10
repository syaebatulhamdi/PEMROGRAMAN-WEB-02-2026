"use client";

import { useState } from "react";
import Link from "next/link";

export default function Hero({ nama = "Pustaka Senja", slogan = "", jamBuka = "" }) {
  const [tampilMaskot, setTampilMaskot] = useState(true);

  return (
    <section className="relative bg-gradient-to-br from-marshy/30 via-marshy/10 to-catawba/5 border border-calcite/20 rounded-3xl p-8 md:p-14 shadow-sm mb-12 overflow-hidden">
      
      {/* Elemen Dekoratif Latar Belakang */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-catawba/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute right-1/4 -bottom-10 w-40 h-40 bg-stormy/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Tombol Interaktif Love / Sapa Maskot di Pojok Kanan Bawah */}
      <button
        onClick={() => setTampilMaskot(!tampilMaskot)}
        className="absolute right-6 top-6 z-30 bg-white/90 hover:bg-white text-[#6F3742] border border-[#6F3742]/30 px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-2 text-xs font-bold transition transform hover:scale-105 cursor-pointer"
        title="Sembunyikan / Tampilkan Maskot"
      >
        <span>{tampilMaskot ? "🤍" : "❤️"}</span>
      </button>

      {/* Konten Utama Hero */}
      <div className="relative z-20 max-w-2xl text-left pl-0 md:pl-5 pr-0 md:pr-36">
        <div className="inline-flex items-center gap-2 bg-catawba/10 text-catawba text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 shadow-2xs">
          <span>☕</span>
          <span>Ruang Baca &amp; Komunitas Literasi Senja</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-tangaroa mb-5 leading-[1.15]">
          Setiap buku adalah <span className="text-catawba underline decoration-stormy/40 decoration-wavy underline-offset-8">dunia baru</span> yang menunggu dijelajahi.
        </h1>

        <p className="text-calcite text-base md:text-lg mb-6 leading-relaxed">
          Selamat datang di <strong className="text-tangaroa font-bold">{nama}</strong>. {slogan}
        </p>

        {/* Info Jam Buka */}
        <div className="inline-flex items-center gap-2.5 bg-white/70 border border-calcite/20 px-4 py-2 rounded-2xl text-xs md:text-sm text-tangaroa font-medium mb-8 shadow-2xs">
          <span className="text-base">🕒</span>
          <span>{jamBuka}</span>
        </div>

        {/* Tombol Aksi Utama */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/katalog"
            className="bg-catawba hover:bg-catawba/90 text-white font-medium px-7 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg flex items-center gap-2 group"
          >
            <span>Jelajahi Katalog Buku</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          <Link
            href="/usulan"
            className="bg-white/80 border border-calcite/30 hover:bg-white text-tangaroa font-medium px-6 py-3.5 rounded-2xl transition shadow-2xs"
          >
            Usulkan Buku Baru
          </Link>
        </div>
      </div>

      {/* MASKOT & BUBBLE CHAT DENGAN ANIMASI GESER DARI KANAN (MENGGUNAKAN CLASS TRANSISI CSS) */}
      <div
        className={`absolute right-0 bottom-0 pointer-events-none z-10 hidden md:block transition-all duration-700 ease-out transform ${
          tampilMaskot ? "translate-x-0 opacity-100 scale-100" : "translate-x-32 opacity-0 scale-95"
        }`}
      >
        {/* Bubble Chat di Atas Kepala Karakter */}
        <div className="absolute right-38 bottom-88 bg-white border border-[#6F3742]/20 px-4 py-2.5 rounded-2xl shadow-lg max-w-[200px] text-center">
          <p className="text-xl font-bold text-[#6F3742] italic">
            &ldquo;Just one more chapter please~&rdquo;
          </p>
          <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-3 h-3 bg-white border-r border-b border-[#6F3742]/20 transform rotate-45"></div>
        </div>

        {/* Gambar Maskot */}
        <img
          src="/hero1.png"
          alt="Maskot Pustaka Senja"
          className="w-95 md:w-105 h-auto object-contain filter drop-shadow-xl translate-x-4"
        />
      </div>
    </section>
  );
}