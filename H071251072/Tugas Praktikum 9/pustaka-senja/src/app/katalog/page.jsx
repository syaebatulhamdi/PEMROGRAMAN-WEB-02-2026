import pool from "@/lib/db";
import Link from "next/link";
import { tambahBuku } from "./actions";
import TombolHapus from "@/components/TombolHapus";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const result = await pool.query("SELECT * FROM buku ORDER BY id ASC");
const dataBuku = result.rows;

return (
    <section className="space-y-10">
    <div>
        <h1 className="text-3xl font-bold mb-2">Katalog Buku Pustaka Senja</h1>
        <p className="text-slate-400">
        Kelola dan jelajahi seluruh koleksi buku yang tersimpan di database PostgreSQL.
        </p>
    </div>

      {/* F3. Form Tambah Buku */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Tambah Koleksi Buku Baru</h2>
        <form action={tambahBuku} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
            type="text"
            name="judul"
            placeholder="Judul Buku"
            required
            className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        <input
            type="text"
            name="penulis"
            placeholder="Penulis"
            required
            className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        <select
            name="kategori"
            required
            className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        >
            <option value="Teknologi">Teknologi</option>
            <option value="Fiksi">Fiksi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
        </select>
        <input
            type="number"
            name="tahun"
            placeholder="Tahun Terbit"
            required
            className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        <select
            name="tersedia"
            required
            className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        >
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
        </select>
        <textarea
            name="sinopsis"
            placeholder="Sinopsis buku..."
            rows={2}
            required
            className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500 sm:col-span-2"
        />
        <div className="sm:col-span-2">
            <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition text-sm"
            >
            Simpan Buku Baru
            </button>
        </div>
        </form>
    </div>

      {/* F2. Daftar Kartu Buku */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dataBuku.map((buku) => (
        <div
            key={buku.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between"
        >
            <div>
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md font-medium">
                {buku.kategori}
                </span>
                <span
                className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    buku.tersedia
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}
                >
                {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{buku.judul}</h3>
            <p className="text-sm text-slate-400 mb-1">Penulis: {buku.penulis}</p>
            <p className="text-xs text-slate-500 mb-4">Tahun: {buku.tahun}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Link
                href={`/katalog/${buku.id}`}
                className="text-sm text-amber-400 hover:underline font-medium"
            >
                Lihat Detail &rarr;
            </Link>
            <div className="flex gap-2 items-center">
                <Link
                href={`/katalog/${buku.id}/edit`}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition font-medium"
                >
                Edit
                </Link>
                <TombolHapus id={buku.id} />
            </div>
            </div>
        </div>
        ))}
    </div>
    </section>
);
}