import Link from "next/link";
import { notFound } from "next/navigation";
import pool from "@/lib/db";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
const { id } = await params;

if (!Number.isInteger(Number(id))) {
    notFound();
}

  const result = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
const buku = result.rows[0];

if (!buku) {
    notFound();
}

return (
    <main className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
    <h1 className="text-2xl font-bold mb-2 text-white">Edit Buku #{buku.id}</h1>
    <p className="text-slate-400 text-sm mb-6">Perbarui informasi koleksi Pustaka Senja.</p>

    <form action={ubahBuku} className="space-y-4">
        <input type="hidden" name="id" value={buku.id} />

        <div>
        <label className="block text-sm text-slate-300 mb-1">Judul Buku</label>
        <input
            type="text"
            name="judul"
            defaultValue={buku.judul}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        </div>

        <div>
        <label className="block text-sm text-slate-300 mb-1">Penulis</label>
        <input
            type="text"
            name="penulis"
            defaultValue={buku.penulis}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        </div>

        <div>
        <label className="block text-sm text-slate-300 mb-1">Kategori</label>
        <select
            name="kategori"
            defaultValue={buku.kategori}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        >
            <option value="Teknologi">Teknologi</option>
            <option value="Fiksi">Fiksi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
        </select>
        </div>

        <div>
        <label className="block text-sm text-slate-300 mb-1">Tahun Terbit</label>
        <input
            type="number"
            name="tahun"
            defaultValue={buku.tahun}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        </div>

        <div>
        <label className="block text-sm text-slate-300 mb-1">Status Ketersediaan</label>
        <select
            name="tersedia"
            defaultValue={buku.tersedia ? "true" : "false"}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        >
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
        </select>
        </div>

        <div>
        <label className="block text-sm text-slate-300 mb-1">Sinopsis</label>
        <textarea
            name="sinopsis"
            defaultValue={buku.sinopsis}
            rows={3}
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
        />
        </div>

        <div className="flex gap-3 pt-2">
        <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition text-sm"
        >
            Simpan Perubahan
        </button>
        <Link
            href="/katalog"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-5 py-2.5 rounded-lg transition text-sm flex items-center"
        >
            Batal
        </Link>
        </div>
    </form>
    </main>
);
}