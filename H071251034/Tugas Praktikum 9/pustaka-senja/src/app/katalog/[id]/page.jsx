import Link from "next/link";
import { notFound } from "next/navigation";
import Notifikasi from "@/components/Notifikasi";
import TombolHapus from "@/components/TombolHapus";
import pool from "@/lib/db";
import { parseId } from "@/lib/id";
import { warnaSampul } from "@/lib/konstanta";

export default async function DetailBukuPage({ params, searchParams }) {
  const { id } = await params;
  const { pesan } = await searchParams;

  const idAngka = parseId(id);
  if (idAngka === null) notFound();

  const hasil = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
     FROM buku WHERE id = $1`,
    [idAngka]
  );
  const buku = hasil.rows[0];
  if (!buku) notFound();

  const sampul = warnaSampul[(buku.id - 1) % warnaSampul.length];

  return (
    <div className="mx-auto max-w-4xl">
      <Notifikasi kode={pesan} />
      <article className="mt-4 grid gap-8 rounded-[2rem] bg-paper p-6 shadow-sm sm:p-8 md:grid-cols-[16rem_1fr]">
        <div
          className={`${sampul} relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border-l-[14px] border-black/15 p-5 shadow-lg`}
        >
          <span className="absolute right-5 top-0 h-9 w-4 rounded-b-sm bg-honey shadow" />
          <p className="font-display text-2xl font-semibold leading-tight">
            {buku.judul}
          </p>
          <p className="mt-2 text-sm font-semibold opacity-90">
            {buku.penulis}
          </p>
        </div>

        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-cream px-3 py-1 text-xs font-bold text-plum/70">
            {buku.kategori}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {buku.judul}
          </h1>
          <p className="mt-1 text-lg text-plum/70">{buku.penulis}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-semibold text-plum/60">Tahun terbit</dt>
              <dd className="mt-1 font-display text-lg font-semibold">
                {buku.tahun}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-plum/60">Status</dt>
              <dd className="mt-1">
                <span
                  className={
                    buku.tersedia
                      ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"
                      : "inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800"
                  }
                >
                  {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                </span>
              </dd>
            </div>
          </dl>

          <h2 className="mt-6 font-display text-xl font-semibold">Sinopsis</h2>
          <p className="mt-2 max-w-prose leading-relaxed text-plum/80">
            {buku.sinopsis}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/katalog"
              className="rounded-full bg-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-iris"
            >
              Kembali ke Katalog
            </Link>
            <Link
              href={`/katalog/${buku.id}/edit`}
              className="rounded-full border border-plum/20 px-6 py-3 text-sm font-bold text-plum transition hover:bg-cream"
            >
              Edit
            </Link>
            <TombolHapus id={buku.id} judul={buku.judul} />
          </div>
        </div>
      </article>
    </div>
  );
}
