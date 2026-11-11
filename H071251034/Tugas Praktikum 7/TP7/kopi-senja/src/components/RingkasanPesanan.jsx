function RingkasanPesanan({ items, jumlahItem, totalHarga, onTambah, onKurang, onHapus, onKosongkan }) {
  return (
    <section className="rounded-3xl bg-linear-to-br from-stone-900 to-amber-900 p-6 text-orange-100 shadow-xl shadow-stone-900/25">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-semibold">Ringkasan pesanan</h2>
        {jumlahItem > 0 && (
          <button
            type="button"
            onClick={onKosongkan}
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-medium text-orange-100/80 transition hover:bg-rose-500/20 hover:text-white"
          >
            Kosongkan semua
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-white/10 px-4 py-6 text-center text-orange-100/75">
          Pesanan masih kosong. Pilih menu lalu tekan Tambah.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-white/10">
          {items.map((item) => (
            <li key={item.id} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm text-orange-100/60">
                    Rp {item.harga.toLocaleString("id-ID")} x {item.jumlah}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Hapus ${item.nama} dari pesanan`}
                  onClick={() => onHapus(item.id)}
                  className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-200"
                >
                  Hapus
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Kurangi ${item.nama}`}
                    onClick={() => onKurang(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{item.jumlah}</span>
                  <button
                    type="button"
                    aria-label={`Tambah ${item.nama}`}
                    onClick={() => onTambah(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold">
                  Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-5 space-y-2 border-t border-white/15 pt-4">
        <div className="flex justify-between text-orange-100/75">
          <dt>Jumlah pesanan</dt>
          <dd className="font-semibold text-white">{jumlahItem} item</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-orange-100/75">Total harga</dt>
          <dd className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-bold text-amber-300">
            Rp {totalHarga.toLocaleString("id-ID")}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default RingkasanPesanan;
