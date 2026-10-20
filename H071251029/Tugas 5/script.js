"use strict";

// ========================================
// KONFIGURASI API & ELEMEN DOM
// ========================================

// URL dasar untuk mengambil data dummy dari JSONPlaceholder API
const API_URL = "https://jsonplaceholder.typicode.com";

// Referensi ke elemen-elemen HTML yang dibutuhkan oleh aplikasi
const memberList = document.getElementById("member-list");       // Kontainer daftar anggota
const memberStatus = document.getElementById("member-status");   // Status teks saat memuat anggota
const taskHeading = document.getElementById("task-heading");     // Judul bagian tugas berdasarkan nama anggota
const taskStatus = document.getElementById("task-status");       // Status teks saat memuat tugas
const taskList = document.getElementById("task-list");           // Kontainer daftar tugas
const progress = document.getElementById("progress");            // Teks informasi progres (misal: 2 dari 5 selesai)
const progressBar = document.getElementById("progress-bar");     // Bar visual penanda progres
const searchInput = document.getElementById("search-input");     // Input kotak pencarian tugas
const noMatch = document.getElementById("no-match");             // Pesan ketika pencarian tugas tidak ditemukan
const taskForm = document.getElementById("task-form");           // Form untuk menambah tugas baru
const taskTitle = document.getElementById("task-title");         // Input teks untuk judul tugas baru
const saveButton = document.getElementById("save-button");       // Tombol simpan tugas
const formMessage = document.getElementById("form-message");     // Pesan error/peringatan pada form
const notification = document.getElementById("notification");    // Notifikasi sukses mengunggah/menyimpan tugas


// ========================================
// STATE APLIKASI (PENYIMPANAN DATA SEMENTARA)
// ========================================

let members = [];           // Menyimpan daftar seluruh anggota yang diambil dari API
let tasks = [];             // Menyimpan daftar tugas milik anggota yang sedang dipilih
let selectedMember = null;  // Menyimpan objek anggota yang sedang aktif/dipilih
let notificationTimer = null; // Timer untuk menghilangkan notifikasi secara otomatis
let requestNumber = 0;      // Penghitung request untuk mencegah race condition saat klik anggota cepat


// ========================================
// F1: MENGAMBIL DATA ANGGOTA
// ========================================

// Fungsi asinkron untuk mengambil data user/anggota dari server API
async function ambilAnggota() {
  // Menampilkan pesan status bahwa data sedang dimuat
  memberStatus.textContent = "Memuat anggota...";
  memberStatus.className = "mb-3 text-xs text-slate-500";

  try {
    // Melakukan request HTTP GET ke endpoint /users
    const response = await fetch(`${API_URL}/users`);

    // Jika response tidak sukses, lemparkan error
    if (!response.ok) {
      throw new Error("Gagal memuat data anggota.");
    }

    // Mengubah data response menjadi format JSON
    members = await response.json();
    memberList.innerHTML = ""; // Kosongkan kontainer list sebelum diisi

    // Perulangan untuk membuat elemen tombol bagi setiap anggota
    members.forEach((member, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.dataset.memberId = member.id;
      button.className =
        "member-button flex w-full items-center rounded-lg px-2 py-2 text-left text-sm transition hover:bg-slate-100";

      // Membuat elemen nomor urut anggota
      const nomor = document.createElement("span");
      nomor.className =
        "mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-medium text-slate-500";
      nomor.textContent = String(index + 1).padStart(2, "0");

      // Membuat elemen nama anggota
      const nama = document.createElement("span");
      nama.className = "min-w-0 break-words";
      nama.textContent = member.name;

      // Menyusun elemen ke dalam tombol
      button.appendChild(nomor);
      button.appendChild(nama);

      // Event listener ketika tombol anggota diklik
      button.addEventListener("click", () => {
        pilihAnggota(member);
      });

      // Masukkan tombol ke dalam daftar anggota di HTML
      memberList.appendChild(button);
    });

    // Bersihkan status jika berhasil dimuat
    memberStatus.textContent = "";

    // Jika data anggota kosong
    if (members.length === 0) {
      memberStatus.textContent = "Tidak ada anggota.";
    }
  } catch (error) {
    // Menampilkan pesan error jika proses fetch gagal
    memberStatus.textContent =
      error.message || "Gagal memuat anggota.";
    memberStatus.className = "mb-3 text-xs text-red-600";
  }
}


