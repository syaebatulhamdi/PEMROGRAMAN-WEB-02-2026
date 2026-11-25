import React from "react";

function Navbar({ kategoriAktif, onSelectKategori, totalItems, totalPrice }) {
const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

return (
    <header className="sticky top-0 z-50 bg-amber-900 text-amber-50 shadow-md">
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
        <h1 className="text-2xl font-bold tracking-wide">Kedai Kopi Senja</h1>
        <p className="text-xs text-amber-200">Nikmati Momen Manis Setiap Tegukan</p>
        </div>

        {/* Filter Kategori */}
        <nav className="flex gap-2">
        {daftarKategori.map((kat) => (
            <button
            key={kat}
            onClick={() => onSelectKategori(kat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                kategoriAktif === kat
                ? "bg-amber-500 text-white shadow"
                : "bg-amber-800 hover:bg-amber-700 text-amber-100"
            }`}
            >
            {kat}
            </button>
        ))}
        </nav>

        {/* Ringkasan Pesanan Singkat */}
        <div className="bg-amber-950 px-4 py-2 rounded-lg border border-amber-700/50 flex items-center gap-3">
        <div className="text-right">
            <p className="text-xs text-amber-300">Total Pesanan</p>
            <p className="font-bold text-sm">
            {totalItems} item | Rp {totalPrice.toLocaleString("id-ID")}
            </p>
        </div>
        </div>
    </div>
    </header>
);
}

export default Navbar;