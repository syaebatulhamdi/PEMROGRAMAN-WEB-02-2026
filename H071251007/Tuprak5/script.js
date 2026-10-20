const containerAnggota = document.getElementById("container-anggota");
const statusMuatAnggota = document.getElementById("status-muat-anggota");
const judulPanelTugas = document.getElementById("judul-panel-tugas");
const ringkasanProgres = document.getElementById("ringkasan-progres");
const progressBar = document.getElementById("progress-bar");
const containerTugas = document.getElementById("container-tugas");
const inputPencarian = document.getElementById("input-pencarian");
const formTambahTugas = document.getElementById("form-tambah-tugas");
const inputJudulTugas = document.getElementById("input-judul-tugas");
const tombolSimpan = document.getElementById("tombol-simpan");
const pesanErrorForm = document.getElementById("pesan-error-form");
const notifSukses = document.getElementById("notif-sukses");

let daftarTugasAktif = [];
let anggotaAktifId = null;
let namaAnggotaAktif = "";
let tombolAnggotaTerpilih = null;

async function ambilDataAnggota() {
    try {
        const respons = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!respons.ok) {
            throw new Error(`Gagal memuat data anggota (Status: ${respons.status})`);
        }
        
        const dataUsers = await respons.json();
        if (statusMuatAnggota) {
            statusMuatAnggota.remove();
        }

        dataUsers.forEach(user => {
            const tombol = document.createElement("button");
            tombol.type = "button";
            tombol.className = "w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900 transition-colors flex items-center justify-between group";
            
            const spanNama = document.createElement("span");
            spanNama.textContent = user.name;
            
            const spanId = document.createElement("span");
            spanId.className = "text-xs text-zinc-600 group-hover:text-zinc-500";
            spanId.textContent = String(user.id).padStart(2, '0');

            tombol.appendChild(spanNama);
            tombol.appendChild(spanId);

            tombol.addEventListener("click", () => {
                pilihAnggota(user.id, user.name, tombol);
            });

            containerAnggota.appendChild(tombol);
        });

    } catch (error) {
        if (statusMuatAnggota) {
            statusMuatAnggota.textContent = "Gagal memuat anggota. Tolong periksa koneksi internet Anda.";
            statusMuatAnggota.className = "text-sm text-rose-400 italic";
        }
        console.error("Error F1: ", error);
    }
}

async function pilihAnggota(userId, nama, tombolElemen) {
    anggotaAktifId = userId;
    namaAnggotaAktif = nama;

    if (tombolAnggotaTerpilih) {
        tombolAnggotaTerpilih.classList.remove("bg-zinc-900", "text-cyan-400", "border", "border-cyan-900/50", "font-semibold");
        tombolAnggotaTerpilih.classList.add("text-zinc-300", "hover:bg-zinc-900");
    }
    
    tombolElemen.classList.remove("text-zinc-300", "hover:bg-zinc-900");
    tombolElemen.classList.add("bg-zinc-900", "text-cyan-400", "border", "border-cyan-900/50", "font-semibold");
    tombolAnggotaTerpilih = tombolElemen;

    judulPanelTugas.textContent = `Tugas ${nama}`;
    containerTugas.innerHTML = "";
    
    const loadingTugas = document.createElement("p");
    loadingTugas.className = "text-sm text-zinc-500 italic";
    loadingTugas.textContent = "Memuat tugas...";
    containerTugas.appendChild(loadingTugas);

    inputPencarian.value = "";

    try {
        const respons = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        
        if (!respons.ok) {
            throw new Error(`Gagal memuat tugas (Status: ${respons.status})`);
        }

        const dataTodos = await respons.json();
        daftarTugasAktif = dataTodos.map(tugas => ({
            title: tugas.title,
            completed: tugas.completed
        }));

        renderDaftarTugas();

    } catch (error) {
        containerTugas.innerHTML = "";
        const pesanError = document.createElement("p");
        pesanError.className = "text-sm text-rose-400 italic";
        pesanError.textContent = "Gagal memuat tugas. Silakan coba beberapa saat lagi.";
        containerTugas.appendChild(pesanError);
        console.error("Error F2:", error);
    }
}

