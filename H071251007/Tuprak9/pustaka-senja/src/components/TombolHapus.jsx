"use client";

import { hapusBuku } from "@/app/katalog/action";

export default function TombolHapus({ id }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm("Yakin ingin menghapus buku ini dari database?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
      >
        Hapus
      </button>
    </form>
  );
}