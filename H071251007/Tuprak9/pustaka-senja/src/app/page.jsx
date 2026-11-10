import Hero from "@/components/Hero";
import Link from "next/link";
import pool from "@/lib/db";

export default async function HomePage() {
  // Ambil data buku secara dinamis dari database PostgreSQL
  const { rows: books } = await pool.query("SELECT * FROM buku");

  // Hitung statistik koleksi dari data database
  const totalBuku = books.length;
  const bukuTersedia = books.filter((buku) => buku.tersedia).length;
  const bukuDipinjam = totalBuku - bukuTersedia;

  return (
    <div>
      <Hero
        nama="Pustaka Senja"
        slogan="Tempat singgah bagi para pencinta literasi untuk membaca dan meminjam koleksi pilihan berkualitas."
        jamBuka="Buka Setiap Hari: 09.00 - 21.00 WITA"
      />

      {/* Ringkasan Statistik Koleksi Buku */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-marshy/20 border border-calcite/20 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-calcite mb-1">Total Koleksi Buku</p>
          <h2 className="text-3xl font-bold text-tangaroa">{totalBuku} Buku</h2>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-emerald-700 mb-1">Buku Tersedia</p>
          <h2 className="text-3xl font-bold text-emerald-800">{bukuTersedia} Buku</h2>
        </div>
        <div className="bg-stormy/10 border border-stormy/20 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-stormy mb-1">Buku Sedang Dipinjam</p>
          <h2 className="text-3xl font-bold text-catawba">{bukuDipinjam} Buku</h2>
        </div>
      </section>

      {/* Banner Ajakan Usulan Buku */}
      <section className="bg-tangaroa text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h3 className="text-2xl font-bold mb-2">Punya usulan buku bacaan baru?</h3>
          <p className="text-marshy text-sm">Bantu kami memperkaya koleksi Pustaka Senja dengan mengajukan judul buku favoritmu.</p>
        </div>
        <Link
          href="/usulan"
          className="bg-stormy hover:bg-stormy/90 text-white font-medium px-6 py-3 rounded-xl transition whitespace-nowrap shadow-md"
        >
          Isi Formulir Usulan &rarr;
        </Link>
      </section>
    </div>
  );
}