import logoIcon from '../assets/iconCoffe.svg'

export default function Navbar({ totalItems, totalPrice, kategoriAktif, onSelectKategori }) {
  const KATEGORI_LIST = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan']

  return (
    <header className="bg-cafe-base/90 backdrop-blur-md sticky top-0 z-40 border-b border-cafe-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LOGO */}
        <div className="flex items-center">
          <img 
            src={logoIcon} 
            alt="Logo Kedai Kopi Senja" 
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-cafe-brown leading-none">
              Kedai <span className="text-cafe-accent">KOPI SENJA</span>
            </h1>
            <p className="text-[10px] font-medium text-cafe-brown-light tracking-wider uppercase mt-0.5">Kedai Kopi Senja</p>
          </div>
        </div>

        {/* KATEGORI MENU SLRUPPP */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-cafe-card p-1.5 rounded-2xl border border-[#E2D4C3]">
          {KATEGORI_LIST.map((kategori) => {
            const isSelected = kategoriAktif === kategori
            return (
              <button
                key={kategori}
                onClick={() => onSelectKategori(kategori)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected 
                    ? 'bg-cafe-brown text-white shadow-sm' 
                    : 'text-cafe-brown-light hover:text-cafe-brown hover:bg-black/5'
                }`}
              >
                {kategori}
              </button>
            )
          })}
        </nav>

        {/* TOTAL BELANJA */}
        <div className="flex items-center gap-3 bg-cafe-card px-4 py-2 rounded-2xl border border-[#E2D4C3]">
          <div className="relative text-lg">
            🛍️
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-cafe-accent text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold text-cafe-brown-light uppercase leading-none">Total Pesanan</div>
            <div className="text-sm font-extrabold text-cafe-accent leading-tight">
              Rp {totalPrice.toLocaleString('id-ID')}
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}