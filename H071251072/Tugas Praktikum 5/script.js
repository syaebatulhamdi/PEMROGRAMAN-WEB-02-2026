// Elemen 
let statusAnggota = document.getElementById("statusAnggota");
let errorAnggota = document.getElementById("errorAnggota");
let daftarAnggota = document.getElementById("daftarAnggota");

let bagianTugas = document.getElementById("bagianTugas");
let judulTugas = document.getElementById("judulTugas");
let statusTugas = document.getElementById("statusTugas");
let errorTugas = document.getElementById("errorTugas");
let areaKonten = document.getElementById("areaKonten");
let cariTugas = document.getElementById("cariTugas");
let ringkasan = document.getElementById("ringkasan");
let formTugas = document.getElementById("formTugas");
let inputJudul = document.getElementById("inputJudul");
let tombolSimpan = document.getElementById("tombolSimpan");
let errorForm = document.getElementById("errorForm");
let notifikasi = document.getElementById("notifikasi");
let kosongTugas = document.getElementById("kosongTugas");
let daftarTugas = document.getElementById("daftarTugas");

// Variabel bantu 
let anggotaTerpilih = 0; 
let sedangMenyimpan = false;
let nomorNotifikasi = 0;

// Ringkasan progres (ngecek tugas yang sdh)
function perbaruiRingkasan() {
  let total = document.querySelectorAll("#daftarTugas li").length;
  let selesai = document.querySelectorAll("#daftarTugas .selesai").length;
  ringkasan.textContent = selesai + " dari " + total + " tugas selesai";
}

// Pencarian (F3) 
function terapkanFilter() {
  let kataKunci = cariTugas.value.toLowerCase();
  let semuaItem = document.querySelectorAll("#daftarTugas li");

  semuaItem.forEach((item) => {
    let judul = item.querySelector(".judul-tugas").textContent.toLowerCase();
    if (judul.includes(kataKunci)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  let tampil = document.querySelectorAll("#daftarTugas li:not(.hidden)").length;
  if (semuaItem.length > 0 && tampil === 0) {
    kosongTugas.classList.remove("hidden");
  } else {
    kosongTugas.classList.add("hidden");
  }
}

cariTugas.addEventListener("input", () => {
  terapkanFilter();
});

// Membuat satu item tugas 
function buatItemTugas(tugas) {
  let li = document.createElement("li");
  li.classList.add("flex", "items-center", "gap-2", "border", "border-gray-200", "rounded", "p-2");

  let judul = document.createElement("span");
  judul.classList.add("judul-tugas", "flex-1");
  judul.textContent = tugas.title;

  let tombolHapus = document.createElement("button");
  tombolHapus.textContent = "Hapus";
  tombolHapus.classList.add("bg-[#99000D]", "hover:bg-red-600", "text-white", "text-sm", "px-2", "py-1", "rounded");

  function tandaiSelesai() {
    judul.classList.add("selesai");
    judul.classList.add("line-through");
    judul.classList.add("text-gray-400");
  }

  li.appendChild(judul);

  if (tugas.completed) {
    tandaiSelesai();
  } else {
    let tombolTandai = document.createElement("button");
    tombolTandai.textContent = "Tandai selesai";
    tombolTandai.classList.add("bg-[#3B6255]", "hover:bg-green-600", "text-white", "text-sm", "px-2", "py-1", "rounded");
    tombolTandai.addEventListener("click", () => {
      tandaiSelesai();
      tombolTandai.remove();
      perbaruiRingkasan();
    });
    li.appendChild(tombolTandai);
  }

  tombolHapus.addEventListener("click", () => {
    li.remove();
    perbaruiRingkasan();
    terapkanFilter();
  });
  li.appendChild(tombolHapus);

  return li;
}

// Menampilkan daftar anggota 
async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  errorAnggota.textContent = "";

  try {
    let respons = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let anggota = await respons.json();

    anggota.forEach((orang) => {
      let tombol = document.createElement("button");
      tombol.textContent = orang.name;
      tombol.classList.add("px-3", "py-2", "rounded", "border", "border-gray-300", "bg-white", "text-gray-700", "hover:bg-[#08306B]");
      tombol.addEventListener("click", () => {
        pilihAnggota(orang, tombol);
      });
      daftarAnggota.appendChild(tombol);
    });

    statusAnggota.textContent = ""; // hapus teks loading
  } catch (error) {
    statusAnggota.textContent = "";
    errorAnggota.textContent = "Gagal memuat anggota: " + error.message;
  }
}

// Menampilkan tugas anggota 
async function pilihAnggota(orang, tombol) {
  anggotaTerpilih = orang.id;

  // tandai satu anggota
  let semuaTombol = document.querySelectorAll("#daftarAnggota button");
  semuaTombol.forEach((item) => {
    item.classList.remove("bg-blue-600");
    item.classList.remove("text-white");
    item.classList.remove("border-blue-600");
    item.classList.add("bg-white");
    item.classList.add("text-gray-700");
  });
  tombol.classList.remove("bg-white");
  tombol.classList.remove("text-gray-700");
  tombol.classList.add("bg-blue-600");
  tombol.classList.add("text-white");
  tombol.classList.add("border-blue-600");

  // siapkan tampilan
  bagianTugas.classList.remove("hidden");
  judulTugas.textContent = "Tugas " + orang.name;
  daftarTugas.innerHTML = ""; 
  areaKonten.classList.add("hidden");
  errorTugas.textContent = "";
  errorForm.textContent = "";
  notifikasi.textContent = "";
  cariTugas.value = "";
  kosongTugas.classList.add("hidden");
  statusTugas.textContent = "Memuat tugas...";

  try {
    let respons = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + orang.id);
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let tugas = await respons.json();

    // abaikan jika pengguna sudah memilih anggota lain
    if (anggotaTerpilih !== orang.id) {
      return;
    }

    tugas.forEach((item) => {
      daftarTugas.appendChild(buatItemTugas(item));
    });

    perbaruiRingkasan();
    statusTugas.textContent = "";
    areaKonten.classList.remove("hidden");
  } catch (error) {
    if (anggotaTerpilih !== orang.id) {
      return;
    }
    statusTugas.textContent = "";
    errorTugas.textContent = "Gagal memuat tugas: " + error.message;
  }
}

// Simulasi menyimpan ke server 
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let sudahAda = false;
      let semuaJudul = document.querySelectorAll("#daftarTugas .judul-tugas");
      semuaJudul.forEach((item) => {
        if (item.textContent.toLowerCase() === judul.toLowerCase()) {
          sudahAda = true;
        }
      });

      if (sudahAda) {
        reject(new Error("Tugas \"" + judul + "\" sudah ada di daftar"));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  nomorNotifikasi = nomorNotifikasi + 1;
  let nomorIni = nomorNotifikasi;
  notifikasi.textContent = pesan;
  setTimeout(() => {
    if (nomorIni === nomorNotifikasi) {
      notifikasi.textContent = "";
    }
  }, 3000);
}

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sedangMenyimpan) {
    return;
  }

  errorForm.textContent = "";
  let judul = inputJudul.value.trim();

  // validasi
  if (judul.length < 5) {
    errorForm.textContent = "Judul tugas minimal 5 karakter.";
    return;
  }

  sedangMenyimpan = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    let tugasBaru = await simpanTugas(judul);
    daftarTugas.appendChild(buatItemTugas(tugasBaru));
    perbaruiRingkasan();
    terapkanFilter();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    errorForm.textContent = error.message;
  } finally {
    tombolSimpan.textContent = "Simpan";
    sedangMenyimpan = false;
  }
});

muatAnggota();
