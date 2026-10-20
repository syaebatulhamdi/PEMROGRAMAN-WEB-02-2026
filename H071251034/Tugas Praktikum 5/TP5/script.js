let daftarTugasGlobal = [];
let namaAnggotaAktif = "";
let idAnggotaAktif = null;
let permintaanTerakhir = 0;


const statusAnggota = document.getElementById("statusAnggota");
const listAnggota = document.getElementById("listAnggota");
const statusTugas = document.getElementById("statusTugas");
const listTugas = document.getElementById("listTugas");
const inputCariTugas = document.getElementById("cariTugas");
const formTambahTugas = document.getElementById("formTambah");
const inputJudulTugas = document.getElementById("inputJudul");
const errorFormTugas = document.getElementById("errorForm");
const btnSimpanTugas = document.getElementById("btnSimpan");
const notifikasiTugas = document.getElementById("notifikasi");


// daftar anggotanya
async function ambilAnggota() {
    statusAnggota.textContent = "Memuat anggota...";
    listAnggota.innerHTML = "";

    try {
        const respons = await fetch("https://jsonplaceholder.typicode.com/users");

        // respons.ok bernilai false kalau server membalas error
        // fetch tidak error sendiri untuk kasus ini, jadi wajib dicek manual
        if (!respons.ok) {
            throw new Error("Status: " + respons.status);
        }

        // Ubah balasan server (JSON) menjadi array JavaScript
        const pengguna = await respons.json();

        // Data sudah masuk, hapus tulisan loading
        statusAnggota.textContent = "";

        // Buat satu tombol untuk tiap anggota
        pengguna.forEach((orang) => {
            const btn = document.createElement("button");
            btn.textContent = orang.name;
            btn.className = "w-full text-left px-4 py-2 border rounded-lg hover:bg-gray-50 transition";

            // Saat tombol anggota diklik
            btn.addEventListener("click", async () => {
                // Hapus tanda dari semua tombol, lalu beri tanda ke yang diklik
                // Hasilnya hanya satu anggota yang bertanda
                const semuaTombol = listAnggota.querySelectorAll("button");
                semuaTombol.forEach((b) => b.classList.remove("bg-blue-100", "font-bold"));
                btn.classList.add("bg-blue-100", "font-bold");

                // Catat anggota yang sedang aktif dan ganti judul bagian tugas
                namaAnggotaAktif = orang.name;
                idAnggotaAktif = orang.id;
                document.getElementById("judulTugas").textContent = "Tugas " + orang.name;

                // Ambil tugas anggota ini dari server
                await ambilTugasAnggota(orang.id);
            });

            listAnggota.appendChild(btn);
        });
    } catch (error) {
        // Masuk sini kalau internet putus atau server membalas error
        statusAnggota.textContent = "Gagal memuat anggota: " + error.message;
    }
}


// Tugas 1 anggota 
async function ambilTugasAnggota(userId) {
    // Tampilkan loading, kosongkan daftar dan progres lama
    statusTugas.textContent = "Memuat tugas...";
    listTugas.innerHTML = "";
    document.getElementById("progresTugas").textContent = "";

    // Beri nomor pada permintaan ini. Nomor naik setiap kali ada klik anggota baru
    const nomor = ++permintaanTerakhir;

    try {
        const respons = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + userId);
        if (!respons.ok) {
            throw new Error("Status: " + respons.status);
        }
        const tugas = await respons.json();
        if (nomor !== permintaanTerakhir) return;
        statusTugas.textContent = "";
        daftarTugasGlobal = tugas;
        tampilkanDaftarTugas(daftarTugasGlobal);
    } catch (error) {
        if (nomor !== permintaanTerakhir) return;
        statusTugas.textContent = "Gagal memuat tugas: " + error.message;
    }
}


