"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-3 px-4 pt-4 sm:flex-row sm:justify-between sm:px-6 sm:pt-6">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 19.5V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2" />
            <path d="M8 7h6" />
          </svg>
        </span>
        <span className="font-display text-xl font-bold text-plum">
          Pustaka Senja
        </span>
      </Link>

      <ul className="flex items-center gap-1 rounded-full bg-paper p-1.5 shadow-sm">
        {daftarMenu.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "block rounded-full bg-linear-to-r bg-iris px-4 py-2 text-sm font-bold text-white"
                    : "block rounded-full px-4 py-2 text-sm font-semibold text-plum/70 transition hover:bg-cream hover:text-plum"
                }
              >
                {item.nama}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
