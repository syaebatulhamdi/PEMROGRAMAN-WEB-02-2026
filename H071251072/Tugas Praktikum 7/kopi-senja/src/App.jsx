import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

// Data Master Menu (Single Source of Data)
const DATA_MENU = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);

  // Filter Menu Berdasarkan Kategori
  const menuFiltered = DATA_MENU.filter((item) => {
    if (kategoriAktif === "Semua") return true;
    return item.kategori === kategoriAktif;
  });

  // Tambah Pesanan / Kuantitas
  const handleTambahPesanan = (menu) => {
    if (!menu.tersedia) return;

    setPesanan((prevPesanan) => {
      const ada = prevPesanan.find((p) => p.id === menu.id);
      if (ada) {
        return prevPesanan.map((p) =>
          p.id === menu.id ? { ...p, jumlah: p.jumlah + 1 } : p
        );
      }
      return [...prevPesanan, { ...menu, jumlah: 1 }];
    });
  };

  // Ubah Kuantitas
  const handleUbahJumlah = (id, delta) => {
    setPesanan((prevPesanan) =>
      prevPesanan
        .map((p) => {
          if (p.id === id) {
            const newJumlah = p.jumlah + delta;
            return newJumlah > 0 ? { ...p, jumlah: newJumlah } : null;
          }
          return p;
        })
        .filter(Boolean)
    );
  };

  // Hapus Item
  const handleHapusItem = (id) => {
    setPesanan((prev) => prev.filter((p) => p.id !== id));
  };

  // Reset Pesanan (setelah submit form sukses)
  const handleKirimPesanan = () => {
    setPesanan([]);
  };

  // Kalkulasi Total Kuantitas dan Total Harga
  const totalItems = pesanan.reduce((sum, item) => sum + item.jumlah, 0);
  const totalPrice = pesanan.reduce((sum, item) => sum + item.harga * item.jumlah, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar
          kategoriAktif={kategoriAktif}
          onSelectKategori={setKategoriAktif}
          totalItems={totalItems}
          totalPrice={totalPrice}
        />

        <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MenuList
              menuList={menuFiltered}
              onTambahPesanan={handleTambahPesanan}
            />
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <RingkasanPesanan
                pesanan={pesanan}
                onUbahJumlah={handleUbahJumlah}
                onHapusItem={handleHapusItem}
                totalPrice={totalPrice}
              />
              <FormPesan
                onKirimPesanan={handleKirimPesanan}
                pesananKosong={pesanan.length === 0}
              />
            </div>
          </aside>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;