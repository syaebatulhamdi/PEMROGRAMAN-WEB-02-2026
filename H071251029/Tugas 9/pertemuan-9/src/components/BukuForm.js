"use client";

import Link from "next/link";
import { useActionState } from "react";
import { KATEGORI } from "@/lib/konstanta";

const input =
  "w-full rounded-xl border border-violet-100 bg-violet-50/50 px-4 py-3 outline-none focus:border-pink-400";

// action: Server Action (prevState, formData) yang dikirim dari Server Component.
export default function BukuForm({ action, buku, submitLabel, batalHref }) {
  const [state, formAction, pending] = useActionState(action, { error: null, values: null });
  const v = state.values ?? buku ?? {};

  return (
    <form action={formAction} className="space-y-5 rounded-[2rem] bg-white p-7 shadow-xl shadow-violet-100 md:p-9">
      {buku && <input type="hidden" name="id" value={buku.id} />}

      <div>
        <label htmlFor="judul" className="mb-2 block font-bold text-violet-800">Judul Buku</label>
        <input id="judul" name="judul" type="text" required maxLength={200} defaultValue={v.judul ?? ""} className={input} placeholder="Judul buku" />
      </div>

      <div>
        <label htmlFor="penulis" className="mb-2 block font-bold text-violet-800">Penulis</label>
        <input id="penulis" name="penulis" type="text" required maxLength={150} defaultValue={v.penulis ?? ""} className={input} placeholder="Nama penulis" />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="kategori" className="mb-2 block font-bold text-violet-800">Kategori</label>
          <select id="kategori" name="kategori" defaultValue={v.kategori ?? KATEGORI[0]} className={input}>
            {KATEGORI.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tahun" className="mb-2 block font-bold text-violet-800">Tahun Terbit</label>
          <input id="tahun" name="tahun" type="number" required min="1000" max={new Date().getFullYear() + 1} defaultValue={v.tahun ?? ""} className={input} placeholder="2024" />
        </div>
        <div>
          <label htmlFor="tersedia" className="mb-2 block font-bold text-violet-800">Status</label>
          <select id="tersedia" name="tersedia" defaultValue={String(v.tersedia ?? true)} className={input}>
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="sinopsis" className="mb-2 block font-bold text-violet-800">Sinopsis</label>
        <textarea id="sinopsis" name="sinopsis" rows={5} required defaultValue={v.sinopsis ?? ""} className={input} placeholder="Ringkasan singkat isi buku" />
      </div>

      {state.error && (
        <p role="alert" className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">⚠️ {state.error}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className="rounded-xl bg-gradient-to-r from-pink-400 to-violet-500 px-6 py-3 font-black text-white shadow-lg hover:brightness-105 disabled:opacity-60">
          {pending ? "Menyimpan..." : submitLabel}
        </button>
        <Link href={batalHref} className="rounded-xl px-6 py-3 font-bold text-violet-600 hover:bg-violet-50">Batal</Link>
      </div>
    </form>
  );
}
