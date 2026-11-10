import Link from "next/link";
import pool from "@/lib/db";
import { tambahBuku, hapusBuku } from "./action";

export default async function KatalogPage() {
  const { rows: books } = await pool.query("SELECT * FROM buku ORDER BY id ASC");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1D2B38] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl shadow-sm border border-[#D8D0C5] gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1D2B38]">Katalog Pustaka Senja</h1>
          </div>
          <Link
            href="/"
            className="bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-medium text-xs py-2 px-4 rounded-xl transition shadow-sm"
          >
            ← Beranda
          </Link>
        </div>

        {/* FORM TAMBAH BUKU */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#D8D0C5] space-y-4">
          <h2 className="text-sm font-bold text-[#1D2B38] flex items-center gap-2">
            <span className="text-[#6F3742] text-lg">+</span> TAMBAH KOLEKSI BUKU BARU KE DATABASE
          </h2>

          <form action={tambahBuku} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            <input
              name="judul"
              type="text"
              placeholder="Judul Buku"
              required
              className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
            />
            
            <input
              name="penulis"
              type="text"
              placeholder="Penulis"
              required
              className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
            />

            <div className="relative">
              <select
                name="kategori"
                required
                defaultValue=""
                className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40 appearance-none cursor-pointer"
              >
                <option value="" disabled>Pilih Kategori</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Sains">Pengembangan Diri</option>
                <option value="Novel">Lainnya</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-[#526161]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <input
              name="tahun"
              type="text"
              inputMode="numeric"
              placeholder="Tahun (cth: 2026)"
              required
              className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
            />

            <select
              name="tersedia"
              required
              className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-2.5 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40 cursor-pointer"
            >
              <option value="true">Tersedia</option>
              <option value="false">Dipinjam</option>
            </select>

            <input
                name="coverFile"
                type="file"
                accept="image/*"
                className="lg:col-span-2 bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-2 text-sm text-[#1D2B38] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6F3742] file:text-white hover:file:bg-[#6F3742]/80 cursor-pointer"
            />

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 items-center">
              <div className="lg:col-span-82">
                <input
                  name="sinopsis"
                  type="text"
                  placeholder="Sinopsis singkat buku..."
                  className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
                />
              </div>
              <div className="lg:col-span-12">
                <button
                  type="submit"
                  className="w-full bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-sm cursor-pointer text-center"
                >
                  Simpan Buku
                </button>
              </div>
            </div>
          </form>
        </div>


        {/* GRID KARTU BUKU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((buku) => {
            const coverSrc = buku.cover && buku.cover.trim() !== "" && buku.cover !== "null" 
              ? buku.cover 
              : `/book${buku.id}.png`;

            return (
              <div key={buku.id} className="bg-white p-4 rounded-3xl shadow-sm border border-[#D8D0C5] flex flex-col justify-between transition hover:shadow-md">
                <div>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#F3EFEA] mb-3 border border-[#D8D0C5]/50 flex items-center justify-center">
                    <img
                      src={coverSrc}
                      alt={buku.judul}
                      className="w-full h-full object-cover"
                    />
                    {!buku.tersedia && (
                      <span className="absolute top-2 right-2 bg-[#E11D48] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        Dipinjam
                      </span>
                    )}
                  </div>
                  
                  <span className="inline-block bg-[#6F3742]/10 text-[#6F3742] text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-1">
                    {buku.kategori}
                  </span>
                  
                  <h3 className="font-bold text-sm text-[#1D2B38] line-clamp-1">{buku.judul}</h3>
                  <p className="text-xs text-[#526161] line-clamp-1">Oleh {buku.penulis} ({buku.tahun})</p>
                </div>

                {/* KELOMPOK TOMBOL ACTION (HANYA IKON SVG BERSIH) */}
                <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-[#F3EFEA]">
                  {/* 1. Tombol Detail */}
                  <Link
                    href={`/katalog/${buku.id}`}
                    className="p-2 text-[#1D2B38] hover:bg-[#1D2B38]/10 rounded-full transition"
                    title="Lihat Detail Buku"
                  >
                    <img src="/detail.svg" alt="Detail" className="w-4 h-4" />
                  </Link>

                  {/* 2. Tombol Edit */}
                  <Link
                    href={`/katalog/${buku.id}/edit`}
                    className="p-2 text-[#D97706] hover:bg-[#D97706]/10 rounded-full transition"
                    title="Ubah Data Buku"
                  >
                    <img src="/edit.svg" alt="Edit" className="w-4 h-4" />
                  </Link>

                  {/* 3. Tombol Hapus */}
                  <form action={hapusBuku}>
                    <input type="hidden" name="id" value={buku.id} />
                    <button
                      type="submit"
                      className="p-2 text-[#E11D48] hover:bg-[#E11D48]/10 rounded-full transition cursor-pointer"
                      title="Hapus Buku"
                    >
                      <img src="/delete.svg" alt="Hapus" className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}