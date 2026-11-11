import { notFound } from "next/navigation";
import FormBuku from "@/components/FormBuku";
import pool from "@/lib/db";
import { parseId } from "@/lib/id";
import { ubahBuku } from "@/app/katalog/actions";

export default async function EditBukuPage({ params }) {
  const { id } = await params;

  const idAngka = parseId(id);
  if (idAngka === null) notFound();

  const hasil = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
     FROM buku WHERE id = $1`,
    [idAngka]
  );
  const buku = hasil.rows[0];
  if (!buku) notFound();

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Edit Buku</h1>
      <p className="mt-2 text-plum/70">
        Ubah informasi buku, lalu simpan perubahannya.
      </p>
      <div className="mt-6">
        <FormBuku
          action={ubahBuku.bind(null, buku.id)}
          nilaiAwal={{
            judul: buku.judul,
            penulis: buku.penulis,
            kategori: buku.kategori,
            tahun: String(buku.tahun),
            tersedia: String(buku.tersedia),
            sinopsis: buku.sinopsis,
          }}
          labelTombol="Simpan Perubahan"
          hrefBatal={`/katalog/${buku.id}`}
        />
      </div>
    </section>
  );
}
