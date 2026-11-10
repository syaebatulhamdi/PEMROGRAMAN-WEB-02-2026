import Link from "next/link";
import pool from "@/lib/db";
import { ubahBuku } from "../../action"; 

export default async function EditBukuPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Ambil data buku yang mau diedit dari database
  const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);

  if (rows.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-10 text-center">
        <p className="text-sm font-semibold mb-4">Buku tidak ditemukan.</p>
        <Link href="/katalog" className="bg-[#6F3742] text-white text-xs px-4 py-2 rounded-xl">
          ← Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const buku = rows[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1D2B38] p-6 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Tombol Kembali */}
        <Link
          href="/katalog"
          className="inline-block text-xs font-medium text-[#526161] hover:text-[#6F3742] transition"
        >
          ← Kembali ke Katalog
        </Link>

        {/* Form Edit */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#D8D0C5] space-y-6">
          <h1 className="text-xl font-bold text-[#1D2B38]">Ubah Data Buku</h1>

          <form action={ubahBuku} className="space-y-4">
            {/* Input tersembunyi untuk membawa ID buku */}
            <input type="hidden" name="id" value={buku.id} />

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#526161]">Judul Buku</label>
              <input
                name="judul"
                type="text"
                defaultValue={buku.judul}
                required
                className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#526161]">Penulis</label>
              <input
                name="penulis"
                type="text"
                defaultValue={buku.penulis}
                required
                className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526161]">Kategori</label>
                <select
                  name="kategori"
                  defaultValue={buku.kategori}
                  required
                  className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40 cursor-pointer"
                >
                  <option value="Fiksi">Fiksi</option>
                  <option value="Non-Fiksi">Non-Fiksi</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Bisnis & Manajemen">Bisnis & Manajemen</option>
                  <option value="Sains">Sains</option>
                  <option value="Sejarah">Sejarah</option>
                  <option value="Novel">Novel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526161]">Tahun Terbit</label>
                <input
                  name="tahun"
                  type="text"
                  defaultValue={buku.tahun}
                  required
                  className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526161]">Status Ketersediaan</label>
                <select
                  name="tersedia"
                  defaultValue={buku.tersedia ? "true" : "false"}
                  required
                  className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40 cursor-pointer"
                >
                  <option value="true">Tersedia</option>
                  <option value="false">Dipinjam</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#526161]">Sinopsis</label>
              <textarea
                name="sinopsis"
                rows="4"
                defaultValue={buku.sinopsis || ""}
                className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link
                href="/katalog"
                className="bg-[#F3EFEA] text-[#1D2B38] font-semibold py-3 px-6 rounded-xl text-sm transition text-center"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-semibold py-3 px-6 rounded-xl text-sm transition shadow-sm cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}