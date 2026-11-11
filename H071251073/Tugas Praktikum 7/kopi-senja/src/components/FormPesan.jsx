import { useState } from "react";

function FormPesan({ jumlahPesanan, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorMeja, setErrorMeja] = useState("");
  const [errorPesanan, setErrorPesanan] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const namaBersih = nama.trim();
    const nomorMeja = Number(meja);
    let pesanNama = "";
    let pesanMeja = "";

    if (namaBersih === "") {
      pesanNama = "Nama wajib diisi.";
    } else if (namaBersih.length < 2) {
      pesanNama = "Nama minimal 2 karakter.";
    }

    if (meja.trim() === "") {
      pesanMeja = "Nomor meja wajib diisi.";
    } else if (!Number.isInteger(nomorMeja) || nomorMeja < 1 || nomorMeja > 20) {
      pesanMeja = "Nomor meja harus angka 1 sampai 20.";
    }

    const pesananKosong = jumlahPesanan === 0;

    setErrorNama(pesanNama);
    setErrorMeja(pesanMeja);
    setErrorPesanan(pesananKosong);

    if (pesanNama !== "" || pesanMeja !== "" || pesananKosong) {
      return;
    }

    onKirim(namaBersih);
    setNama("");
    setMeja("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-lg font-semibold">Kirim Pesanan</h2>

      <div className="mb-3">
        <label htmlFor="nama" className="mb-1 block text-sm font-medium">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          placeholder="Nama Anda"
          value={nama}
          onChange={(e) => {
            setNama(e.target.value);
            setErrorNama("");
          }}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        {errorNama !== "" && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errorNama}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="meja" className="mb-1 block text-sm font-medium">
          Nomor Meja
        </label>
        <input
          id="meja"
          type="number"
          placeholder="1 - 20"
          value={meja}
          onChange={(e) => {
            setMeja(e.target.value);
            setErrorMeja("");
          }}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        {errorMeja !== "" && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errorMeja}
          </p>
        )}
      </div>

      {/* Pesan hilang sendiri begitu ada item di pesanan */}
      {errorPesanan && jumlahPesanan === 0 && (
        <p role="alert" className="mb-3 text-sm text-red-600">
          Pesanan masih kosong. Silakan pilih menu terlebih dahulu.
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-amber-800 py-2 font-semibold text-white hover:bg-amber-700"
      >
        Kirim Pesanan
      </button>
    </form>
  );
}

export default FormPesan;
