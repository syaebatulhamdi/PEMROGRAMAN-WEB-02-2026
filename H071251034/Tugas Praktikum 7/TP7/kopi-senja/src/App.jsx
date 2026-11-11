import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";
import fotoKopiSusu from "./assets/menu/kopi-susu.jpg";
import fotoAmericano from "./assets/menu/americano.jpg";
import fotoCappuccino from "./assets/menu/cappuccino.jpg";
import fotoMatchaLatte from "./assets/menu/matcha-latte.jpg";
import fotoTehTarik from "./assets/menu/teh-tarik.jpg";
import fotoCokelatPanas from "./assets/menu/cokelat-panas.jpg";
import fotoRotiBakar from "./assets/menu/roti-bakar.jpg";
import fotoPisangGoreng from "./assets/menu/pisang-goreng.jpg";
import fotoNasiGoreng from "./assets/menu/nasi-goreng.jpg";
import fotoKopi from "./assets/menu/kopi.png";
import logoKopi from "./assets/menu/logo.png";


// Satu-satunya sumber data menu. Komponen anak hanya menerimanya lewat props.
const menuData = [
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

const fotoMenu = {
  1: fotoKopiSusu,
  2: fotoAmericano,
  3: fotoCappuccino,
  4: fotoMatchaLatte,
  5: fotoTehTarik,
  6: fotoCokelatPanas,
  7: fotoRotiBakar,
  8: fotoPisangGoreng,
  9: fotoNasiGoreng,
};

function App() {
  // State milik App: kategori yang dipilih dan isi pesanan (hanya id + jumlah).
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);

  function tambahPesanan(id) {
    const menu = menuData.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return; // menu habis tidak boleh dipesan

    setPesanan((sebelumnya) => {
      const sudahAda = sebelumnya.some((p) => p.id === id);
      if (sudahAda) {
        return sebelumnya.map((p) =>
          p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p
        );
      }
      return [...sebelumnya, { id, jumlah: 1 }];
    });
  }

  function kurangiPesanan(id) {
    setPesanan((sebelumnya) =>
      sebelumnya
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function hapusPesanan(id) {
    setPesanan((sebelumnya) => sebelumnya.filter((p) => p.id !== id));
  }

  function kosongkanPesanan() {
    setPesanan([]);
  }

  // Data turunan dihitung dari satu state "pesanan", bukan disimpan di state lain,
  // sehingga angka di Navbar dan di ringkasan selalu sama.
  const itemPesanan = pesanan.map((p) => {
    const menu = menuData.find((m) => m.id === p.id);
    return { id: p.id, nama: menu.nama, harga: menu.harga, jumlah: p.jumlah };
  });
  const jumlahItem = itemPesanan.reduce((total, item) => total + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  return (
    <div id="atas">
      <Navbar jumlahItem={jumlahItem} totalHarga={totalHarga} />

      {/* Hero: berada tepat di bawah navbar (navbar menumpang di atasnya) */}
      <section className="relative -mt-16 overflow-hidden bg-linear-to-b from-stone-900 via-amber-950 to-amber-900 pt-16 text-orange-100">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute left-[8%] top-[22%] h-10 w-10 rounded-full bg-amber-300/40 blur-md" />
          <span className="absolute left-[30%] top-[12%] h-14 w-14 rounded-full bg-amber-200/30 blur-lg" />
          <span className="absolute right-[26%] top-[16%] h-16 w-16 rounded-full bg-amber-300/30 blur-lg" />
          <span className="absolute right-[8%] top-[34%] h-12 w-12 rounded-full bg-orange-300/30 blur-md" />
          <span className="absolute left-[16%] top-[56%] h-20 w-20 rounded-full bg-amber-400/20 blur-xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-12 text-center sm:px-6 sm:pt-16">
          <h1>
            <span className="block font-['Cormorant_Garamond',Georgia,serif] text-3xl font-medium italic text-orange-100/90 sm:text-5xl">
              Diseduh hingga
            </span>
            <span className="block font-['Cormorant_Garamond',Georgia,serif] text-6xl font-semibold leading-none sm:text-8xl">
              Sempurna
            </span>
          </h1>
          <p className="mt-5 max-w-md text-orange-100/75">
            Pesan langsung dari mejamu. Pilih menu, isi nama, dan kami antar.
          </p>


          <img
            src={fotoKopi}
            alt="Secangkir Kopi Senja"
            className="mt-6 h-48 w-64 object-cover sm:h-56 sm:w-80 "
          />
        </div>

        {/* Tepi kertas sobek */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="absolute -bottom-px left-0 h-6 w-full fill-orange-100 sm:h-9"
        >
          <path d="M0 40 L0 10.9 L12 8.3 L24 15.8 L36 7.1 L48 14.0 L60 11.5 L72 6.9 L84 13.6 L96 6.6 L108 12.5 L120 7.0 L132 7.4 L144 12.4 L156 18.4 L168 7.9 L180 9.3 L192 15.4 L204 20.2 L216 14.7 L228 12.0 L240 20.6 L252 6.7 L264 18.9 L276 10.3 L288 8.2 L300 7.8 L312 10.6 L324 18.2 L336 8.7 L348 14.7 L360 15.6 L372 11.6 L384 14.2 L396 6.9 L408 6.9 L420 9.1 L432 16.2 L444 12.4 L456 10.7 L468 14.8 L480 12.8 L492 10.5 L504 17.9 L516 16.5 L528 9.7 L540 14.6 L552 13.9 L564 19.1 L576 16.9 L588 10.3 L600 20.7 L612 7.8 L624 12.3 L636 17.4 L648 8.3 L660 13.3 L672 6.6 L684 16.0 L696 17.5 L708 14.6 L720 19.1 L732 10.7 L744 16.4 L756 14.9 L768 14.7 L780 12.8 L792 18.6 L804 20.2 L816 13.1 L828 16.0 L840 6.9 L852 16.5 L864 15.7 L876 20.9 L888 18.3 L900 10.3 L912 11.8 L924 16.0 L936 6.3 L948 12.9 L960 8.5 L972 7.8 L984 6.9 L996 17.5 L1008 7.9 L1020 9.7 L1032 11.9 L1044 19.1 L1056 7.2 L1068 12.7 L1080 14.2 L1092 19.3 L1104 18.3 L1116 19.0 L1128 10.2 L1140 12.2 L1152 11.4 L1164 19.3 L1176 20.4 L1188 8.3 L1200 8.6 L1212 9.5 L1224 9.5 L1236 13.3 L1248 14.8 L1260 9.9 L1272 6.1 L1284 12.3 L1296 11.5 L1308 14.5 L1320 20.3 L1332 16.4 L1344 13.7 L1356 15.3 L1368 16.1 L1380 6.8 L1392 19.5 L1404 17.7 L1416 19.1 L1428 18.0 L1440 11.9 L1440 40 Z" />
        </svg>
      </section>


      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:grid-cols-[auto_1fr] sm:gap-14 sm:px-6 sm:py-16">
          <img
            src={logoKopi}
            alt="Secangkir Kopi Senja"
            className="mt-6 h-48 w-64 object-cover sm:h-56 sm:w-80 "
          />
        <div className="text-center sm:text-left">
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-semibold leading-tight sm:text-6xl">
            Santai di meja,
            <span className="block italic text-amber-700">tanpa antre.</span>
          </h2>
          <p className="mt-4 max-w-lg text-amber-900/80">
            Semua menu Kedai Kopi Senja ada di halaman ini. Jumlah pesanan dan
            total harga langsung terlihat setiap kali kamu menekan Tambah.
          </p>
          <a
            href="#menu"
            className="mt-6 inline-block rounded-full border-2 border-stone-900 px-7 py-3 font-semibold transition hover:bg-stone-900 hover:text-orange-100"
          >
            Lihat menu
          </a>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <MenuList
          menu={menuData}
          fotoMenu={fotoMenu}
          kategoriAktif={kategoriAktif}
          onPilihKategori={setKategoriAktif}
          pesanan={pesanan}
          onTambah={tambahPesanan}
          onKurang={kurangiPesanan}
        />

        <aside
          id="pesan"
          className="flex scroll-mt-24 flex-col gap-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto"
        >
          <RingkasanPesanan
            items={itemPesanan}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onTambah={tambahPesanan}
            onKurang={kurangiPesanan}
            onHapus={hapusPesanan}
            onKosongkan={kosongkanPesanan}
          />
          <FormPesan
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onKirim={kosongkanPesanan}
          />
        </aside>
      </main>

      <Footer namaKedai="Kedai Kopi Senja" jamBuka="Buka setiap hari, 08.00 sampai 21.00" />
    </div>
  );
}

export default App;