"use client";

import { useState } from "react";

export default function UsulanPage() {
  // State untuk controlled component formulir
  const [nama, setNama] = useState("");
  const [judulBuku, setJudulBuku] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [alasan, setAlasan] = useState("");

  // State untuk penanganan validasi, pesan status, dan daftar usulan sesi
  const [errorPesan, setErrorPesan] = useState("");
  const [suksesPesan, setSuksesPesan] = useState("");
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman bawaan browser
    setErrorPesan("");
    setSuksesPesan("");

    // Validasi: Pastikan semua input terisi setelah di-trim()
    if (!nama.trim() || !judulBuku.trim() || !alasan.trim()) {
      setErrorPesan("Mohon lengkapi seluruh kolom formulir usulan buku!");
      return;
    }

    // Buat objek usulan baru
    const usulanBaru = {
      id: Date.now().toString(),
      nama: nama.trim(),
      judulBuku: judulBuku.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    // Tambahkan usulan baru ke daftar usulan sesi ini
    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setSuksesPesan("Terima kasih! Usulan buku Anda berhasil dikirim ke pengelola Pustaka Senja.");

    // Kosongkan kembali seluruh input formulir
    setNama("");
    setJudulBuku("");
    setKategori("Teknologi");
    setAlasan("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Halaman Usulan */}
      <div className="mb-8 text-center">
        <span className="inline-block bg-[#6F3742]/10 text-[#6F3742] text-xs font-semibold px-3 py-1 rounded-full mb-2">
          ✍️ Partisipasi Komunitas
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1D2B38]">Usulkan Buku Baru</h1>
        <p className="text-[#526161] text-sm md:text-base mt-2">
          Punya rekomendasi buku menarik yang belum ada di katalog kami? Kirimkan usulanmu agar dapat kami hadirkan di Pustaka Senja!
        </p>
      </div>

      {/* Formulir Usulan Buku */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#B6ADA2]/15 border border-[#526161]/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-5 mb-10"
      >
        {/* Pesan Error Validasi */}
        {errorPesan && (
          <div className="p-4 bg-[#C36765]/10 border border-[#C36765]/30 text-[#6F3742] text-sm rounded-xl font-medium">
            ⚠️ {errorPesan}
          </div>
        )}

        {/* Pesan Konfirmasi Sukses */}
        {suksesPesan && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm rounded-xl font-medium">
            🎉 {suksesPesan}
          </div>
        )}

        {/* Input Nama Pengusul */}
        <div>
          <label className="block text-sm font-semibold text-[#1D2B38] mb-1.5">
            Nama Pengusul <span className="text-[#C36765]">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full bg-white/70 border border-[#526161]/30 rounded-xl px-4 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:border-[#6F3742] focus:ring-1 focus:ring-[#6F3742] transition"
          />
        </div>

        {/* Input Judul Buku */}
        <div>
          <label className="block text-sm font-semibold text-[#1D2B38] mb-1.5">
            Judul Buku yang Diusulkan <span className="text-[#C36765]">*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Pragmatic Programmer"
            value={judulBuku}
            onChange={(e) => setJudulBuku(e.target.value)}
            className="w-full bg-white/70 border border-[#526161]/30 rounded-xl px-4 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:border-[#6F3742] focus:ring-1 focus:ring-[#6F3742] transition"
          />
        </div>

        {/* Choice Kategori */}
        <div>
          <label className="block text-sm font-semibold text-[#1D2B38] mb-1.5">
            Kategori Buku
          </label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full bg-white/70 border border-[#526161]/30 rounded-xl px-4 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:border-[#6F3742] focus:ring-1 focus:ring-[#6F3742] transition cursor-pointer"
          >
            <option value="Teknologi">Teknologi</option>
            <option value="Fiksi">Fiksi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* Input Alasan Usulan */}
        <div>
          <label className="block text-sm font-semibold text-[#1D2B38] mb-1.5">
            Alasan Usulan <span className="text-[#C36765]">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Tuliskan alasan mengapa buku ini sangat bagus untuk dikoleksi Pustaka Senja..."
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className="w-full bg-white/70 border border-[#526161]/30 rounded-xl px-4 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:border-[#6F3742] focus:ring-1 focus:ring-[#6F3742] transition resize-none"
          />
        </div>

        {/* Tombol Submit Form */}
        <button
          type="submit"
          className="w-full bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-medium py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Kirim Usulan Buku</span>
          <span>&rarr;</span>
        </button>
      </form>

      {/* Daftar Usulan yang Dikirim Selama Sesi Berlangsung */}
      {daftarUsulan.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#1D2B38] mb-4 flex items-center gap-2">
            <span>📋</span> Daftar Usulan Baru (Sesi Ini)
          </h2>
          <div className="space-y-4">
            {daftarUsulan.map((item) => (
              <div
                key={item.id}
                className="bg-[#B6ADA2]/10 border border-[#526161]/20 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#1D2B38] text-base">{item.judulBuku}</h3>
                  <span className="text-xs bg-[#6F3742]/10 text-[#6F3742] font-semibold px-2.5 py-0.5 rounded-full">
                    {item.kategori}
                  </span>
                </div>
                <p className="text-xs text-[#526161] font-medium mb-2">
                  Diusulkan oleh: <span className="text-[#1D2B38]">{item.nama}</span>
                </p>
                <p className="text-sm text-[#526161] italic bg-white/50 p-3 rounded-xl border border-[#526161]/10">
                  &ldquo;{item.alasan}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}