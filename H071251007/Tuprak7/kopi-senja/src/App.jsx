import { useState } from 'react'
import Navbar from './components/Navbar'
import MenuList from './components/MenuList'
import RingkasanPesanan from './components/RingkasanPesanan'
import FormPesan from './components/FormPesan'
import Footer from './components/Footer'

import kopsuImg from './assets/kopsu.png'
import americanoImg from './assets/americano.png'
import cappucinoImg from './assets/cappucino.png'
import matchaImg from './assets/matcha.png'
import tehTarikImg from './assets/teh tarik.png'
import hotchocoImg from './assets/hotchoco.png'
import rotbakImg from './assets/rotbak.png'
import pisgorImg from './assets/pisgor.png'
import nasgorImg from './assets/nasgor.png'

const DATA_MENU = [
  { id: 1, nama: 'Kopi Susu', kategori: 'Kopi', harga: 18000, tersedia: true, deskripsi: 'Espresso dengan susu segar dan gula aren.', gambar: kopsuImg },
  { id: 2, nama: 'Americano', kategori: 'Kopi', harga: 15000, tersedia: true, deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.', gambar: americanoImg },
  { id: 3, nama: 'Cappuccino', kategori: 'Kopi', harga: 22000, tersedia: true, deskripsi: 'Espresso, susu panas, dan busa susu tebal.', gambar: cappucinoImg },
  { id: 4, nama: 'Matcha Latte', kategori: 'Non-Kopi', harga: 24000, tersedia: true, deskripsi: 'Teh hijau matcha dengan susu.', gambar: matchaImg },
  { id: 5, nama: 'Teh Tarik', kategori: 'Non-Kopi', harga: 14000, tersedia: false, deskripsi: 'Teh susu yang ditarik hingga berbusa.', gambar: tehTarikImg },
  { id: 6, nama: 'Cokelat Panas', kategori: 'Non-Kopi', harga: 20000, tersedia: true, deskripsi: 'Cokelat pekat dengan susu hangat.', gambar: hotchocoImg },
  { id: 7, nama: 'Roti Bakar', kategori: 'Makanan', harga: 16000, tersedia: true, deskripsi: 'Roti tebal dengan selai cokelat dan keju.', gambar: rotbakImg },
  { id: 8, nama: 'Pisang Goreng', kategori: 'Makanan', harga: 12000, tersedia: false, deskripsi: 'Pisang goreng renyah dengan taburan keju.', gambar: pisgorImg },
  { id: 9, nama: 'Nasi Goreng', kategori: 'Makanan', harga: 25000, tersedia: true, deskripsi: 'Nasi goreng kampung dengan telur mata sapi.', gambar: nasgorImg }
]

export default function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [pesanan, setPesanan] = useState([])
  const [modalSukses, setModalSukses] = useState(false)
  const [detailModal, setDetailModal] = useState(null)

  const totalItems = pesanan.reduce((sum, item) => sum + item.jumlah, 0)
  const totalPrice = pesanan.reduce((sum, item) => sum + (item.harga * item.jumlah), 0)

  const menuTampil = kategoriAktif === 'Semua' 
    ? DATA_MENU 
    : DATA_MENU.filter(item => item.kategori === kategoriAktif)

  const handleTambahPesanan = (menuItem) => {
    if (!menuItem.tersedia) return
    setPesanan(prev => {
      const ada = prev.find(item => item.id === menuItem.id)
      if (ada) {
        return prev.map(item => 
          item.id === menuItem.id ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      }
      return [...prev, { ...menuItem, jumlah: 1 }]
    })
  }

  const handleKurangiPesanan = (id) => {
    setPesanan(prev => {
      const target = prev.find(item => item.id === id)
      if (target && target.jumlah === 1) {
        return prev.filter(item => item.id !== id)
      }
      return prev.map(item => 
        item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item
      )
    })
  }

  const handleHapusItem = (id) => {
    setPesanan(prev => prev.filter(item => item.id !== id))
  }

  // SUBMIT PESANAN 
  const handlePesananSelesai = () => {
    setPesanan([])
    setModalSukses(true)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-cafe-base text-cafe-brown">
      <div>
        <Navbar 
          totalItems={totalItems} 
          totalPrice={totalPrice} 
          kategoriAktif={kategoriAktif}
          onSelectKategori={setKategoriAktif}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          
          {/* BANNER HERO */}
          <section className="bg-gradient-to-r from-cafe-card to-[#E5D9C8] rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-[#E2D4C3]">
            <div className="space-y-4 max-w-lg z-10 text-center md:text-left pl-[50px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cafe-accent/10 text-cafe-accent text-xs font-bold rounded-full uppercase tracking-wider">
                ✨ Self-Service Order Tablet
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-cafe-brown tracking-tight leading-tight">
                Slow coffee, warm pastries, <span className="text-cafe-accent">cozy mornings.</span>
              </h1>
              <p className="text-cafe-brown-light text-sm sm:text-base leading-relaxed">
                Nikmati suasana tenang Kedai Kopi Senja. Pilih menu favorit Anda langsung dari tablet meja dan rasakan kehangatannya.
              </p>
            </div>

            {/* ILUSTRASI BERUANG KIYOWOOO */}
            <div className="mt-6 md:mt-0 flex items-center justify-center relative group cursor-pointer">
              <div className="absolute -top-4 bg-cafe-brown text-white text-xl font-bold px-4 py-2 rounded-2xl shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20 whitespace-nowrap border border-cafe-amber/30">
                Latte Love, Little Joys~
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cafe-brown rotate-45"></div>
              </div>

              <div className="w-72 h-72 sm:w-88 sm:h-88 bg-cafe-amber/20 rounded-full absolute -z-0 blur-xl group-hover:bg-cafe-amber/30 transition"></div>
              
              <svg className="w-80 h-80 sm:w-96 sm:h-96 relative z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              
                <circle cx="65" cy="55" r="18" fill="#6B4E3D" stroke="#3D2C1E" strokeWidth="3.5"/>
                <circle cx="65" cy="55" r="9" fill="#E6C4A8"/>
                {/* TELINGA */}
                <circle cx="135" cy="55" r="18" fill="#6B4E3D" stroke="#3D2C1E" strokeWidth="3.5"/>
                <circle cx="135" cy="55" r="9" fill="#E6C4A8"/>

                {/* KEFALA */}
                <circle cx="100" cy="95" r="42" fill="#6B4E3D" stroke="#3D2C1E" strokeWidth="3.5"/>

                {/* MUKA */}
                <ellipse cx="100" cy="105" rx="30" ry="22" fill="#E6C4A8" stroke="#3D2C1E" strokeWidth="3"/>
                
                {/* MATA */}
                <g className="transition-opacity duration-200 group-hover:opacity-0">
                  <circle cx="85" cy="90" r="4.5" fill="#3D2C1E"/>
                  <circle cx="115" cy="90" r="4.5" fill="#3D2C1E"/>
                </g>

                <g className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <path d="M 80 91 Q 85 85 90 91" stroke="#3D2C1E" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                  <path d="M 110 91 Q 115 85 120 91" stroke="#3D2C1E" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                </g>

                {/* PIPII */}
                <circle cx="75" cy="98" r="6" fill="#E89B9B" opacity="0.7"/>
                <circle cx="125" cy="98" r="6" fill="#E89B9B" opacity="0.7"/>

                {/* HIDUNG + MULUT */}
                <ellipse cx="100" cy="99" rx="7" ry="5" fill="#3D2C1E"/>
                <path d="M 95 107 Q 100 113 105 107" stroke="#3D2C1E" strokeWidth="3" strokeLinecap="round" fill="none"/>

                {/* PERUT */}
                <path d="M48 155 C 48 115, 152 115, 152 155 C 152 180, 48 180, 48 155 Z" fill="#6B4E3D" stroke="#3D2C1E" strokeWidth="3.5"/>

                {/* TANGAN */}
                <rect x="85" y="130" width="30" height="34" rx="6" fill="#FFFFFF" stroke="#3D2C1E" strokeWidth="3.5"/>
                <path d="M80 142 C 85 142, 85 158, 90 158" stroke="#6B4E3D" strokeWidth="5" strokeLinecap="round"/>
                <path d="M120 142 C 115 142, 115 158, 110 158" stroke="#6B4E3D" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </div>
          </section>

          {/* KONTEN UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <MenuList 
                menuList={menuTampil}
                onTambahPesanan={handleTambahPesanan}
                onShowDetail={setDetailModal}
              />
            </div>

            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <RingkasanPesanan 
                pesanan={pesanan}
                totalItems={totalItems}
                totalPrice={totalPrice}
                onTambah={handleTambahPesanan}
                onKurang={handleKurangiPesanan}
                onHapus={handleHapusItem}
              />

              <FormPesan 
                pesanan={pesanan}
                onPesananSelesai={handlePesananSelesai}
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {detailModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cafe-base rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-cafe-card space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-cafe-amber/20 text-cafe-brown-light rounded-md">
                  {detailModal.kategori}
                </span>
                <h3 className="text-2xl font-bold text-cafe-brown mt-2">{detailModal.nama}</h3>
              </div>
              <button 
                onClick={() => setDetailModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-cafe-card text-cafe-brown-light hover:bg-[#E2D4C3] font-bold"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-44 bg-cafe-card rounded-2xl overflow-hidden border border-[#E2D4C3]">
              <img 
                src={detailModal.gambar} 
                alt={detailModal.nama} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <p className="text-cafe-brown-light leading-relaxed text-sm bg-white/60 p-4 rounded-2xl border border-cafe-card">
              {detailModal.deskripsi}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xl font-extrabold text-cafe-accent">
                Rp {detailModal.harga.toLocaleString('id-ID')}
              </span>
              <button
                disabled={!detailModal.tersedia}
                onClick={() => {
                  handleTambahPesanan(detailModal)
                  setDetailModal(null)
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                  detailModal.tersedia 
                    ? 'bg-cafe-accent text-white hover:bg-cafe-accent-hover' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {detailModal.tersedia ? '+ Tambah ke Pesanan' : 'Stok Habis'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalSukses && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cafe-base rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl border border-cafe-card">
            <div className="w-16 h-16 bg-cafe-accent/15 rounded-full flex items-center justify-center mx-auto text-cafe-accent text-2xl font-bold">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-cafe-brown">Terima Kasih!</h3>
              <p className="text-sm text-cafe-brown-light">
                Pesanan Anda telah berhasil dikirim ke dapur. Mohon tunggu sebentar di meja Anda.
              </p>
            </div>
            <button
              onClick={() => setModalSukses(false)}
              className="w-full py-3 bg-cafe-brown text-white font-bold rounded-xl hover:bg-cafe-brown-light transition text-sm shadow-md"
            >
              Tutup & Pesan Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}