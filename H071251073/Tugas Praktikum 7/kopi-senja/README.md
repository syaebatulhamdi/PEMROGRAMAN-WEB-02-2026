# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja. Dibangun dengan React (Vite), `useState`, dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Fitur

- Daftar 9 menu lengkap dengan harga, difilter berdasarkan kategori (Semua, Kopi, Non-Kopi, Makanan).
- Detail tiap menu dapat dibuka/ditutup secara terpisah (state di `MenuCard`).
- Menu yang habis memiliki tombol nonaktif.
- Jumlah item dan total harga di Navbar dan Ringkasan Pesanan dihitung dari satu state `pesanan`, sehingga selalu sama.
- Validasi form: nama minimal 2 karakter, nomor meja 1-20, dan pesanan tidak boleh kosong.
- Setelah terkirim: tampil ucapan terima kasih, form dikosongkan, pesanan dikosongkan.

## State

| State | Lokasi | Keterangan |
|---|---|---|
| `kategoriAktif` | App | Kategori terpilih |
| `pesanan` | App | Array `{ id, jumlah }` |
| `namaTerkirim` | App | Nama pemesan terakhir untuk ucapan terima kasih ("" = belum ada) |
| `detailTerbuka` | MenuCard | Status detail tiap kartu |
| `nama`, `meja`, `errorNama`, `errorMeja`, `errorPesanan` | FormPesan | Isian dan pesan kesalahan form |

Total harga dan jumlah item adalah nilai turunan (bukan state) agar tidak ada data ganda.
