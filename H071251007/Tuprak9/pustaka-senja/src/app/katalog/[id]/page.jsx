import pool from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import TombolFavorit from "@/components/TombolFavorit";
import TombolPinjam from "@/components/TombolPinjam";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  const buku = rows[0];

  if (!buku) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#ECE7E1] p-4 md:p-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#F7F4EF] border border-[#DCD5CB] rounded-[36px] shadow-2xl p-6 md:p-10 text-left">
        
        {/* Navigation & Tombol Favorit (Ikon Kucing) */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#526161] hover:text-[#1D2B38] transition"
          >
            <span>&larr;</span>
            <span>Kembali ke Katalog</span>
          </Link>

          <TombolFavorit bukuId={buku.id} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Cover Buku */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-48 h-68 rounded-2xl overflow-hidden shadow-xl bg-white border border-[#D8D0C5]">
              <img
                src={buku.cover || `/book${buku.id}.png`}
                alt={buku.judul}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Informasi Lengkap Buku */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-white bg-[#6F3742] px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                {buku.kategori}
              </span>
              <h1 className="text-2xl font-extrabold text-[#1D2B38] leading-tight">
                {buku.judul}
              </h1>
              <p className="text-sm text-[#526161] mt-1">
                Oleh <strong className="text-[#1D2B38]">{buku.penulis}</strong> ({buku.tahun})
              </p>
            </div>

            {/* Teks Sinopsis Lengkap */}
            <div className="bg-white/80 border border-[#D8D0C5] rounded-2xl p-4 text-xs space-y-1.5">
              <span className="font-bold text-[#1D2B38] block">Sinopsis Lengkap:</span>
              <p className="text-[#526161] leading-relaxed">
                {buku.sinopsis}
              </p>
            </div>

            {/* Status Ketersediaan */}
            <div className="flex items-center justify-between bg-[#ECE7E1]/50 border border-[#D8D0C5] px-4 py-2.5 rounded-xl text-xs">
              <span className="text-[#526161]">Status Ketersediaan:</span>
              <span className={`font-bold ${buku.tersedia ? "text-emerald-700" : "text-rose-700"}`}>
                {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
              </span>
            </div>

            {/* Tombol Aksi Pinjam (Client Component) */}
            <TombolPinjam judul={buku.judul} tersedia={buku.tersedia} />

          </div>
        </div>

      </div>
    </div>
  );
}