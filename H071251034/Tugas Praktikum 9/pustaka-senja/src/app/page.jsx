import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const hasil = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  const { total, tersedia, dipinjam } = hasil.rows[0];

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total, warna: "bg-iris" },
    { label: "Buku Tersedia", nilai: tersedia, warna: "bg-sage" },
    { label: "Buku Dipinjam", nilai: dipinjam, warna: "bg-coral" },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas dekat kampus. Pinjam buku, temukan bacaan baru, dan usulkan judul yang ingin kamu baca bersama."
        lokasi="Dekat kampus, Makassar"
        jamBuka="Setiap hari, 10.00 - 20.00 WITA"
      />

      <section>
        <h2 className="font-display text-2xl font-semibold">
          Ringkasan Koleksi
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {statistik.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-3xl bg-paper p-5 shadow-sm"
            >
              <span
                className={`${item.warna} flex h-14 min-w-14 items-center justify-center rounded-2xl px-2 font-display text-2xl font-bold text-white`}
              >
                {item.nilai}
              </span>
              <p className="font-display text-lg font-semibold leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
