
import pool from "@/lib/db";
import { notFound } from "next/navigation";
import { ubahBuku } from "../../actions";
import Link from "next/link";

export default async function EditBuku({ params }) {
  const { id } = await params;
  const idBuku = Number(id);

  if (!Number.isInteger(idBuku) || idBuku < 1) {
    notFound();
  }

  const { rows } = await pool.query(
    "SELECT * FROM buku WHERE id = $1",
    [idBuku]
  );

  const buku = rows[0];

  if (!buku) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Buku</h1>

      <p className="mt-1 text-slate-600">
        Ubah informasi buku yang dipilih.
      </p>

      <form
        action={ubahBuku}
        className="mt-6 max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <input type="hidden" name="id" value={buku.id} />

        <div>
          <label className="font-medium">Judul Buku</label>
          <input
            name="judul"
            defaultValue={buku.judul}
            required
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="font-medium">Penulis</label>
          <input
            name="penulis"
            defaultValue={buku.penulis}
            required
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="font-medium">Kategori</label>
          <select
            name="kategori"
            defaultValue={buku.kategori}
            required
            className="mt-1 w-full rounded-lg border p-2"
          >
            <option value="Teknologi">Teknologi</option>
            <option value="Fiksi">Fiksi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Tahun Terbit</label>
          <input
            type="number"
            name="tahun"
            min="1000"
            max="9999"
            defaultValue={buku.tahun}
            required
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="font-medium">Status Buku</label>
          <select
            name="tersedia"
            defaultValue={String(buku.tersedia)}
            required
            className="mt-1 w-full rounded-lg border p-2"
          >
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Sinopsis</label>
          <textarea
            name="sinopsis"
            defaultValue={buku.sinopsis}
            rows={4}
            required
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
          >
            Simpan Perubahan
          </button>

          <Link
            href="/katalog"
            className="rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