function renderDaftarTugas(filterKeyword = "") {
    containerTugas.innerHTML = "";

    const keyword = filterKeyword.toLowerCase().trim();
    let tugasDitampilkan = 0;
    let tugasSelesaiTotal = 0;

    daftarTugasAktif.forEach(tugas => {
        if (tugas.completed) tugasSelesaiTotal++;
    });

    const totalTugas = daftarTugasAktif.length;
    perbaruiRingkasanProgres(tugasSelesaiTotal, totalTugas);

    if (daftarTugasAktif.length == 0) {
        const pKosong = document.createElement("p");
        pKosong.className = "text-sm text-zinc-500 italic";
        pKosong.textContent = "Belum ada tugas untuk anggota ini.";
        containerTugas.appendChild(pKosong);
        return;
    }

    let adaYangCocok = false;

    daftarTugasAktif.forEach((tugas, index) => {
        const card = document.createElement("div");
        card.className = "flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg transition-all";

        const judulText = document.createElement("span");
        judulText.className = "text-sm flex-1 mr-3";
        judulText.textContent = tugas.title;

        if (tugas.completed) {
            judulText.classList.add("line-through", "text-zinc-600");
        } else {
            judulText.classList.add("text-zinc-200");
        }

        const cocok = tugas.title.toLowerCase().includes(keyword);
        if (!cocok) {
            card.classList.add("hidden");
        } else {
            adaYangCocok = true;
            tugasDitampilkan++;
        }

        const containerAksi = document.createElement("div");
        containerAksi.className = "flex items-center gap-2 flex-shrink-0";

        if (!tugas.completed) {
            const btnSelesai = document.createElement("button");
            btnSelesai.type = "button";
            btnSelesai.className = "px-3 py-1 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-400 text-xs font-medium rounded border border-cyan-800/40 transition-colors";
            btnSelesai.textContent = "Tandai selesai";
            
            btnSelesai.addEventListener("click", () => {
                tugas.completed = true;
                renderDaftarTugas(inputPencarian.value);
            });
            containerAksi.appendChild(btnSelesai);
        }

        const btnHapus = document.createElement("button");
        btnHapus.type = "button";
        btnHapus.className = "px-3 py-1 bg-rose-950/40 hover:bg-rose-900/40 text-rose-400 text-xs font-medium rounded border border-rose-800/40 transition-colors";
        btnHapus.textContent = "Hapus";

        btnHapus.addEventListener("click", () => {
            daftarTugasAktif.splice(index, 1);
            renderDaftarTugas(inputPencarian.value);
        });

        containerAksi.appendChild(btnHapus);
        card.appendChild(judulText);
        card.appendChild(containerAksi);
        containerTugas.appendChild(card);
    });

    if (!adaYangCocok && keyword !== "") {
        const pTidakCocok = document.createElement("p");
        pTidakCocok.className = "text-sm text-zinc-500 italic text-center py-4";
        pTidakCocok.textContent = "Tidak ada tugas yang cocok.";
        containerTugas.appendChild(pTidakCocok);
    }
}

function perbaruiRingkasanProgres(selesai, total) {
    ringkasanProgres.textContent = `${selesai} dari ${total} tugas selesai`;
    const persentase = total > 0 ? (selesai / total) * 100 : 0;
    progressBar.style.width = `${persentase}%`;
}

inputPencarian.addEventListener("input", (e) => {
    if (anggotaAktifId === null) return;
    renderDaftarTugas(e.target.value);
});

function simpanTugas(judulBaru) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const duplikat = daftarTugasAktif.some(
                tugas => tugas.title.trim().toLowerCase() === judulBaru.trim().toLowerCase()
            );

            if (duplikat) {
                reject(new Error("Tugas dengan judul tersebut sudah ada di dalam daftar."));
            } else {
                resolve({ title: judulBaru.trim(), completed: false });
            }
        }, 1000);
    });
}

formTambahTugas.addEventListener("submit", async (e) => {
    e.preventDefault();

    pesanErrorForm.classList.add("hidden");
    pesanErrorForm.textContent = "";

    if (anggotaAktifId === null) {
        pesanErrorForm.textContent = "Pilih anggota terlebih dahulu sebelum menambahkan tugas.";
        pesanErrorForm.classList.remove("hidden");
        return;
    }

    const judulInput = inputJudulTugas.value.trim();

    if (judulInput.length < 5) {
        pesanErrorForm.textContent = "Judul terlalu pendek, minimal 5 karakter.";
        pesanErrorForm.classList.remove("hidden");
        return;
    }

    tombolSimpan.textContent = "Menyimpan...";
    tombolSimpan.disabled = true;
    inputJudulTugas.disabled = true;

    try {
        const tugasBaruObj = await simpanTugas(judulInput);
        
        daftarTugasAktif.unshift(tugasBaruObj);
        inputJudulTugas.value = "";
        renderDaftarTugas(inputPencarian.value);

        notifSukses.textContent = "Tugas berhasil ditambahkan.";
        notifSukses.classList.remove("hidden");
        setTimeout(() => {
            notifSukses.classList.add("hidden");
            notifSukses.textContent = "";
        }, 3000);

    } catch (error) {
        pesanErrorForm.textContent = error.message;
        pesanErrorForm.classList.remove("hidden");
    } finally {
        tombolSimpan.textContent = "Simpan";
        tombolSimpan.disabled = false;
        inputJudulTugas.disabled = false;
        inputJudulTugas.focus();
    }
});

ambilDataAnggota();