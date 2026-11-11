"use client";

import { useActionState } from "react";
import Link from "next/link";
import { daftarKategori } from "@/lib/konstanta";

const pilihanKategori = daftarKategori.filter((k) => k !== "Semua");

const kelasInput =
  "w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-plum placeholder:text-plum/40 focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris/30";

function Galat({ pesan }) {
  if (!pesan) return null;
  return <p className="mt-1 text-xs font-semibold text-coral">{pesan}</p>;
}

// Form dipakai bersama oleh halaman Tambah dan Edit.
// "action" adalah Server Action; hasil validasinya dibaca lewat useActionState.
function FormBuku({ action, nilaiAwal, labelTombol, hrefBatal }) {
  const [state, formAction, pending] = useActionState(action, {
    errors: {},
    values: nilaiAwal,
  });
  const v = state.values;
  const e = state.errors;

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-[2rem] bg-paper p-6 shadow-sm"
    >
      {e.umum && (
        <p
          role="alert"
          className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-900"
        >
          {e.umum}
        </p>
      )}

      <div>
        <label htmlFor="judul" className="mb-1 block text-sm font-bold">
          Judul Buku
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          defaultValue={v.judul}
          placeholder="Contoh: Sapiens"
          className={kelasInput}
        />
        <Galat pesan={e.judul} />
      </div>

      <div>
        <label htmlFor="penulis" className="mb-1 block text-sm font-bold">
          Penulis
        </label>
        <input
          id="penulis"
          name="penulis"
          type="text"
          defaultValue={v.penulis}
          placeholder="Nama penulis"
          className={kelasInput}
        />
        <Galat pesan={e.penulis} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kategori" className="mb-1 block text-sm font-bold">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            defaultValue={v.kategori}
            className={kelasInput}
          >
            <option value="">Pilih kategori</option>
            {pilihanKategori.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Galat pesan={e.kategori} />
        </div>

        <div>
          <label htmlFor="tahun" className="mb-1 block text-sm font-bold">
            Tahun Terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="text"
            inputMode="numeric"
            defaultValue={v.tahun}
            placeholder="Contoh: 2018"
            className={kelasInput}
          />
          <Galat pesan={e.tahun} />
        </div>
      </div>

      <div>
        <label htmlFor="tersedia" className="mb-1 block text-sm font-bold">
          Status Ketersediaan
        </label>
        <select
          id="tersedia"
          name="tersedia"
          defaultValue={v.tersedia}
          className={kelasInput}
        >
          <option value="true">Tersedia</option>
          <option value="false">Sedang Dipinjam</option>
        </select>
        <Galat pesan={e.tersedia} />
      </div>

      <div>
        <label htmlFor="sinopsis" className="mb-1 block text-sm font-bold">
          Sinopsis
        </label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          rows={5}
          defaultValue={v.sinopsis}
          placeholder="Ringkasan isi buku"
          className={kelasInput}
        />
        <Galat pesan={e.sinopsis} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-full bg-linear-to-r from-coral to-iris py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : labelTombol}
        </button>
        <Link
          href={hrefBatal}
          className="rounded-full bg-cream px-6 py-3 text-center text-sm font-bold text-plum transition hover:bg-sand"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

export default FormBuku;
