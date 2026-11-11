"use client";

import { useState } from "react";

const opsiKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function Usulan() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  const [pesan, setPesan] = useState(null);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori.trim(),
      alasan: alasan.trim(),
    };

    if (!data.nama || !data.judul || !data.kategori || !data.alasan) {
      setPesan({
        tipe: "error",
        teks: "Semua kolom wajib diisi sebelum usulan dikirim.",
      });
      return;
    }

    setDaftarUsulan([{ id: Date.now(), ...data }, ...daftarUsulan]);
    setPesan({
      tipe: "sukses",
      teks: `Terima kasih, usulan "${data.judul}" berhasil dikirim.`,
    });
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200";

  return (
    <div>
      <h1 className="text-3xl font-bold">Usulan Buku</h1>
      <p className="mt-1 text-slate-600">
        Ada buku yang ingin kamu baca di Pustaka Senja? Usulkan di sini.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <div>
          <label htmlFor="nama" className="font-medium">
            Nama Pengusul
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="judul" className="font-medium">
            Judul Buku yang Diusulkan
          </label>
          <input
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="kategori" className="font-medium">
            Kategori
          </label>
          <select
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className={inputClass}
          >
            <option value="">Pilih kategori</option>
            {opsiKategori.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="font-medium">
            Alasan Usulan
          </label>
          <textarea
            id="alasan"
            rows={4}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className={inputClass}
          />
        </div>

        {pesan && (
          <p
            role="alert"
            className={
              pesan.tipe === "error"
                ? "rounded-lg bg-red-100 px-4 py-3 text-red-800"
                : "rounded-lg bg-green-100 px-4 py-3 text-green-800"
            }
          >
            {pesan.teks}
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
        >
          Kirim Usulan
        </button>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Usulan Terkirim</h2>
        {daftarUsulan.length === 0 ? (
          <p className="mt-2 text-slate-500">
            Belum ada usulan pada sesi ini.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="font-semibold">{usulan.judul}</p>
                <p className="text-sm text-slate-500">
                  {usulan.kategori} &middot; diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-slate-700">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}