"use client";

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id }) {
return (
    <form
    action={hapusBuku}
    onSubmit={(e) => {
        if (!confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
        e.preventDefault();
        }
    }}
    >
    <input type="hidden" name="id" value={id} />
    <button
        type="submit"
        className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg transition font-medium"
    >
        Hapus
    </button>
    </form>
);
}