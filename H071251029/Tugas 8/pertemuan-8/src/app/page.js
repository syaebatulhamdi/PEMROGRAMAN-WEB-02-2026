import Hero from "@/components/Hero";
import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export default function Home() {
  const total = dataBuku.length;
  const tersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const dipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <Hero nama="Pustaka Senja" slogan="Baca santai, tumbuhkan ide." lokasi="Dekat area kampus" jam="Senin–Sabtu, 09.00–20.00" />

      <section className="py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="font-bold text-[#c16b96]">Koleksi kami</p><h2 className="text-3xl font-black text-[#493453]">Statistik Buku</h2></div>
          <Link href="/katalog" className="font-bold text-[#765c87] hover:text-[#c16b96]">Buka katalog →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-[#efbdd7] to-[#e9bfd0] p-6 text-[#5b3f69] shadow-lg"><p className="text-sm font-semibold text-[#7b526d]">Total Koleksi</p><p className="mt-2 text-5xl font-black">{total}</p><p className="mt-1">buku</p></div>
          <div className="rounded-3xl bg-gradient-to-br from-[#e6c3ed] to-[#cdbce9] p-6 text-[#5b3f69] shadow-lg"><p className="text-sm font-semibold text-[#7a5c80]">Buku Tersedia</p><p className="mt-2 text-5xl font-black">{tersedia}</p><p className="mt-1">siap dibaca</p></div>
          <div className="rounded-3xl bg-gradient-to-br from-[#cdbce9] to-[#b9c8ea] p-6 text-[#5b3f69] shadow-lg"><p className="text-sm font-semibold text-[#6d5a79]">Sedang Dipinjam</p><p className="mt-2 text-5xl font-black">{dipinjam}</p><p className="mt-1">buku</p></div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-7 shadow-lg shadow-[#f6dfeb] md:p-9">
        <p className="font-bold text-[#c16b96]">Kenapa Pustaka Senja?</p>
        <h2 className="mt-1 text-3xl font-black text-[#493453]">Tempat baca yang nyaman untuk mahasiswa</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["📖", "Koleksi beragam", "Mulai dari teknologi, fiksi, sampai pengembangan diri."],
            ["🌷", "Suasana santai", "Ruang baca dibuat nyaman untuk belajar dan membaca."],
            ["💡", "Bisa ikut berkontribusi", "Kamu bisa mengusulkan buku yang ingin ditambahkan."],
          ].map(([icon, title, text]) => <div key={title} className="rounded-2xl bg-gradient-to-br from-[#fff1f7] to-[#f2edfb] p-5"><div className="text-3xl">{icon}</div><h3 className="mt-3 font-black text-[#5b3f69]">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></div>)}
        </div>
      </section>
    </div>
  );
}
