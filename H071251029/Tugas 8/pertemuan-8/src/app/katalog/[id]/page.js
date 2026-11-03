import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === Number(id));

  if (!buku) {
    return <div className="mx-auto max-w-3xl px-5 py-16 text-center"><div className="rounded-3xl bg-white p-10 shadow-lg"><p className="text-5xl">🔎</p><h2 className="mt-4 text-3xl font-black text-[#493453]">Buku tidak ditemukan</h2><p className="mt-2 text-gray-500">ID buku yang kamu cari tidak tersedia.</p><Link href="/katalog" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-[#eeb8d5] to-[#c9b8ed] px-5 py-3 font-bold text-[#5b3f69]">← Kembali ke Katalog</Link></div></div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <Link href="/katalog" className="font-bold text-[#765c87] hover:text-[#c16b96]">← Kembali ke Katalog</Link>
      <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#e9def1]">
        <div className="h-3 bg-gradient-to-r from-[#f3b9d7] via-[#e5c8ee] to-[#cdbcf0]" />
        <div className="p-7 md:p-10">
          <span className="rounded-full bg-[#eee6f7] px-4 py-2 text-sm font-bold text-[#674d78]">{buku.kategori}</span>
          <h2 className="mt-5 text-4xl font-black text-[#493453] md:text-5xl">{buku.judul}</h2>
          <p className="mt-2 text-lg font-semibold text-[#c16b96]">{buku.penulis} · {buku.tahun}</p>
          <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#fff1f7] to-[#f2edfb] p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-[#846b95]">Status</p>
            <p className={`mt-2 font-black ${buku.tersedia ? "text-[#3f8061]" : "text-[#a65370]"}`}>{buku.tersedia ? "✓ Tersedia untuk dibaca" : "• Sedang dipinjam"}</p>
          </div>
          <h3 className="mt-8 text-xl font-black text-[#493453]">Sinopsis</h3>
          <p className="mt-3 leading-8 text-gray-600">{buku.sinopsis}</p>
        </div>
      </article>
    </div>
  );
}
