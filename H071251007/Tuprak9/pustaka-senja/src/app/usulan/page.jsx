import Link from "next/link";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

// Server Action untuk menyimpan usulan beserta timestamp secara permanen
async function kirimUsulan(formData) {
  "use server";
  const namaPengusul = formData.get("nama_pengusul");
  const judul = formData.get("judul");
  const penulis = formData.get("penulis");
  const kategori = formData.get("kategori");
  const alasan = formData.get("alasan");

  if (!judul || !penulis || !namaPengusul) return;

  await pool.query(
    "INSERT INTO usulan_buku (nama_pengusul, judul, penulis, kategori, alasan) VALUES ($1, $2, $3, $4, $5)",
    [namaPengusul, judul, penulis, kategori, alasan]
  );

  revalidatePath("/usulan");
}

// Server Action untuk menghapus usulan
async function hapusUsulan(formData) {
  "use server";
  const id = formData.get("id");

  await pool.query("DELETE FROM usulan_buku WHERE id = $1", [id]);

  revalidatePath("/usulan");
}

// Fungsi helper untuk memformat tanggal ke format Indonesia
function formatTanggal(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function UsulanPage() {
  // Ambil data usulan secara permanen dari PostgreSQL
  const { rows: usulanList } = await pool.query("SELECT * FROM usulan_buku ORDER BY id DESC");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1D2B38] p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl shadow-sm border border-[#D8D0C5] gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1D2B38]">Usulan Buku Pustaka Senja</h1>
            <p className="text-sm text-[#526161] mt-1">
              Kirimkan rekomendasi literasi impianmu.
            </p>
          </div>
          <Link
            href="/katalog"
            className="bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-medium text-xs py-2 px-4 rounded-xl transition shadow-sm"
          >
            ← Kembali ke Katalog
          </Link>
        </div>

        {/* FORM USULAN */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#D8D0C5] space-y-4">
          <h2 className="text-lg font-bold text-[#1D2B38] flex items-center gap-2">
            <span className="text-[#6F3742] text-2xl">+</span> FORMULIR USULAN BUKU BARU
          </h2>

          <form action={kirimUsulan} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                name="nama_pengusul"
                type="text"
                placeholder="Nama Pengusul"
                required
                className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              />
              <input
                name="judul"
                type="text"
                placeholder="Judul Buku"
                required
                className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              />
              <input
                name="penulis"
                type="text"
                placeholder="Penulis Buku"
                required
                className="bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              />
              <div className="relative">
                <select
                  name="kategori"
                  required
                  defaultValue=""
                  className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="Fiksi">Fiksi</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Pengembangan Diri">Pengembangan Diri</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-[#526161]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <textarea
                name="alasan"
                placeholder="Alasan Usulan..."
                rows="2"
                required
                className="w-full bg-white border border-[#D8D0C5] rounded-xl px-3.5 py-3 text-sm text-[#1D2B38] focus:outline-none focus:ring-2 focus:ring-[#6F3742]/40"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#6F3742] hover:bg-[#6F3742]/90 text-white font-semibold py-3 px-6 rounded-xl text-sm transition shadow-sm cursor-pointer"
              >
                Kirim Usulan
              </button>
            </div>
          </form>
        </div>

        {/* DAFTAR USULAN PERMANEN */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#D8D0C5] space-y-4">
          <h2 className="text-lg font-bold text-[#1D2B38]">DAFTAR USULAN PENGGUNA ({usulanList.length})</h2>
          
          {usulanList.length === 0 ? (
            <p className="text-sm text-[#526161] py-4 text-center">Belum ada usulan buku yang dikirimkan.</p>
          ) : (
            <div className="space-y-3">
              {usulanList.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-[#FDFBF7] border border-[#D8D0C5]/60 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#6F3742]/10 text-[#6F3742] text-[15px] font-semibold px-2.5 py-0.5 rounded-full">
                        {item.kategori}
                      </span>
                      <h3 className="font-bold text-lg text-[#1D2B38]">{item.judul}</h3>
                    </div>
                    <p className="text-sm text-[#526161]">
                      Oleh <span className="font-medium text-[#1D2B38]">{item.penulis}</span> • Diusulkan oleh <span className="font-semibold text-[#6F3742]">{item.nama_pengusul}</span>
                    </p>
                    {item.alasan && <p className="text-lg text-[#1D2B38]/80 italic mt-1">&quot;{item.alasan}&quot;</p>}
                    
                    {/* Tampilkan Tanggal Usulan Dikirim */}
                    <p className="text-[13px] text-[#526161]/80 pt-1">
                      📅 Dikirim pada: {formatTanggal(item.created_at)}
                    </p>
                  </div>

                  {/* Tombol Hapus Usulan */}
                  <form action={hapusUsulan}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="bg-red-400/10 hover:bg-red-400 text-red-400 hover:text-white font-medium py-1.5 px-3 rounded-xl text-sm transition cursor-pointer flex items-center gap-1"
                      title="Hapus Usulan"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}