import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import { getSemuaBuku, getStatistik } from "@/lib/buku";
import { KATEGORI } from "@/lib/konstanta";

export const dynamic = "force-dynamic";

const filterKategori = ["Semua", ...KATEGORI];

export default async function KatalogPage({ searchParams }) {
  const { kategori } = await searchParams;
  // Hanya terima kategori yang dikenal; selain itu tampilkan semua.
  const filter = KATEGORI.includes(kategori) ? kategori : "Semua";

  const [bukuTampil, { total }] = await Promise.all([
    getSemuaBuku(filter === "Semua" ? null : filter),
    getStatistik(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-5 rounded-3xl bg-gradient-to-r from-pink-100 via-fuchsia-100 to-violet-100 p-7 md:p-10">
        <div>
          <p className="font-bold text-pink-500">📚 Koleksi Pustaka Senja</p>
          <h2 className="mt-2 text-4xl font-black text-violet-900">Katalog Buku</h2>
          <p className="mt-2 max-w-2xl text-gray-600">Pilih kategori untuk melihat koleksi yang kamu cari.</p>
        </div>
        <Link href="/katalog/tambah" className="rounded-xl bg-gradient-to-r from-pink-400 to-violet-500 px-5 py-3 font-black text-white shadow-lg transition hover:brightness-105">＋ Tambah Buku</Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filterKategori.map((item) => (
          <Link
            key={item}
            href={item === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(item)}`}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${filter === item ? "bg-gradient-to-r from-pink-400 to-violet-500 text-white shadow-md" : "bg-white text-violet-700 shadow-sm hover:bg-pink-50"}`}
          >
            {item}
          </Link>
        ))}
      </div>

      {bukuTampil.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-lg">
          <p className="text-5xl">📭</p>
          <p className="mt-3 font-bold text-violet-900">Belum ada buku pada kategori ini.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bukuTampil.map((buku) => <BukuCard key={buku.id} buku={buku} />)}
        </div>
      )}
      <p className="mt-6 text-sm font-medium text-gray-500">Menampilkan {bukuTampil.length} dari {total} buku.</p>
    </div>
  );
}
