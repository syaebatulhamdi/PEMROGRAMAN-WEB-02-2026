export default function RingkasanPesanan({ pesanan, totalItems, totalPrice, onTambah, onKurang, onHapus }) {
  return (
    <div className="bg-cafe-card rounded-3xl p-6 border border-[#E2D4C3] shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#E2D4C3] pb-3">
        <div className="flex items-center gap-2 font-bold text-cafe-brown">
          <span>🛍️</span>
          <h3 className="text-lg">Ringkasan Pesanan</h3>
        </div>
        <span className="text-xs font-bold bg-cafe-base px-2.5 py-1 rounded-full text-cafe-brown border border-[#E2D4C3]">
          {totalItems} item
        </span>
      </div>

      {pesanan.length === 0 ? (
        <div className="py-8 text-center text-cafe-brown-light space-y-2">
          <p className="text-sm font-medium">Belum ada menu yang dipilih.</p>
          <p className="text-xs text-cafe-brown-light/80">Silakan tekan tombol "+ Tambah" pada menu.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {pesanan.map((item) => (
            <div 
              key={item.id}
              className="bg-cafe-base rounded-2xl p-3 border border-[#E2D4C3] flex items-center justify-between gap-2"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-cafe-brown truncate">{item.nama}</h4>
                <div className="text-xs text-cafe-accent font-semibold">
                  Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-cafe-card p-1 rounded-xl border border-[#E2D4C3]">
                <button
                  onClick={() => onKurang(item.id)}
                  className="w-6 h-6 bg-cafe-base hover:bg-white text-cafe-brown rounded-lg flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="text-xs font-bold text-cafe-brown w-4 text-center">
                  {item.jumlah}
                </span>
                <button
                  onClick={() => onTambah(item)}
                  className="w-6 h-6 bg-cafe-accent text-white hover:bg-cafe-accent-hover rounded-lg flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onHapus(item.id)}
                className="text-red-400 hover:text-red-600 p-1 font-bold text-sm"
                title="Hapus"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pt-3 border-t border-[#E2D4C3] flex items-center justify-between">
        <span className="text-sm font-bold text-cafe-brown-light">Total Bayar</span>
        <span className="text-lg font-extrabold text-cafe-accent">
          Rp {totalPrice.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  )
}