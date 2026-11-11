
"use client";

import { useTransition } from "react";
import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id }) {
  const [isPending, startTransition] = useTransition();

  function handleHapus() {
    const konfirmasi = window.confirm(
      "Apakah kamu yakin ingin menghapus buku ini?"
    );

    if (!konfirmasi) return;

    startTransition(async () => {
      await hapusBuku(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleHapus}
      disabled={isPending}
      className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
