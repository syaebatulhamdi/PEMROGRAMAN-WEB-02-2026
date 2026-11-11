import Hero from "@/components/Hero";
import Link from "next/link";
import { getStatistik } from "@/lib/buku";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { total, tersedia, dipinjam } = await getStatistik();

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <Hero nama="Pustaka Senja" slogan="Baca santai, tumbuhkan ide." lokasi="Dekat area kampus" jam="Senin–Sabtu, 09.00–20.00" />

      <section className="py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="font-bold text-pink-500">Koleksi kami</p><h2 className="text-3xl font-black text-violet-900">Statistik Buku</h2></div>
          <Link href="/katalog" className="font-bold text-violet-600 hover:text-pink-500">Buka katalog →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 p-6 text-white shadow-lg"><p className="text-sm font-semibold text-pink-100">Total Koleksi</p><p className="mt-2 text-5xl font-black">{total}</p><p className="mt-1">buku</p></div>
          <div className="rounded-3xl bg-gradient-to-br from-fuchsia-400 to-purple-500 p-6 text-white shadow-lg"><p className="text-sm font-semibold text-fuchsia-100">Buku Tersedia</p><p className="mt-2 text-5xl font-black">{tersedia}</p><p className="mt-1">siap dibaca</p></div>
          <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 p-6 text-white shadow-lg"><p className="text-sm font-semibold text-violet-100">Sedang Dipinjam</p><p className="mt-2 text-5xl font-black">{dipinjam}</p><p className="mt-1">buku</p></div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-7 shadow-lg shadow-pink-100 md:p-9">
        <p className="font-bold text-pink-500">Kenapa Pustaka Senja?</p>
        <h2 className="mt-1 text-3xl font-black text-violet-900">Tempat baca yang nyaman untuk mahasiswa</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["📖", "Koleksi beragam", "Mulai dari teknologi, fiksi, sampai pengembangan diri."],
            ["🌷", "Suasana santai", "Ruang baca dibuat nyaman untuk belajar dan membaca."],
            ["💡", "Bisa ikut berkontribusi", "Kamu bisa mengusulkan buku yang ingin ditambahkan."],
          ].map(([icon, title, text]) => <div key={title} className="rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 p-5"><div className="text-3xl">{icon}</div><h3 className="mt-3 font-black text-violet-800">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></div>)}
        </div>
      </section>
    </div>
  );
}
