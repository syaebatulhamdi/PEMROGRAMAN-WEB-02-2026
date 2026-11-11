import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import Notifikasi from "@/components/Notifikasi";
import pool from "@/lib/db";
import { daftarKategori } from "@/lib/konstanta";

export const dynamic = "force-dynamic";

export default async function KatalogPage({ searchParams }) {
  const { kategori, pesan } = await searchParams;

  const kategoriAktif = daftarKategori.includes(kategori) ? kategori : "Semua";

  const hasil =
    kategoriAktif === "Semua"
      ? await pool.query(
          `SELECT id, judul, penulis, kategori, tahun, tersedia
           FROM buku ORDER BY id`
        )
      : await pool.query(
          `SELECT id, judul, penulis, kategori, tahun, tersedia
           FROM buku WHERE kategori = $1 ORDER BY id`,
          [kategoriAktif]
        );
  const daftarBuku = hasil.rows;

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Katalog Buku
          </h1>
          <p className="mt-2 max-w-xl text-plum/70">
            Jelajahi seluruh koleksi Pustaka Senja, lalu simpan buku yang kamu
            suka.
          </p>
        </div>
        <Link
          href="/katalog/tambah"
          className="rounded-full bg-linear-to-r bg-iris px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
        >
          + Tambah Buku
        </Link>
      </div>

      <Notifikasi kode={pesan} />

      <div className="mt-6 flex flex-wrap gap-2">
        {daftarKategori.map((item) => (
          <Link
            key={item}
            href={item === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(item)}`}
            aria-current={kategoriAktif === item ? "true" : undefined}
            className={
              kategoriAktif === item
                ? "rounded-full bg-linear-to-r bg-iris px-5 py-2 text-sm font-bold text-white shadow-sm"
                : "rounded-full bg-paper px-5 py-2 text-sm font-semibold text-plum/70 transition hover:text-plum"
            }
          >
            {item}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-sm font-semibold text-plum/70">
        Menampilkan {daftarBuku.length} buku
      </p>

      {daftarBuku.length === 0 ? (
        <p className="mt-4 rounded-3xl bg-paper px-6 py-10 text-center text-plum/70 shadow-sm">
          Belum ada buku di kategori ini.
        </p>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {daftarBuku.map((buku) => (
            <BukuCard
              key={buku.id}
              id={buku.id}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.kategori}
              tahun={buku.tahun}
              tersedia={buku.tersedia}
            />
          ))}
        </div>
      )}
    </section>
  );
}
