"use client";

import { useState } from "react";
import { daftarKategori } from "@/lib/konstanta";

const pilihanKategori = daftarKategori.filter((k) => k !== "Semua");

const kelasInput =
  "w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-plum placeholder:text-plum/40 focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris/30";

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  const [pesan, setPesan] = useState(null);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      nama.trim() === "" ||
      judul.trim() === "" ||
      kategori.trim() === "" ||
      alasan.trim() === ""
    ) {
      setPesan({
        tipe: "peringatan",
        teks: "Formulir belum lengkap. Isi semua kolom sebelum mengirim usulan.",
      });
      return;
    }

    const usulanBaru = {
      id: String(Date.now()),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPesan({
      tipe: "sukses",
      teks: `Usulan "${usulanBaru.judul}" berhasil dikirim. Terima kasih, ${usulanBaru.nama}!`,
    });
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Usulan Buku
      </h1>
      <p className="mt-2 text-plum/70">
        Ada judul yang belum ada di rak kami? Usulkan, dan kami pertimbangkan
        untuk dihadirkan di Pustaka Senja.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-[2rem] bg-paper p-6 shadow-sm"
      >
        <div>
          <label htmlFor="nama" className="mb-1 block text-sm font-bold">
            Nama Pengusul
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Nama kamu"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="judul" className="mb-1 block text-sm font-bold">
            Judul Buku yang Diusulkan
          </label>
          <input
            id="judul"
            type="text"
            placeholder="Contoh: Sapiens"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="kategori" className="mb-1 block text-sm font-bold">
            Kategori
          </label>
          <select
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className={kelasInput}
          >
            <option value="">Pilih kategori</option>
            {pilihanKategori.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="mb-1 block text-sm font-bold">
            Alasan Usulan
          </label>
          <textarea
            id="alasan"
            rows={4}
            placeholder="Kenapa buku ini layak ada di Pustaka Senja?"
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className={kelasInput}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-linear-to-r bg-iris py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
        >
          Kirim Usulan
        </button>

        {pesan && (
          <p
            role="status"
            className={
              pesan.tipe === "sukses"
                ? "rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-900"
                : "rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-900"
            }
          >
            {pesan.teks}
          </p>
        )}
      </form>

      <div className="mt-8">
        <h2 className="font-display text-2xl font-semibold">
          Usulan Sesi Ini
        </h2>
        {daftarUsulan.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-paper px-4 py-4 text-sm text-plum/70">
            Belum ada usulan. Isi formulir di atas untuk mengirim usulan
            pertama.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {daftarUsulan.map((item) => (
              <li
                key={item.id}
                className="rounded-3xl bg-paper p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {item.judul}
                  </h3>
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-plum/70">
                    {item.kategori}
                  </span>
                </div>
                <p className="mt-1 text-sm text-plum/70">
                  Diusulkan oleh {item.nama}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{item.alasan}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
