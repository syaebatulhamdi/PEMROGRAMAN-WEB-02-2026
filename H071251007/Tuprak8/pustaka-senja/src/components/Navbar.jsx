"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/", icon: "🏠" },
  { nama: "Katalog", path: "/katalog", icon: "📚" },
  { nama: "Usulan Buku", path: "/usulan", icon: "✍️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-marshy/40 backdrop-blur-md border-b border-calcite/20 sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Unik Pustaka Senja */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md flex items-center justify-center">
              <img
                src="/icon.png" 
                alt="Logo Pustaka Senja"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1D2B38] leading-none">Pustaka <span className="text-catawba">Senja</span></h1>
              <span className="text-sm text-[#526161] tracking-wider uppercase">Ruang Baca & Literasi</span>
            </div>
          </div>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-2 bg-white/50 border border-calcite/20 px-3 py-1.5 rounded-full shadow-xs">
          {daftarMenu.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-catawba text-white shadow-sm"
                      : "text-calcite hover:text-tangaroa hover:bg-marshy/50"
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.nama}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Tombol Hamburger Unik Versi Mobile (Layar HP) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-11 h-11 rounded-2xl bg-catawba/10 border border-catawba/20 text-catawba flex items-center justify-center text-lg shadow-xs hover:bg-catawba/20 transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? "✕" : "🍵 ☰"}
        </button>
      </div>

      {/* Menu Dropdown / Drawer Mobile (Responsif & Unik) */}
      {isOpen && (
        <div className="md:hidden bg-marshy/95 border-b border-calcite/20 px-6 py-5 shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-calcite/15">
            <span className="text-sm font-bold text-tangaroa">🧭 Navigasi Menu</span>
          </div>
          <ul className="space-y-2">
            {daftarMenu.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)} // Tutup menu saat diklik
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
                      isActive
                        ? "bg-catawba text-white shadow-sm"
                        : "bg-white/60 text-tangaroa hover:bg-white border border-calcite/15"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.nama}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}