// Konstanta tampilan yang dipakai Server maupun Client Component.
export const daftarKategori = [
  "Semua",
  "Teknologi",
  "Fiksi",
  "Pengembangan Diri",
];

export const warnaSampul = [
  "bg-coral text-white",
  "bg-iris text-white",
  "bg-sage text-white",
  "bg-honey text-plum",
  "bg-plum text-white",
];

// Pesan notifikasi setelah operasi (dibaca dari ?pesan=... di URL).
export const pesanStatus = {
  ditambah: { tipe: "sukses", teks: "Buku baru berhasil ditambahkan." },
  diubah: { tipe: "sukses", teks: "Perubahan buku berhasil disimpan." },
  dihapus: { tipe: "sukses", teks: "Buku berhasil dihapus dari koleksi." },
  gagal: {
    tipe: "galat",
    teks: "Operasi gagal diproses. Coba lagi beberapa saat.",
  },
};
