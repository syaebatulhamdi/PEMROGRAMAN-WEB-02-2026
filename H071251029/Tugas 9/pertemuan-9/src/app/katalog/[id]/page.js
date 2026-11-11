import Link from "next/link";
import { notFound } from "next/navigation";
import TombolHapus from "@/components/TombolHapus";
import { getBukuById } from "@/lib/buku";
import { parseId } from "@/lib/validasi";

export const dynamic = "force-dynamic";

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const idAngka = parseId(id);
  if (idAngka === null) notFound();

  const buku = await getBukuById(idAngka);
  if (!buku) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <Link href="/katalog" className="font-bold text-violet-600 hover:text-pink-500">← Kembali ke Katalog</Link>
      <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-violet-100">
        <div className="h-3 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-600" />
        <div className="p-7 md:p-10">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">{buku.kategori}</span>
          <h2 className="mt-5 text-4xl font-black text-violet-900 md:text-5xl">{buku.judul}</h2>
          <p className="mt-2 text-lg font-semibold text-pink-500">{buku.penulis} · {buku.tahun}</p>
          <div className="mt-7 rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-violet-500">Status</p>
            <p className={`mt-2 font-black ${buku.tersedia ? "text-emerald-600" : "text-rose-600"}`}>{buku.tersedia ? "✓ Tersedia untuk dibaca" : "• Sedang dipinjam"}</p>
          </div>
          <h3 className="mt-8 text-xl font-black text-violet-900">Sinopsis</h3>
          <p className="mt-3 leading-8 text-gray-600">{buku.sinopsis}</p>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-violet-100 pt-6">
            <Link href={`/katalog/${buku.id}/edit`} className="rounded-xl bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-100">✏️ Edit Buku</Link>
            <TombolHapus id={buku.id} judul={buku.judul} />
          </div>
        </div>
      </article>
    </div>
  );
}
