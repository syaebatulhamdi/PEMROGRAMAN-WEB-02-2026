"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";
import { warnaSampul } from "@/lib/konstanta";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);
  const sampul = warnaSampul[(id - 1) % warnaSampul.length];

  return (
    <article className="flex flex-col rounded-3xl bg-paper p-4 shadow-sm">
      <div
        className={`${sampul} relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border-l-[10px] border-black/15 p-4`}
      >
        <span className="absolute right-4 top-0 h-7 w-3.5 rounded-b-sm bg-honey shadow" />
        <p className="font-display text-xl font-semibold leading-tight">
          {judul}
        </p>
        <p className="mt-1 text-xs font-semibold opacity-90">{penulis}</p>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-plum">
            {judul}
          </h3>
          <button
            type="button"
            onClick={() => setFavorit(!favorit)}
            aria-pressed={favorit}
            aria-label={favorit ? "Hapus dari favorit" : "Simpan ke favorit"}
            className={
              favorit
                ? "shrink-0 rounded-full bg-coral/15 p-2 text-coral transition"
                : "shrink-0 rounded-full bg-cream p-2 text-plum/50 transition hover:text-coral"
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill={favorit ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z" />
            </svg>
          </button>
        </div>

        <p className="mt-1 text-sm text-plum/70">{penulis}</p>
        <p className="mt-1 text-sm text-plum/70">
          {kategori} &bull; {tahun}
        </p>

        <span
          className={
            tersedia
              ? "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"
              : "mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800"
          }
        >
          <span
            className={
              tersedia
                ? "h-2 w-2 rounded-full bg-emerald-600"
                : "h-2 w-2 rounded-full bg-rose-600"
            }
          />
          {tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <Link
            href={`/katalog/${id}`}
            className="rounded-full bg-plum px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-iris"
          >
            Lihat Detail
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/katalog/${id}/edit`}
              className="flex-1 rounded-full border border-plum/20 px-4 py-2 text-center text-sm font-bold text-plum transition hover:bg-cream"
            >
              Edit
            </Link>
            <TombolHapus id={id} judul={judul} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default BukuCard;
