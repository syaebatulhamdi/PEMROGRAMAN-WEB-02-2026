import Link from "next/link";

const tumpukanBuku = [
  { warna: "bg-iris", lebar: "w-48", geser: "ml-6" },
  { warna: "bg-coral", lebar: "w-56", geser: "ml-0" },
  { warna: "bg-honey", lebar: "w-44", geser: "ml-10" },
  { warna: "bg-plum", lebar: "w-52", geser: "ml-3" },
  { warna: "bg-cream", lebar: "w-56", geser: "ml-0" },
];

function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-sage to-deep px-6 py-10 text-white sm:px-10 sm:py-14">
      <div className="relative z-10 max-w-lg">
        <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
          {nama}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white">{slogan}</p>

        <ul className="mt-6 space-y-2 text-sm font-semibold text-white">
          <li className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {lokasi}
          </li>
          <li className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {jamBuka}
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/katalog"
            className="rounded-full bg-linear-to-r bg-iris px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
          >
            Lihat Katalog
          </Link>
          <Link
            href="/usulan"
            className="rounded-full bg-white/15 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/50 transition hover:bg-white/25"
          >
            Usulkan Buku
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-6 right-8 hidden flex-col items-start gap-1 md:flex"
        aria-hidden="true"
      >
        {tumpukanBuku.map((buku) => (
          <div
            key={buku.warna}
            className={`${buku.warna} ${buku.lebar} ${buku.geser} flex h-9 items-center gap-2 rounded-md px-3 shadow-md`}
          >
            <span className="h-4 w-1.5 rounded-full bg-black/15" />
            <span className="h-4 w-1.5 rounded-full bg-black/15" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
