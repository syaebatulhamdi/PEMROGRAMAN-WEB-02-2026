# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja. Dibuat dengan React (Vite), JavaScript (JSX), dan Tailwind CSS v4 (plugin `@tailwindcss/vite`, tanpa CSS tambahan) untuk Tugas Praktikum 7 (React Hooks: State & Props).

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Struktur komponen

| Berkas | Peran |
| --- | --- |
| `App.jsx` | Data menu (satu kali), state `kategoriAktif` dan `pesanan` |
| `Navbar.jsx` | Menampilkan jumlah item dan total harga (props) |
| `MenuList.jsx` | Tab kategori dan daftar menu dengan `.map()` |
| `MenuCard.jsx` | Satu menu, state `detailTerbuka` milik sendiri |
| `RingkasanPesanan.jsx` | Rincian pesanan, jumlah, dan total (props) |
| `FormPesan.jsx` | Form terkontrol, validasi, ucapan terima kasih |
| `Footer.jsx` | Informasi kedai (props) |

## Penerapan materi

- State dibuat dengan `useState` (named import) di level atas komponen, diubah hanya lewat setter tanpa mutasi.
- Lifting state up: `pesanan` ada di `App`, lalu dibagikan lewat props. Jumlah item dan total harga dihitung dari satu state itu, sehingga angka di Navbar dan ringkasan selalu sama.
- Props diterima dengan destructuring. Angka dan boolean dikirim dengan `{ }`.
- List memakai `key` dari `id` data, bukan index.
- Form memakai controlled component (`value` + `onChange`) dan `e.preventDefault()`.
- Foto menu: diimport di `App.jsx` dari `src/assets/menu/` (lihat `PETUNJUK.txt`). Berkas yang ada masih foto sementara, timpa dengan foto asli bernama sama.
- `src/index.css` hanya berisi `@import "tailwindcss";`. Seluruh styling memakai class utility Tailwind.
- Tidak ada manipulasi DOM langsung, `innerHTML`, class component, atau library state/UI.
