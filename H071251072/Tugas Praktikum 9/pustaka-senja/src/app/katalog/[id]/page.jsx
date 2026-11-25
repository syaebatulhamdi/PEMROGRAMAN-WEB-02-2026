import Link from "next/link";
import { notFound } from "next/navigation";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
const { id } = await params;

if (!Number.isInteger(Number(id))) {
    notFound();
}

  const result = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
const buku = result.rows[0];

if (!buku) {
    return (
    <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
        <h1 className="text-2xl font-bold text-rose-400 mb-4">
        Buku dengan ID &quot;{id}&quot; tidak ditemukan!
        </h1>
        <Link href="/katalog" className="text-amber-400 hover:underline">
        &larr; Kembali ke Katalog
        </Link>
    </div>
    );
}

return (
    <article className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
    <div className="flex justify-between items-start mb-4">
        <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-medium">
        {buku.kategori}
        </span>
        <span
        className={`text-xs px-3 py-1 rounded-full font-medium ${
            buku.tersedia
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        }`}
        >
        {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
    </div>

    <h1 className="text-3xl font-bold mb-2 text-white">{buku.judul}</h1>
    <p className="text-slate-400 text-sm mb-1">Penulis: {buku.penulis}</p>
    <p className="text-slate-500 text-xs mb-6">Tahun Terbit: {buku.tahun}</p>

    <div className="border-t border-slate-800 pt-4 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-slate-200">Sinopsis</h2>
        <p className="text-slate-300 leading-relaxed text-sm">{buku.sinopsis}</p>
    </div>

    <Link
        href="/katalog"
        className="inline-block bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition"
    >
        &larr; Kembali ke Katalog
    </Link>
    </article>
);
}