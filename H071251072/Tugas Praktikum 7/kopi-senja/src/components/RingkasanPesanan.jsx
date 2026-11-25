import React from "react";

function RingkasanPesanan({ pesanan, onUbahJumlah, onHapusItem, totalPrice }) {
return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 mb-6">
    <h2 className="text-xl font-bold text-stone-800 mb-4">Ringkasan Pesanan</h2>

    {pesanan.length === 0 ? (
        <p className="text-stone-400 text-sm text-center py-6">
        Belum ada menu yang dipilih.
        </p>
    ) : (
        <div className="space-y-4">
        <ul className="divide-y divide-stone-100">
            {pesanan.map((item) => (
            <li key={item.id} className="py-3 flex justify-between items-center gap-2">
                <div className="flex-1">
                <h4 className="font-semibold text-stone-800 text-sm">{item.nama}</h4>
                <p className="text-xs text-stone-500">
                    Rp {item.harga.toLocaleString("id-ID")} x {item.jumlah}
                </p>
                </div>

                {/* Kontrol Kuantitas */}
                <div className="flex items-center gap-2">
                <button
                    onClick={() => onUbahJumlah(item.id, -1)}
                    className="w-7 h-7 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold flex items-center justify-center text-sm"
                >
                    -
                </button>
                <span className="text-sm font-semibold w-4 text-center">{item.jumlah}</span>
                <button
                    onClick={() => onUbahJumlah(item.id, 1)}
                    className="w-7 h-7 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-bold flex items-center justify-center text-sm"
                >
                    +
                </button>
                </div>

                <div className="text-right min-w-[80px]">
                <p className="font-semibold text-sm text-stone-800">
                    Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </p>
                <button
                    onClick={() => onHapusItem(item.id)}
                    className="text-xs text-rose-500 hover:underline"
                >
                    Hapus
                </button>
                </div>
            </li>
            ))}
        </ul>

        <div className="pt-4 border-t border-stone-200 flex justify-between items-center font-bold text-lg text-stone-900">
            <span>Total Bayar:</span>
            <span className="text-amber-700">Rp {totalPrice.toLocaleString("id-ID")}</span>
        </div>
        </div>
    )}
    </div>
);
}

export default RingkasanPesanan;