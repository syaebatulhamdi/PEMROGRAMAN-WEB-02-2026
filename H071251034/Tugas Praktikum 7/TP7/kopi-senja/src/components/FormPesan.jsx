import { useState } from "react";

const JUMLAH_MEJA = 20;

function FormPesan({ jumlahItem, totalHarga, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [errors, setErrors] = useState({});
  const [pesanTerkirim, setPesanTerkirim] = useState(null);

  function validasi() {
    const hasil = {};
    const namaBersih = nama.trim();
    const mejaBersih = meja.trim();

    if (jumlahItem === 0) {
      hasil.pesanan = "Pesanan masih kosong. Pilih minimal satu menu sebelum mengirim.";
    }

    if (namaBersih === "") {
      hasil.nama = "Nama wajib diisi.";
    } else if (namaBersih.length < 3) {
      hasil.nama = "Nama minimal 3 huruf.";
    } else if (!/^[A-Za-z\s.'-]+$/.test(namaBersih)) {
      hasil.nama = "Nama hanya boleh berisi huruf.";
    }

    if (mejaBersih === "") {
      hasil.meja = "Nomor meja wajib diisi.";
    } else if (!/^\d+$/.test(mejaBersih)) {
      hasil.meja = "Nomor meja harus berupa angka.";
    } else if (Number(mejaBersih) < 1 || Number(mejaBersih) > JUMLAH_MEJA) {
      hasil.meja = `Nomor meja tersedia dari 1 sampai ${JUMLAH_MEJA}.`;
    }

    return hasil;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const hasil = validasi();
    setErrors(hasil);

    if (Object.keys(hasil).length > 0) {
      setPesanTerkirim(null);
      return;
    }

    setPesanTerkirim({ nama: nama.trim(), meja: meja.trim() });
    onKirim(); // App mengosongkan pesanan
    setNama("");
    setMeja("");
  }

  function handleNama(e) {
    setNama(e.target.value);
    setErrors({ ...errors, nama: undefined });
  }

  function handleMeja(e) {
    setMeja(e.target.value);
    setErrors({ ...errors, meja: undefined });
  }

  // Ucapan terima kasih hanya tampil selama pesanan baru belum dimulai.
  const tampilkanTerimaKasih = pesanTerkirim !== null && jumlahItem === 0;

  const kelasInput = (adaError) =>
    `mt-1.5 w-full rounded-2xl border-2 bg-orange-100 px-4 py-3 text-base outline-none transition placeholder:text-stone-900/35 focus:bg-white ${
      adaError ? "border-rose-500" : "border-transparent focus:border-amber-700"
    }`;

  return (
    <section className="rounded-3xl bg-orange-50 p-6 shadow-xl shadow-stone-900/10 ring-1 ring-stone-900/5">
      <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-semibold">Kirim pesanan</h2>
      <p className="mt-1 text-amber-900/70">
        {jumlahItem > 0
          ? `${jumlahItem} item, total Rp ${totalHarga.toLocaleString("id-ID")}`
          : "Isi nama dan nomor mejamu."}
      </p>

      {tampilkanTerimaKasih && (
        <div role="status" className="mt-4 rounded-2xl bg-emerald-50 px-4 py-4 text-emerald-900 ring-1 ring-emerald-200">
          <p className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-bold">Terima kasih, {pesanTerkirim.nama}!</p>
          <p className="mt-0.5 text-sm">
            Pesananmu sudah kami terima dan segera diantar ke meja {pesanTerkirim.meja}.
          </p>
        </div>
      )}

      {errors.pesanan && (
        <p role="alert" className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 ring-1 ring-rose-200">
          {errors.pesanan}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <div>
          <label htmlFor="nama" className="font-semibold">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Contoh: Dimas"
            value={nama}
            onChange={handleNama}
            aria-invalid={errors.nama ? "true" : "false"}
            className={kelasInput(errors.nama)}
          />
          {errors.nama && <p className="mt-1.5 text-sm font-medium text-rose-600">{errors.nama}</p>}
        </div>

        <div>
          <label htmlFor="meja" className="font-semibold">
            Nomor meja
          </label>
          <input
            id="meja"
            type="text"
            inputMode="numeric"
            placeholder={`1 sampai ${JUMLAH_MEJA}`}
            value={meja}
            onChange={handleMeja}
            aria-invalid={errors.meja ? "true" : "false"}
            className={kelasInput(errors.meja)}
          />
          {errors.meja && <p className="mt-1.5 text-sm font-medium text-rose-600">{errors.meja}</p>}
        </div>

        <button
          type="submit"
          className="h-14 w-full rounded-full bg-stone-900 text-lg font-bold text-orange-100 transition hover:bg-amber-900 active:scale-[0.98]"
        >
          Kirim pesanan
        </button>
      </form>
    </section>
  );
}

export default FormPesan;
