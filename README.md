# PEMROGRAMAN-WEB-02-2026 Repository

Selamat datang di repositori PEMROGRAMAN-WEB-02-2026! Repositori ini adalah tempat pengumpulan tugas untuk mata kuliah Pemrograman Web. Berikut adalah panduan lengkap untuk mengumpulkan tugas.

---

## BAGIAN 1: Pembuatan Branch dan Pengumpulan Tugas Pertama

Langkah ini **HANYA** dilakukan saat kamu mengumpulkan tugas untuk pertama kalinya.

1. **Fork Repositori**: Di kanan atas halaman repositori ini, klik tombol "Fork" untuk membuat salinan repositori ke akun GitHub pribadimu.

2. **Salin URL**: Di halaman repositori hasil *fork* di akunmu, klik tombol "Code" (warna hijau) dan salin URL HTTPS yang diberikan.

3. **Kloning Repositori**: Buka Terminal / Git Bash / Command Prompt di komputermu, lalu ketik perintah berikut (ganti `<url-repositori-hasil-fork>` dengan URL yang kamu salin):

~~~bash
git clone <url-repositori-hasil-fork>
~~~

4. **Masuk ke Repositori & Buat Branch**: Masuk ke folder utama, lalu buat cabang (*branch*) baru khusus untukmu. Gunakan format NIM masing-masing.

~~~bash
cd PEMROGRAMAN-WEB-02-2026
git checkout -b H0712510-- # Ganti dengan NIM masing-masing (Ingat pakai -b)
~~~

5. **Buat Folder Tugas (Sangat Penting)**: Buat folder fisik baru dengan nama NIM-mu agar kodemu tidak tercampur dengan praktikan lain, lalu masuk ke folder tersebut.

~~~bash
mkdir H0712510-- # Membuat folder NIM
cd H0712510--    # Masuk ke folder NIM
~~~

6. **Lakukan Perubahan**: Mulai buat, edit, atau tambahkan berkas ke dalam folder NIM-mu sesuai dengan instruksi tugas yang diberikan.

7. **Simpan dan Kirim (Commit & Push)**:

~~~bash
git add .
git commit -m "Kumpul Tugas 1: Dasar HTML"
git push -u origin H0712510-- # Sesuaikan NIM
~~~

8. **Buka Pull Request (PR)**: Kembali ke GitHub, masuk ke repositori *fork* milikmu, klik tombol **"Compare & pull request"**, lalu klik **"Create pull request"**.

---

## BAGIAN 2: Pengumpulan Tugas Minggu Berikutnya (Tugas 2, 3, dst.)

Mulai minggu kedua dan seterusnya, langkahnya jauh lebih singkat. Kamu **TIDAK PERLU** melakukan fork, clone, atau membuat *branch* baru lagi.

1. **Buka Terminal**: Buka terminal dan pastikan kamu sudah berada di dalam folder `PEMROGRAMAN-WEB-02-2026` di komputermu.

2. **Pastikan Berada di Branch NIM**: Pindah ke *branch* NIM-mu. *(Catatan: Gunakan checkout biasa, **JANGAN** gunakan `-b` lagi karena branch-nya sudah ada).*

~~~bash
git checkout H0712510-- # Ganti dengan NIM (TANPA -b)
~~~

3. **Masuk ke Folder NIM**:

~~~bash
cd H0712510--
~~~

4. **Kerjakan Tugas Baru**: Buat file atau folder baru untuk tugas minggu ini di dalam folder NIM-mu.

5. **Simpan dan Kirim (Commit & Push)**:

~~~bash
git add .
git commit -m "Kumpul Tugas 2: Conditional Statement"
git push origin H0712510-- # Sesuaikan NIM (Tidak perlu -u lagi)
~~~

6.**Buka Pull Request (PR)**: Kembali ke GitHub, masuk ke repositori *fork* milikmu, klik tombol **"Compare & pull request"**, lalu klik **"Create pull request"**.

---

## Aturan Penulisan Pesan Commit

Pesan *commit* harus jelas dan mendeskripsikan apa yang kamu kerjakan. 

**Contoh Commit yang BAIK**
* `Kumpul Tugas 1: Conditional Statement`

---
Terima kasih atas kerja samanya. Selamat mengoding dan semangat belajar!
