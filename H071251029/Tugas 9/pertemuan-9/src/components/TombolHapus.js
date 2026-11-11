"use client";

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul, className = "" }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm(`Yakin hapus buku "${judul}"?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={`rounded-xl bg-rose-50 px-4 py-2.5 text-center text-sm font-bold text-rose-600 transition hover:bg-rose-100 ${className}`}
      >
        🗑 Hapus
      </button>
    </form>
  );
}
