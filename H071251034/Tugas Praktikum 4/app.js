const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] },
    { nama: "aura", nilaiTugas: [90, 100, 95] }   
];

let namaAsisten = prompt("Masukkan nama Asisten Lab:");

while (
    namaAsisten !== null &&
    namaAsisten.toLowerCase() !== "taehyun" &&
    namaAsisten.toLowerCase() !== "ni-ki"
) {
    alert("Nama Asisten Lab tidak terdaftar!");
    namaAsisten = prompt("Masukkan nama Asisten Lab:");
}


if (namaAsisten === null) {
    alert("Input dibatalkan.");
    document.write(`
        <h2 class="mt-12 text-center text-2xl font-bold">
            Program dihentikan.
        </h2>
    `);
} else {
    if (namaAsisten.toLowerCase() === "taehyun") {
        namaAsisten = "TAEHYUN";
    } else {
        namaAsisten = "NI-KI";
    }

// hitung rata-rata nilai tugas
    const hitungRataRata = (nilaiTugas) => {
        const total = nilaiTugas.reduce((jumlah, nilai) => jumlah + nilai, 0);
        return total / nilaiTugas.length;
    };

    const hasilPraktikan = [];

    for (const praktikan of dataPraktikan) {
        const rataRata = hitungRataRata(praktikan.nilaiTugas);
        let status;
        if (rataRata >= 75) {
            status = "LULUS";
        } else {
            status = "TIDAK LULUS";
        }

        hasilPraktikan.push({
            nama: praktikan.nama,
            nilaiTugas: praktikan.nilaiTugas,
            rataRata: rataRata,
            status: status
        });
    }
    
    console.log("Data Hasil Akhir Praktikan:", hasilPraktikan);

    const card = function (praktikan) {
        let classStatus;
        if (praktikan.status === "LULUS") {
            classStatus = "bg-blue-100 text-blue-800";
        } else {
            classStatus = "bg-red-100 text-red-800";
        }
        let kotakNilai = "";
        praktikan.nilaiTugas.forEach(function (nilai, i) {
            kotakNilai += `
                <div class="flex flex-1 flex-col items-center rounded-lg bg-slate-100 py-2 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-100">
                    <span class="text-xs text-slate-500">Tugas ${i + 1}</span>
                    <span class="text-lg font-bold">${nilai}</span>
                </div>
            `;
        });

        return `
            <div class="group rounded-2xl bg-white p-5 shadow-md ring-1 ring-transparent transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-blue-300">
                <h2 class="mb-3 text-xl font-bold text-blue-600 transition duration-300 group-hover:text-blue-800">
                    ${praktikan.nama}
                </h2>

                <!-- Baris nilai tugas (flex) -->
                <div class="flex gap-2">
                    ${kotakNilai}
                </div>

                <!-- Baris rata-rata (flex) -->
                <div class="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                    <span class="font-bold">Rata-rata</span>
                    <span class="text-3xl font-bold transition duration-300 group-hover:scale-110">
                        ${praktikan.rataRata.toFixed(2)}
                    </span>
                </div>

                <!-- Baris status (flex) -->
                <div class="mt-3 flex items-center justify-between">
                    <span>Status</span>
                    <span class="cursor-default rounded-full px-4 py-1.5 font-bold transition duration-200 ${classStatus}">
                        ${praktikan.status}
                    </span>
                </div>
            </div>
        `;
    };
    document.write(`
        <div class="mx-auto my-10 w-11/12 max-w-[1100px]">
            <div class="mb-6 rounded-2xl bg-blue-500 p-8 text-white shadow-md transition duration-300">
                <h1 class="mb-2 text-3xl font-bold">Sistem Evaluasi Praktikum</h1>
                <p class="mb-2">Laporan Performa Praktikan</p>
                <p>Asisten Lab: <strong>${namaAsisten}</strong></p>
            </div>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
    `);

    for (const praktikan of hasilPraktikan) {
        document.write(card(praktikan));
    }

    document.write(`
            </div>
        </div>
    `);
}