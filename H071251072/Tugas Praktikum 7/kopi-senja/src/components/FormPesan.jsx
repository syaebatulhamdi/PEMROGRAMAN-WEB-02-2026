import { useState } from "react";

function FormPesan({ onKirimPesanan, pesananKosong }) {
const [nama, setNama] = useState("");
const [nomorMeja, setNomorMeja] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [suksesMessage, setSuksesMessage] = useState("");

function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuksesMessage("");

    // Validasi
    if (!nama.trim() || !nomorMeja.trim()) {
    setErrorMessage("Mohon isi Nama dan Nomor Meja dengan benar!");
    return;
    }

    if (pesananKosong) {
    setErrorMessage("Pesanan masih kosong! Silakan pilih menu terlebih dahulu.");
    return;
    }

    // Kirim event sukses ke Parent
    onKirimPesanan();

    // Reset Form & Tampilkan Notifikasi
    setSuksesMessage(`Terima kasih ${nama}! Pesanan meja ${nomorMeja} telah diterima.`);
    setNama("");
    setNomorMeja("");
}

return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
    <h3 className="text-lg font-bold text-stone-800 mb-3">Informasi Pelanggan</h3>

    {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm p-3 rounded-lg mb-4">
        {errorMessage}
        </div>
    )}

    {suksesMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm p-3 rounded-lg mb-4">
        {suksesMessage}
        </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-xs font-semibold text-stone-600 mb-1">
            Nama Pelanggan
        </label>
        <input
            type="text"
            placeholder="Contoh: Dimas"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        </div>

        <div>
        <label className="block text-xs font-semibold text-stone-600 mb-1">
            Nomor Meja
        </label>
        <input
            type="text"
            placeholder="Contoh: 05"
            value={nomorMeja}
            onChange={(e) => setNomorMeja(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        </div>

        <button
        type="submit"
        className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm"
        >
        Kirim Pesanan Sekarang
        </button>
    </form>
    </div>
);
}

export default FormPesan;