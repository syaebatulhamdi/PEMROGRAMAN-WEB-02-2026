import Link from "next/link";

export default function Hero({ nama, slogan, lokasi, jam }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6c9df] via-[#efd5ea] to-[#d9cef3] text-[#4b365c] px-6 py-12 shadow-xl shadow-[#eadcf0] md:px-12 md:py-16">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
      <div className="relative max-w-3xl">
        <span className="inline-block rounded-full bg-white/45 px-4 py-2 text-sm font-bold backdrop-blur">Komunitas Baca Dekat Kampus</span>
        <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{nama}</h2>
        <p className="mt-4 text-xl font-semibold text-[#7b526d]">{slogan}</p>
        <p className="mt-4 max-w-2xl leading-7 text-[#654d6e]">Tempat santai untuk membaca, belajar, berbagi rekomendasi, dan menemukan buku baru bersama komunitas.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
          <span className="rounded-full bg-white/50 px-4 py-2">📍 {lokasi}</span>
          <span className="rounded-full bg-white/50 px-4 py-2">🕒 {jam}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/katalog" className="rounded-xl bg-white px-5 py-3 font-black text-[#674d78] shadow-lg hover:scale-105 transition">Lihat Katalog</Link>
          <Link href="/usulan" className="rounded-xl border border-white/80 bg-white/10 px-5 py-3 font-black text-[#5b3f69] backdrop-blur hover:bg-white/45 transition">Usulkan Buku</Link>
        </div>
      </div>
    </section>
  );
}
