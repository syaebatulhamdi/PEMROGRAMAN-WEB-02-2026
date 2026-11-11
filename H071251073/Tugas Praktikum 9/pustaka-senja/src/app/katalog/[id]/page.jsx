
import Link from "next/link";
import pool from "@/lib/db";
import { notFound } from "next/navigation";

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const idBuku = Number(id);

  if (!Number.isInteger(idBuku) || idBuku < 1) {
    notFound();
  }

  const { rows } = await pool.query(
    "SELECT * FROM buku WHERE id =$1",
    [idBuku]
  );

  const buku = rows[0];

  if (!buku) {
    notFound();
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-8">
      <span
        className={
          buku.tersedia
            ? "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
            : "rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
        }
      >
        {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
      </span>

      <h1 className="mt-4 text-3xl font-bold">
        {buku.judul}
      </h1>

      <p className="mt-1 text-lg text-slate-600">
        {buku.penulis}
      </p>

      <dl className="mt-6 grid max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-2">
        <dt className="text-slate-500">Kategori</dt>
        <dd>{buku.kategori}</dd>

        <dt className="text-slate-500">Tahun terbit</dt>
        <dd>{buku.tahun}</dd>
      </dl>

      <h2 className="mt-6 text-xl font-semibold">
        Sinopsis
      </h2>

      <p className="mt-2 max-w-prose leading-relaxed text-slate-700">
        {buku.sinopsis}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/katalog/${id}/edit`}
          className="rounded-lg bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
        >
          Edit Buku
        </Link>

        <Link
          href="/katalog"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
        >
          Kembali ke Katalog
        </Link>
      </div>
    </article>
  );
}
