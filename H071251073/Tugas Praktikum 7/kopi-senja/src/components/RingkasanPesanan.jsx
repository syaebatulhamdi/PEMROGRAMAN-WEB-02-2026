function RingkasanPesanan({
  itemPesanan,
  jumlahPesanan,
  totalHarga,
  onTambah,
  onKurangi,
}) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Ringkasan Pesanan</h2>

      {itemPesanan.length === 0 && (
        <p className="text-sm text-stone-500">Belum ada pesanan.</p>
      )}

      <ul className="divide-y divide-stone-200">
        {itemPesanan.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 py-2"
          >
            <div>
              <p className="text-sm font-medium">{item.nama}</p>
              <p className="text-xs text-stone-500">
                Rp {item.harga.toLocaleString("id-ID")} × {item.jumlah} = Rp{" "}
                {item.subtotal.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onKurangi(item.id)}
                aria-label={"Kurangi " + item.nama}
                className="h-7 w-7 rounded border border-stone-300 hover:bg-stone-100"
              >
                −
              </button>
              <span className="w-5 text-center text-sm">{item.jumlah}</span>
              <button
                type="button"
                onClick={() => onTambah(item.id)}
                aria-label={"Tambah " + item.nama}
                className="h-7 w-7 rounded border border-stone-300 hover:bg-stone-100"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3 text-sm">
        <span>{jumlahPesanan} item</span>
        <span className="font-bold">
          Total: Rp {totalHarga.toLocaleString("id-ID")}
        </span>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
