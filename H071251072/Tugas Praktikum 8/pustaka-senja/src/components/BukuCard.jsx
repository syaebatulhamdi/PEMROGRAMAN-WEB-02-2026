"use client";

import { useState } from "react";
import Link from "next/link";

export default function BukuCard({ buku }) {
const [favorit, setFavorit] = useState(false);

return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between">
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
        <button
        onClick={() => setFavorit(!favorit)}
        className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
            favorit
            ? "bg-amber-500 text-slate-950"
            : "bg-slate-800 hover:bg-slate-700 text-slate-300"
        }`}
        >
        {favorit ? "★ Favorit" : "☆ Simpan"}
        </button>

        <Link
        href={`/katalog/${buku.id}`}
        className="text-sm text-amber-400 hover:underline font-medium"
        >
        Lihat Detail &rarr;
        </Link>
    </div>
    </div>
);
}