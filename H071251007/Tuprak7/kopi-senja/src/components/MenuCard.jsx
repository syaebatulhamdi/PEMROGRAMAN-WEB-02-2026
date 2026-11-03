export default function MenuCard({ item, onTambah, onShowDetail }) {
  const { nama, kategori, harga, tersedia, gambar, deskripsi } = item

  return (
    <div className={`group relative bg-cafe-card rounded-3xl p-5 border border-[#E2D4C3] transition-all duration-200 flex flex-col justify-between ${
      tersedia ? 'hover:shadow-md hover:border-cafe-amber' : 'opacity-70 bg-gray-200 border-gray-300'
    }`}>
      <div>
        <div className="w-full h-40 bg-cafe-base rounded-2xl mb-4 relative overflow-hidden border border-[#E2D4C3]">
          <img 
            src={gambar} 
            alt={nama} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          {!tersedia && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-cafe-brown text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
                Stok Habis
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-cafe-brown-light bg-cafe-base px-2.5 py-0.5 rounded-lg border border-[#E2D4C3]">
            {kategori}
          </span>
          <button
            onClick={() => onShowDetail(item)}
            className="text-xs font-bold text-cafe-brown-light hover:text-cafe-accent flex items-center gap-1.5 transition group/btn"
          >
            Detail 
            <i className="fa-solid fa-circle-arrow-up text-[11px] transition-transform group/btn:-translate-y-0.5"></i>
          </button>
        </div>

        <h3 className="text-lg font-bold text-cafe-brown group-hover:text-cafe-accent transition-colors">
          {nama}
        </h3>
        <p className="text-xs text-cafe-brown-light line-clamp-2 mt-1 mb-4 leading-relaxed">
          {deskripsi}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#E2D4C3]/60">
        <div>
          <span className="text-xs font-medium text-cafe-brown-light block">Harga</span>
          <span className="text-base font-extrabold text-cafe-brown">
            Rp {harga.toLocaleString('id-ID')}
          </span>
        </div>

        <button
          disabled={!tersedia}
          onClick={() => onTambah(item)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
            tersedia 
              ? 'bg-cafe-accent text-white hover:bg-cafe-accent-hover active:scale-95' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          + Tambah
        </button>
      </div>
    </div>
  )
}