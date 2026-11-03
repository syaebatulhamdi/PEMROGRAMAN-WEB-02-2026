"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Usulan Buku", href: "/usulan" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/30 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#f3bfd9] via-[#e7c9ed] to-[#cdbcf0] text-xl shadow-lg shadow-[#eadcf0]">📚</div>
          <div>
            <h1 className="text-lg font-black text-[#5b3f69]">Pustaka Senja</h1>
            <p className="text-xs font-medium text-[#c16b96]">Ruang baca, ide, dan cerita</p>
          </div>
        </Link>

        <div className="flex flex-wrap justify-end gap-1 rounded-2xl bg-[#f4effa] p-1.5">
          {menu.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`rounded-xl px-3 py-2 text-sm font-bold transition ${active ? "bg-gradient-to-r from-[#eeb8d5] to-[#c9b8ed] text-[#5b3f69] shadow-sm" : "text-[#674d78] hover:bg-white hover:text-[#c16b96]"}`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
