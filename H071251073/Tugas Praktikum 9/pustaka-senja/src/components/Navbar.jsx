"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/katalog" },
  { label: "Usulan Buku", path: "/usulan" },
];

function aktif(pathname, path) {
  if (path === "/") return pathname === "/";
  // /katalog dan /katalog/[id] sama-sama menandai menu Katalog
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          Pustaka <span className="text-orange-400">Senja</span>
        </Link>
        <ul className="flex gap-6 text-sm">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={
                  aktif(pathname, item.path)
                    ? "border-b-2 border-orange-300 pb-1 font-medium text-sky-700"
                    : "border-b-2 border-transparent pb-1 text-slate-500 hover:text-slate-900"
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}