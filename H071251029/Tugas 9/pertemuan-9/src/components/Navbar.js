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
    <nav className="sticky top-0 z-50 border-b border-white/30 bg-white/85 px-5 py-4 shadow-sm backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 via-fuchsia-400 to-violet-500 text-xl shadow-lg shadow-fuchsia-200">📚</div>
          <div>
            <h1 className="text-lg font-black text-violet-800">Pustaka Senja</h1>
            <p className="text-xs font-medium text-pink-500">Ruang baca, ide, dan cerita</p>
          </div>
        </Link>

        <div className="flex flex-wrap justify-end gap-1 rounded-2xl bg-violet-50 p-1.5">
          {menu.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`rounded-xl px-3 py-2 text-sm font-bold transition ${active ? "bg-gradient-to-r from-pink-400 to-violet-500 text-white shadow-md" : "text-violet-700 hover:bg-white hover:text-pink-500"}`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
