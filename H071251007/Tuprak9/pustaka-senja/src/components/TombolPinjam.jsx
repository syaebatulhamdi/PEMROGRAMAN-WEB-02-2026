"use client";

export default function TombolPinjam({ judul, tersedia }) {
  if (!tersedia) {
    return (
      <button
        disabled
        className="w-full bg-[#B6ADA2]/40 text-[#526161] font-bold py-3 rounded-2xl text-xs cursor-not-allowed flex items-center justify-center gap-2 border border-[#D8D0C5]"
      >
        <span>⏳</span>
        <span>Sedang Dipinjam</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => alert(`Berhasil mengajukan peminjaman buku: "${judul}"`)}
      className="w-full bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-bold py-3 rounded-2xl text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-2"
    >
      <span>📖</span>
      <span>Pinjam Buku Ini</span>
    </button>
  );
}