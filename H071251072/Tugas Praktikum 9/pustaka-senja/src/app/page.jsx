import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const result = await pool.query("SELECT * FROM buku");
  const dataBuku = result.rows;

  const totalBuku = dataBuku.length;
  const bukuTersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const bukuDipinjam = totalBuku - bukuTersedia;

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        deskripsi="Ruang baca hangat di dekat kampus untuk membaca, berdiskusi, dan menemukan referensi baru."
        lokasi="Jl. Mahasiswa No. 12 | Buka: 09.00 - 21.00 WITA"
      />

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Ringkasan Koleksi Database</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">Total Koleksi</p>
            <p className="text-3xl font-bold text-amber-400">{totalBuku}</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">Buku Tersedia</p>
            <p className="text-3xl font-bold text-emerald-400">{bukuTersedia}</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">Sedang Dipinjam</p>
            <p className="text-3xl font-bold text-rose-400">{bukuDipinjam}</p>
          </div>
        </div>
      </section>
    </div>
  );
}