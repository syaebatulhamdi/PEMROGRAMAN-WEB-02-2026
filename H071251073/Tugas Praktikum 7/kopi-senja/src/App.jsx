import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

const daftarMenu = [
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
  const [namaTerkirim, setNamaTerkirim] = useState("");

  const menuTampil =
    kategoriAktif === "Semua"
      ? daftarMenu
      : daftarMenu.filter((menu) => menu.kategori === kategoriAktif);

  const itemPesanan = pesanan.map((p) => {
    const menu = daftarMenu.find((m) => m.id === p.id);
    return {
      id: p.id,
      nama: menu.nama,
      harga: menu.harga,
      jumlah: p.jumlah,
      subtotal: menu.harga * p.jumlah,
    };
  });
  const jumlahPesanan = itemPesanan.reduce((total, item) => total + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce((total, item) => total + item.subtotal, 0);

  function handleTambah(id) {
    const menu = daftarMenu.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return;

    setNamaTerkirim("");
    const sudahAda = pesanan.some((p) => p.id === id);
    if (sudahAda) {
      setPesanan(
        pesanan.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p))
      );
    } else {
      setPesanan([...pesanan, { id: id, jumlah: 1 }]);
    }
  }

  function handleKurangi(id) {
    setPesanan(
      pesanan
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function handleKirim(nama) {
    setNamaTerkirim(nama);
    setPesanan([]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-800">
      <Navbar
        kategoriAktif={kategoriAktif}
        onKategoriClick={setKategoriAktif}
        jumlahPesanan={jumlahPesanan}
        totalHarga={totalHarga}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {namaTerkirim !== "" && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-800"
          >
            <p className="font-semibold">Terima kasih, {namaTerkirim}!</p>
            <p className="text-sm">
              Pesanan Anda sudah terkirim dan sedang disiapkan.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Menu {kategoriAktif}</h2>
            <MenuList menuList={menuTampil} onTambah={handleTambah} />
          </section>

          <aside className="space-y-6">
            <RingkasanPesanan
              itemPesanan={itemPesanan}
              jumlahPesanan={jumlahPesanan}
              totalHarga={totalHarga}
              onTambah={handleTambah}
              onKurangi={handleKurangi}
            />
            <FormPesan jumlahPesanan={jumlahPesanan} onKirim={handleKirim} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
