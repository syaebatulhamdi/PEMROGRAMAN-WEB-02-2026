import { useState } from "react";

function MenuCard({ menu, onTambahPesanan }) {
const [showDetail, setShowDetail] = useState(false);

return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="p-5">
        <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-stone-800">{menu.nama}</h3>
        <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
            menu.tersedia
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
        >
            {menu.tersedia ? "Tersedia" : "Habis"}
        </span>
        </div>

        <p className="text-amber-700 font-bold text-md mb-2">
        Rp {menu.harga.toLocaleString("id-ID")}
        </p>
        
        <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded mb-3">
        {menu.kategori}
        </span>

        {/* Detail Accordion */}
        {showDetail && (
        <p className="text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 mb-3 leading-relaxed">
            {menu.deskripsi}
        </p>
        )}
    </div>

    <div className="p-5 pt-0 flex flex-col gap-2">
        <button
        onClick={() => setShowDetail(!showDetail)}
        className="text-xs text-stone-500 hover:text-amber-700 text-left font-medium underline"
        >
        {showDetail ? "Sembunyikan Detail" : "Lihat Detail"}
        </button>

        <button
        disabled={!menu.tersedia}
        onClick={() => onTambahPesanan(menu)}
        className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
            menu.tersedia
            ? "bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            : "bg-stone-200 text-stone-400 cursor-not-allowed"
        }`}
        >
        {menu.tersedia ? "+ Tambah Ke Pesanan" : "Stok Habis"}
        </button>
    </div>
    </div>
);
}

export default MenuCard;