// ========================================
// F2: MEMILIH ANGGOTA
// ========================================

// Fungsi yang dijalankan saat salah satu anggota dipilih dari daftar
async function pilihAnggota(member) {
  selectedMember = member;
  const currentRequest = ++requestNumber; // Menandai nomor request saat ini untuk menghindari race condition

  // Mengatur ulang tampilan tombol anggota (menghapus status aktif sebelumnya)
  document.querySelectorAll(".member-button").forEach((button) => {
    button.classList.remove("bg-blue-50", "text-blue-700");
    button.classList.add("text-slate-800");
  });

  // Menandai tombol anggota yang sedang dipilih dengan warna latar biru
  const selectedButton = document.querySelector(
    `[data-member-id="${member.id}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add("bg-blue-50", "text-blue-700");
    selectedButton.classList.remove("text-slate-800");
  }

  // Mengatur ulang tampilan panel tugas dan form
  taskHeading.textContent = `Tugas ${member.name}`;
  taskList.innerHTML = "";
  noMatch.classList.add("hidden");

  searchInput.value = "";
  taskTitle.value = "";

  formMessage.textContent = "";
  formMessage.classList.add("hidden");

  notification.textContent = "";
  notification.classList.add("hidden");
  clearTimeout(notificationTimer);

  tasks = [];

  // Menampilkan status sedang memuat tugas
  taskStatus.textContent = "Memuat tugas...";
  taskStatus.className =
    "px-4 pt-3 pb-2 text-sm text-slate-500 sm:px-5";

  progress.textContent = "Memuat progres...";
  progressBar.style.width = "0%";

  try {
    // Mengambil data tugas berdasarkan ID anggota (userId)
    const response = await fetch(
      `${API_URL}/todos?userId=${member.id}`
    );

    if (!response.ok) {
      throw new Error("Gagal memuat tugas anggota.");
    }

    const data = await response.json();

    // Mencegah pembaruan jika user telah mengklik anggota lain di tengah proses fetch
    if (currentRequest !== requestNumber) {
      return;
    }

    tasks = data;
    tampilkanTugas(); // Render daftar tugas ke layar
  } catch (error) {
    if (currentRequest !== requestNumber) {
      return;
    }

    tasks = [];
    taskList.innerHTML = "";

    // Menampilkan pesan error jika gagal mengambil tugas
    taskStatus.textContent =
      error.message || "Terjadi kesalahan saat memuat tugas.";
    taskStatus.className =
      "px-4 pt-3 pb-2 text-sm text-red-600 sm:px-5";

    progress.textContent = "Progres tidak dapat dimuat.";
    progressBar.style.width = "0%";
  }
}


// ========================================
// MENAMPILKAN TUGAS
// ========================================

// Fungsi untuk merender semua tugas ke dalam elemen HTML list
function tampilkanTugas() {
  taskList.innerHTML = "";

  // Membuat elemen untuk setiap tugas dan menambahkannya ke kontainer
  tasks.forEach((task) => {
    taskList.appendChild(buatElemenTugas(task));
  });

  taskStatus.textContent = "";
  taskStatus.className = "hidden";

  perbaruiProgress(); // Hitung ulang bar progres
  filterTugas();      // Terapkan filter pencarian jika ada
}


// ========================================
// MEMBUAT ELEMEN TUGAS
// ========================================

// Fungsi helper untuk membuat elemen DOM individual dari sebuah objek tugas
function buatElemenTugas(task) {
  const wrapper = document.createElement("div");
  wrapper.className = "task-item flex items-start gap-3 py-3";

  // Indikator visual status tugas (lingkaran)
  const statusCircle = document.createElement("div");
  statusCircle.className =
    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border";

  // Judul tugas
  const title = document.createElement("span");
  title.className = "task-title min-w-0 flex-1 break-words text-sm";
  title.textContent = task.title;

  // Tombol aksi (selesai / hapus)
  const actions = document.createElement("div");
  actions.className =
    "flex shrink-0 flex-wrap items-center justify-end gap-1";

  // Fungsi internal untuk mengubah tampilan tugas menjadi status "Selesai"
  function perbaruiTampilanSelesai() {
    statusCircle.innerHTML = "";
    statusCircle.classList.remove("border-slate-300", "bg-white");
    statusCircle.classList.add("border-emerald-500", "bg-emerald-500");

    const check = document.createElement("span");
    check.textContent = "✓";
    check.className = "text-[10px] font-bold text-white";
    statusCircle.appendChild(check);

    title.classList.add("line-through", "text-slate-400");
  }

  // Kondisi awal berdasarkan status tugas (completed true/false)
  if (task.completed) {
    perbaruiTampilanSelesai();
  } else {
    statusCircle.classList.add("border-slate-300", "bg-white");

    // Tombol untuk menandai tugas selesai
    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = "Tandai selesai";
    completeButton.className =
      "rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-emerald-50 hover:text-emerald-700";

    completeButton.addEventListener("click", () => {
      task.completed = true;
      perbaruiTampilanSelesai();
      completeButton.remove(); // Hapus tombol setelah selesai
      perbaruiProgress();
    });

    actions.appendChild(completeButton);
  }

  // Tombol untuk menghapus tugas
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Hapus";
  deleteButton.className =
    "rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-red-50 hover:text-red-600";

  deleteButton.addEventListener("click", () => {
    const index = tasks.indexOf(task);

    if (index !== -1) {
      tasks.splice(index, 1); // Hapus dari array state
    }

    wrapper.remove(); // Hapus elemen dari DOM
    perbaruiProgress();
    filterTugas();
  });

  actions.appendChild(deleteButton);

  // Menyusun semua bagian ke dalam wrapper tugas
  wrapper.appendChild(statusCircle);
  wrapper.appendChild(title);
  wrapper.appendChild(actions);

  return wrapper;
}


// ========================================
// MEMPERBARUI PROGRESS
// ========================================

// Fungsi untuk menghitung dan memperbarui bar progres dan teks statistik tugas
function perbaruiProgress() {
  const selesai = tasks.filter((task) => task.completed).length;
  const total = tasks.length;

  progress.textContent = `${selesai} dari ${total} tugas selesai`;

  // Menghitung persentase progres, hindari pembagian dengan nol
  const percentage = total > 0 ? (selesai / total) * 100 : 0;
  progressBar.style.width = `${percentage}%`;
}


// ========================================
// F3: PENCARIAN TUGAS
// ========================================

// Fungsi untuk memfilter daftar tugas berdasarkan kata kunci di kotak pencarian
function filterTugas() {
  const keyword = searchInput.value.trim().toLowerCase();
  const items = taskList.querySelectorAll(".task-item");
  let jumlahCocok = 0;

  items.forEach((item) => {
    const title = item.querySelector(".task-title");
    const judul = title ? title.textContent.toLowerCase() : "";
    const cocok = judul.includes(keyword);

    // Sembunyikan atau tampilkan elemen berdasarkan kecocokan pencarian
    item.classList.toggle("hidden", !cocok);

    if (cocok) {
      jumlahCocok++;
    }
  });

  // Tampilkan pesan "tidak ada yang cocok" jika pencarian tidak membuahkan hasil
  if (keyword !== "" && jumlahCocok === 0) {    
    noMatch.classList.remove("hidden");
  } else {
    noMatch.classList.add("hidden");
  }
}

// Event listener untuk mendeteksi ketikan pada input pencarian secara real-time
searchInput.addEventListener("input", filterTugas);


// ========================================
// F4: SIMULASI MENYIMPAN TUGAS
// ========================================

// Fungsi simulasi asynchronous untuk menyimpan tugas baru (menggunakan Promise & setTimeout)
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validasi duplikasi: Cek apakah judul tugas sudah ada sebelumnya
      const sudahAda = tasks.some(
        (task) =>
          task.title.trim().toLowerCase() ===
          judul.trim().toLowerCase()
      );

      if (sudahAda) {
        reject(new Error("Tugas dengan judul tersebut sudah ada."));
        return;
      }

      // Berhasil, kembalikan objek tugas baru
      resolve({
        title: judul,
        completed: false
      });
    }, 1000);
  });
}


// ========================================
// NOTIFIKASI BERHASIL
// ========================================

// Fungsi untuk menampilkan pesan notifikasi sukses sementara
function tampilkanNotifikasi(pesan) {
  clearTimeout(notificationTimer);

  notification.textContent = pesan;
  notification.className =
    "mt-1 text-xs font-medium text-emerald-600";
  notification.classList.remove("hidden");

  // Otomatis menyembunyikan notifikasi setelah 3 detik
  notificationTimer = setTimeout(() => {
    notification.textContent = "";
    notification.classList.add("hidden");
  }, 3000);
}


// ========================================
// F4: FORM TAMBAH TUGAS
// ========================================

// Event listener saat form tambah tugas disubmit
taskForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Mencegah reload halaman default form

  // Reset pesan error dan notifikasi sebelumnya
  formMessage.textContent = "";
  formMessage.classList.add("hidden");

  notification.textContent = "";
  notification.classList.add("hidden");
  clearTimeout(notificationTimer);

  // Validasi: Pastikan anggota sudah dipilih
  if (!selectedMember) {
    formMessage.textContent = "Pilih anggota terlebih dahulu.";
    formMessage.className = "mt-1 text-xs text-red-600";
    formMessage.classList.remove("hidden");
    return;
  }

  const judul = taskTitle.value.trim();

  // Validasi: Judul tidak boleh kosong
  if (judul.length === 0) {
    formMessage.textContent = "Judul tugas tidak boleh kosong.";
    formMessage.className = "mt-1 text-xs text-red-600";
    formMessage.classList.remove("hidden");
    return;
  }

  // Validasi: Panjang minimal judul 5 karakter
  if (judul.length < 5) {
    formMessage.textContent =
      "Judul terlalu pendek, minimal 5 karakter.";
    formMessage.className = "mt-1 text-xs text-red-600";
    formMessage.classList.remove("hidden");
    return;
  }

  // Ubah status tombol simpan menjadi proses memuat (loading)
  saveButton.textContent = "Menyimpan...";
  saveButton.disabled = true;

  try {
    // Panggil fungsi simulasi simpan tugas secara asinkron
    const tugasBaru = await simpanTugas(judul);

    // Tambahkan tugas baru ke state array dan render ke DOM
    tasks.push(tugasBaru);
    taskList.appendChild(buatElemenTugas(tugasBaru));

    perbaruiProgress();
    taskTitle.value = ""; // Kosongkan input form

    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
    filterTugas();
  } catch (error) {
    // Tampilkan pesan error jika validasi atau penyimpanan gagal
    formMessage.textContent =
      error.message || "Tugas gagal disimpan.";
    formMessage.className = "mt-1 text-xs text-red-600";
    formMessage.classList.remove("hidden");
  } finally {
    // Kembalikan tombol simpan ke kondisi semula (aktif)
    saveButton.textContent = "Simpan";
    saveButton.disabled = false;
  }
});


// ========================================
// JALANKAN APLIKASI
// ========================================

// Panggil fungsi utama untuk memuat daftar anggota saat pertama kali skrip berjalan
ambilAnggota();