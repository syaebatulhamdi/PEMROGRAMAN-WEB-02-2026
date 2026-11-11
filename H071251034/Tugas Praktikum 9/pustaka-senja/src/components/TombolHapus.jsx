"use client";

import { useState } from "react";
import { hapusBuku } from "@/app/katalog/actions";

function TombolHapus({ id, judul }) {
  const [konfirmasi, setKonfirmasi] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setKonfirmasi(true)}
        className="flex-1 rounded-full border border-coral/40 px-4 py-2 text-center text-sm font-bold text-coral transition hover:bg-coral hover:text-white"
      >
        Hapus
      </button>

      {konfirmasi && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`judul-hapus-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 p-4"
        >
          <div className="w-full max-w-sm rounded-[2rem] bg-paper p-6 text-plum shadow-xl">
            <h2
              id={`judul-hapus-${id}`}
              className="font-display text-xl font-semibold"
            >
              Hapus buku ini?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-plum/80">
              &quot;{judul}&quot; akan dihapus permanen dari database dan tidak
              bisa dikembalikan.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setKonfirmasi(false)}
                className="flex-1 rounded-full bg-cream px-4 py-2.5 text-sm font-bold text-plum transition hover:bg-sand"
              >
                Batal
              </button>
              <form action={hapusBuku.bind(null, id)} className="flex-1">
                <button
                  type="submit"
                  className="w-full rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Ya, Hapus
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TombolHapus;