// tampil tugasnya lalu dipanggil kalau ada perubahan baru
function tampilkanDaftarTugas(tugasArray) {
    listTugas.innerHTML = "";

    tugasArray.forEach((tugas) => {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm tugas-item";

        const spanJudul = document.createElement("span");
        spanJudul.textContent = tugas.title;
        spanJudul.className = "flex-1 mr-2";

        if (tugas.completed) {
            spanJudul.classList.add("line-through", "text-gray-400");
        }
        li.appendChild(spanJudul);

        const aksiDiv = document.createElement("div");
        aksiDiv.className = "flex space-x-2";

        // Tombol Tandai Selesai
        if (!tugas.completed) {
            const btnSelesai = document.createElement("button");
            btnSelesai.textContent = "Tandai Selesai";
            btnSelesai.className = "bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600 transition";
            btnSelesai.addEventListener("click", () => {
                tugas.completed = true;
                tampilkanDaftarTugas(daftarTugasGlobal);
            });
            aksiDiv.appendChild(btnSelesai);
        }

        // Tombol Hapus
        const btnHapus = document.createElement("button");
        btnHapus.textContent = "Hapus";
        btnHapus.className = "bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 transition";
        btnHapus.addEventListener("click", () => {
            daftarTugasGlobal = daftarTugasGlobal.filter(t => t !== tugas);
            tampilkanDaftarTugas(daftarTugasGlobal);
        });
        aksiDiv.appendChild(btnHapus);

        li.appendChild(aksiDiv);
        listTugas.appendChild(li);
    });

    perbaruiProgres();
}


// ringkasan progress

function perbaruiProgres() {
    // jumlah tugas
    const total = daftarTugasGlobal.length;
    // jumlah yang sudah selesai
    const selesai = daftarTugasGlobal.filter(t => t.completed).length;

    document.getElementById("progresTugas").textContent =
        "Progres: " + selesai + " dari " + total + " tugas selesai";
}


//cari tugas
inputCariTugas.addEventListener("input", function (event) {
    const keyword = event.target.value.toLowerCase();
    const pesanPencarian = document.getElementById("pesanPencarian");
    pesanPencarian.textContent = "";
    const itemLi = document.querySelectorAll("#listTugas li");
    let ditemukan = false;

    daftarTugasGlobal.forEach((tugas, index) => {
        const li = itemLi[index];
        if (li) {
            if (tugas.title.toLowerCase().includes(keyword)) {
                li.classList.remove("hidden");
                ditemukan = true;
            } else {
                li.classList.add("hidden");
            }
        }
    });
    if (!ditemukan && keyword !== "") {
        pesanPencarian.textContent = "Tidak ada tugas yang cocok.";
    }
});


//tambah tugas baru
function simpanTugas(judul) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // lht tugs yg sama
            const sudahAda = daftarTugasGlobal.some(t => t.title.toLowerCase() === judul.toLowerCase());
            if (sudahAda) {
                reject(new Error("Tugas dengan judul tersebut sudah ada."));
            } else {
                resolve({ title: judul, completed: false });
            }
        }, 1000);
    });
}

// form tambah tugas
formTambahTugas.addEventListener("submit", async function (event) {
    // spy halaman tidak reload saat submit
    event.preventDefault();

    // Bersihkan pesan lama
    errorFormTugas.textContent = "";
    notifikasiTugas.textContent = "";

    const judul = inputJudulTugas.value.trim();

    if (judul.length < 5) {
        errorFormTugas.textContent = "Judul tugas minimal harus 5 karakter!";
        return;
    }

    // Validasi pilih anggota
    if (!namaAnggotaAktif) {
        errorFormTugas.textContent = "Silakan pilih anggota terlebih dahulu!";
        return;
    }

    // kalau pindah muncul notif
    const idSaatSimpan = idAnggotaAktif;

    btnSimpanTugas.textContent = "Menyimpan...";
    btnSimpanTugas.disabled = true;

    try {
        //tunggu sampai simpanTugas selesai
        const tugasBaru = await simpanTugas(judul);

        // kalau pindah anggota tdk muncul notif
        if (idSaatSimpan !== idAnggotaAktif) return;

        // memasukkan tugas baru ke urutan paling atas
        daftarTugasGlobal.unshift(tugasBaru);
        inputCariTugas.value = "";
        tampilkanDaftarTugas(daftarTugasGlobal);
        inputJudulTugas.value = "";

        notifikasiTugas.textContent = "Tugas berhasil ditambahkan.";
        setTimeout(() => {
            notifikasiTugas.textContent = "";
        }, 3000);

    } catch (error) {
        // Masuk sini kalau reject, misalnya judul duplikat tpi
        //  kalau sudah pindah anggota, pesan error juga tidak ditampilkan
        if (idSaatSimpan !== idAnggotaAktif) return;
        errorFormTugas.textContent = error.message;
    } finally {
        btnSimpanTugas.textContent = "Simpan";
        btnSimpanTugas.disabled = false;
    }
});

ambilAnggota();