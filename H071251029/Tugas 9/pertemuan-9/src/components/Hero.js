import Link from "next/link";

export default function Hero({ nama, slogan, lokasi, jam }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 px-6 py-12 text-white shadow-xl shadow-fuchsia-200 md:px-12 md:py-16">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="relative max-w-3xl">
        <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur">✨ Komunitas Baca Dekat Kampus</span>
        <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{nama}</h2>
        <p className="mt-4 text-xl font-semibold text-pink-100">{slogan}</p>
        <p className="mt-4 max-w-2xl leading-7 text-white/90">Tempat santai untuk membaca, belajar, berbagi rekomendasi, dan menemukan buku baru bersama komunitas.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
          <span className="rounded-full bg-white/15 px-4 py-2">📍 {lokasi}</span>
          <span className="rounded-full bg-white/15 px-4 py-2">🕒 {jam}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/katalog" className="rounded-xl bg-white px-5 py-3 font-black text-violet-700 shadow-lg hover:scale-105 transition">Lihat Katalog</Link>
          <Link href="/usulan" className="rounded-xl border border-white/60 bg-white/10 px-5 py-3 font-black text-white backdrop-blur hover:bg-white/20 transition">Usulkan Buku</Link>
        </div>
      </div>
    </section>
  );
}
