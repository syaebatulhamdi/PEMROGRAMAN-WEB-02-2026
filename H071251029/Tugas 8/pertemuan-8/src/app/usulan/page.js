"use client";

import { useState } from "react";

const formAwal = { nama: "", judul: "", kategori: "Teknologi", alasan: "" };

export default function UsulanPage() {
  const [form, setForm] = useState(formAwal);
  const [usulan, setUsulan] = useState([]);
  const [pesan, setPesan] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setPesan("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const semuaTerisi = Object.values(form).every((value) => value.trim() !== "");
    if (!semuaTerisi) {
      setPesan("⚠️ Semua kolom wajib diisi terlebih dahulu.");
      return;
    }
    setUsulan([...usulan, form]);
    setForm(formAwal);
    setPesan("✅ Usulan buku berhasil dikirim. Terima kasih!");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      <div className="grid gap-7 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#f6c9df] via-[#efd5ea] to-[#d9cef3] text-[#4b365c] p-8 shadow-xl shadow-[#eadcf0]">
          <p className="font-bold text-[#7b526d]">💌 Punya rekomendasi?</p>
          <h2 className="mt-3 text-4xl font-black">Usulkan Buku</h2>
          <p className="mt-4 leading-7 text-[#654d6e]">Bantu Pustaka Senja menambah koleksi yang seru dan bermanfaat untuk komunitas.</p>
          <div className="mt-8 rounded-2xl bg-white/50 p-5 backdrop-blur"><p className="text-sm font-semibold text-[#7b526d]">Tips</p><p className="mt-2 font-bold">Isi alasan dengan singkat, jelas, dan sesuai kebutuhan pembaca.</p></div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#e9def1] md:p-9">
          <div className="space-y-5">
            <div><label className="mb-2 block font-bold text-[#5b3f69]">Nama Pengusul</label><input name="nama" value={form.nama} onChange={handleChange} className="w-full rounded-xl border border-[#eadff2] bg-[#f4effa]/50 px-4 py-3 outline-none focus:border-[#e8a9c9]" placeholder="Masukkan nama" /></div>
            <div><label className="mb-2 block font-bold text-[#5b3f69]">Judul Buku</label><input name="judul" value={form.judul} onChange={handleChange} className="w-full rounded-xl border border-[#eadff2] bg-[#f4effa]/50 px-4 py-3 outline-none focus:border-[#e8a9c9]" placeholder="Judul buku yang diusulkan" /></div>
            <div><label className="mb-2 block font-bold text-[#5b3f69]">Kategori</label><select name="kategori" value={form.kategori} onChange={handleChange} className="w-full rounded-xl border border-[#eadff2] bg-[#f4effa]/50 px-4 py-3 outline-none focus:border-[#e8a9c9]"><option>Teknologi</option><option>Fiksi</option><option>Pengembangan Diri</option></select></div>
            <div><label className="mb-2 block font-bold text-[#5b3f69]">Alasan Usulan</label><textarea name="alasan" value={form.alasan} onChange={handleChange} rows="4" className="w-full rounded-xl border border-[#eadff2] bg-[#f4effa]/50 px-4 py-3 outline-none focus:border-[#e8a9c9]" placeholder="Kenapa buku ini perlu ditambahkan?" /></div>
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#eeb8d5] to-[#c9b8ed] px-5 py-3.5 font-black text-[#5b3f69] shadow-lg hover:brightness-105">Kirim Usulan </button>
            {pesan && <p className={`rounded-xl px-4 py-3 text-sm font-bold ${pesan.startsWith("⚠️") ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-[#3f8061]"}`}>{pesan}</p>}
          </div>
        </form>
      </div>

      {usulan.length > 0 && <section className="mt-10"><h3 className="text-2xl font-black text-[#493453]">Usulan di Sesi Ini</h3><div className="mt-4 grid gap-4 md:grid-cols-2">{usulan.map((item, index) => <div key={`${item.judul}-${index}`} className="rounded-2xl bg-white p-5 shadow-sm"><span className="rounded-full bg-[#f9dce9] px-3 py-1 text-xs font-bold text-[#a55279]">{item.kategori}</span><h4 className="mt-3 font-black text-[#493453]">{item.judul}</h4><p className="text-sm text-gray-500">oleh {item.nama}</p><p className="mt-2 text-sm leading-6 text-gray-600">{item.alasan}</p></div>)}</div></section>}
    </div>
  );
}
