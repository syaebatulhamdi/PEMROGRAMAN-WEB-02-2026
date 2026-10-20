const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [0, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] }, 
    { nama: "Fafa", nilaiTugas: [90, 87, 85] },
    { nama: "Fira", nilaiTugas: [87, 100, 95] },
    { nama: "Dipoy", nilaiTugas: [100, 100, 100] },
];

function hitungRataRata(nilaiTugas) {
    let total = 0;
    for (let i = 0; i < nilaiTugas.length; i++) {
        total += nilaiTugas[i];
    }
    return total / nilaiTugas.length;
}

function status(hitungRataRata) {
    if (hitungRataRata >= 75) {
        return "Lulus";
    } else {
        return "Tidak Lulus";
    }
}

dataPraktikan.map (item => {
    let RataRata = Number(hitungRataRata(item.nilaiTugas).toFixed(1))
    let Status = status(RataRata)
    item.rataRata = RataRata
    item.status = Status
})
console.log("Hasil Evaluasi Praktikum:");
console.table(dataPraktikan);

let akses = false;
let namaAslab = prompt("Masukkan nama Asisten Lab: ").toLowerCase();
if (namaAslab == "ayu") {
    akses = true;
}

if (akses) {
    document.write(`
        <div class="bg-black font-serif">
            <div class="flex flex-col gap-6 justify-center items-center p-12">
                <h1 class="text-rose-900 text-5xl font-extrabold">Laporan Praktikum</h1>
                <div class="bg-rose-900 rounded-2xl p-6 flex flex-col gap-2 justify-center items-center">
                    <h2 class="text-white text-2xl font-bold capitalize">Selamat datang, Kanjeng Ratu ${namaAslab}</h2>
                    <p class="text-sm font-bold text-white">Berikut adalah laporan hasil evaluasi praktikum</p>
                </div>
            </div>
        </div>
    `)
    document.write(`
        <div class="bg-black flex flex-col justify-center items-center                                                              ">
        `)
    dataPraktikan.forEach(item => {
        let Nama = item.nama
        let RataRata = hitungRataRata(item.nilaiTugas)
        let Status = status(RataRata)

        let warnaStatus
        if (Status == "Lulus") {
            warnaStatus = "bg-emerald-100 text-emerald-700"
        } else {
            warnaStatus = "bg-red-100 text-red-700"
        }

    document.write(`
            <div class="bg-white shadow-lg rounded-2xl flex flex-row items-center justify-between hover:scale-105 transition-transform m-6 w-[800px] p-5 border border-l-8 border-l-rose-900">
                <div class="flex flex-col justify-start gap-4">
                    <div class="font-bold text-3xl text-rose-950">
                        <p>${Nama}</p>
                    </div>
                    <div class="font-bold text-xs text-rose-900/50">
                        <p>Nilai Rata-Rata: ${RataRata.toFixed(1)}</p>
                    </div>
                </div>
                <div class="font-bold text-md ${warnaStatus} px-4 py-2 rounded-full">
                    <p>${Status}</p>
                </div>
            </div>
        `)
    })

} else {
    document.write(`
        <div class="flex flex-col justify-center items-center font-serif h-screen">
            <div class="bg-rose-900 p-12 rounded-3xl shadow-md">
                <h1 class="text-white text-center text-8xl font-extrabold">LAU SIAPE MPRUY</h1>
            </div>
        </div>
    `)
}