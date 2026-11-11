
import pool from "@/lib/db";
import KatalogClient from "@/components/KatalogClient";
import { tambahBuku } from "./actions";

export default async function KatalogPage() {
  const { rows: buku } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia FROM buku ORDER BY id"
  );

  return (
    <div>
      /* Katalog Buku */
      <KatalogClient buku={buku} />

      /* Form Tambah Buku */
      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold">Tambah Buku Baru</h2>

        <form
          action={tambahBuku}
          className="mt-5 grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label className="font-medium">Judul Buku</label>
            <input
              name="judul"
              required
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="font-medium">Penulis</label>
            <input
              name="penulis"
              required
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="font-medium">Kategori</label>
            <select
              name="kategori"
              required
              className="mt-1 w-full rounded-lg border p-2"
            >
              <option value="">Pilih kategori</option>
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
              required
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="font-medium">Status Buku</label>
            <select
              name="tersedia"
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
              required
              rows={3}
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
            >
              Tambahkan Buku
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
