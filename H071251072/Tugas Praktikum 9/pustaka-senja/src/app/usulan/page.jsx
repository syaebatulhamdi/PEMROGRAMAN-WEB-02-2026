"use client";

import { useState } from "react";

export default function UsulanPage() {
const [nama, setNama] = useState("");
const [judul, setJudul] = useState("");
const [kategori, setKategori] = useState("Teknologi");
const [alasan, setAlasan] = useState("");

const [pesanError, setPesanError] = useState("");
const [pesanSukses, setPesanSukses] = useState(false);
const [daftarUsulan, setDaftarUsulan] = useState([]);

function handleSubmit(e) {
    e.preventDefault();

    if (!nama.trim() || !judul.trim() || !alasan.trim()) {
    setPesanError("Semua kolom formulir wajib diisi!");
    setPesanSukses(false);
    return;
    }

    const usulanBaru = {
    id: Date.now(),
    nama,
    judul,
    kategori,
    alasan,
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPesanSukses(true);
    setPesanError("");

    setNama("");
    setJudul("");
    setKategori("Teknologi");
    setAlasan("");
}

return (
    <section className="max-w-xl mx-auto">
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mb-8">
        <h1 className="text-2xl font-bold mb-2">Usulkan Buku Baru</h1>
        <p className="text-slate-400 text-sm mb-6">
        Bantu Pustaka Senja menghadirkan koleksi buku impian Anda.
        </p>

        {pesanError && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-lg">
            {pesanError}
        </div>
        )}

        {pesanSukses && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg">
            Terima kasih! Usulan buku Anda berhasil dikirim.
        </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm text-slate-300 mb-1">
            Nama Pengusul
            </label>
            <input
            type="text"
            placeholder="Masukkan nama Anda"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
        </div>

        <div>
            <label className="block text-sm text-slate-300 mb-1">
            Judul Buku
            </label>
            <input
            type="text"
            placeholder="Judul buku yang diusulkan"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
        </div>

        <div>
            <label className="block text-sm text-slate-300 mb-1">Kategori</label>
            <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
            >
            <option value="Teknologi">Teknologi</option>
            <option value="Fiksi">Fiksi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
            </select>
        </div>

        <div>
            <label className="block text-sm text-slate-300 mb-1">
            Alasan Usulan
            </label>
            <textarea
            rows={3}
            placeholder="Mengapa buku ini menarik untuk dibaca?"
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition"
        >
            Kirim Usulan
        </button>
        </form>
    </div>

      {/* Daftar Usulan yang Baru Terkirim */}
    {daftarUsulan.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-white">
            Usulan Anda Sesi Ini
        </h2>
        <div className="space-y-3">
            {daftarUsulan.map((item) => (
            <div
                key={item.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-xl"
            >
                <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-amber-400">{item.judul}</h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {item.kategori}
                </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">
                Pengusul: {item.nama}
                </p>
                <p className="text-sm text-slate-300">{item.alasan}</p>
            </div>
            ))}
        </div>
        </div>
    )}
    </section>
);
}