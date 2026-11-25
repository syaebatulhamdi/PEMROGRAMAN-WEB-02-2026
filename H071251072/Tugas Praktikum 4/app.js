const dataPraktikan = [
  { nama: "Nawdy", nilaiTugas: [80, 85, 90] },
  { nama: "Jeje", nilaiTugas: [60, 60, 60] },
  { nama: "Mokel", nilaiTugas: [90, 90, 90] },
  { nama: "Bella", nilaiTugas: [75, 75, 75] },
  { nama: "Aeru", nilaiTugas: [45, 45, 45] }
];

const namaAsisten = prompt("Masukkan nama Asisten Lab untuk verifikasi:");

if (namaAsisten) {
  document.write(`
    <div class="max-w-4xl mx-auto mb-6">
      <h1 class="text-3xl font-mono text-slate-800">Sistem Evaluasi Praktikum</h1>
      <p class="text-slate-600">Diverifikasi oleh Asisten: <span class="font-semibold text-slate-800">${namaAsisten}</span></p>
    </div>
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  `);

  const hasilEvaluasi = [];

  for (let i = 0; i < dataPraktikan.length; i++) {
    const mhs = dataPraktikan[i];
    
    let total = 0;
    for (let j = 0; j < mhs.nilaiTugas.length; j++) {
      total += mhs.nilaiTugas[j];
    }
    const rataRata = (total / mhs.nilaiTugas.length).toFixed(1);

    const status = rataRata >= 75 ? "LULUS" : "TIDAK LULUS";
    const bgStatus = rataRata >= 75 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

    hasilEvaluasi.push({
      nama: mhs.nama,
      nilaiTugas: mhs.nilaiTugas,
      rataRata: parseFloat(rataRata),
      status: status
    });

    document.write(`
      <div class="bg-pink-200 rounded-lg shadow p-5 border border-slate-200">
        <h2 class="text-xl font-bold text-slate-800 mb-2">${mhs.nama}</h2>
        <p class="text-sm text-slate-600 mb-1">Rata-rata Nilai: <span class="font-semibold">${rataRata}</span></p>
        <div class="mt-3">
          <span class="px-3 py-1 rounded-full text-xs font-bold ${bgStatus}">
            ${status}
          </span>
        </div>
      </div>
    `);
  }

  document.write(`</div>`);

  console.log("=== Hasil Evaluasi Praktikan ===");
  console.log(hasilEvaluasi);

} else {
  document.write(`
    <div class="max-w-md mx-auto mt-10 bg-red-50 p-6 rounded-lg text-center border border-red-200">
      <h2 class="text-xl font-bold text-red-600 mb-2">Akses Ditolak</h2>
      <p class="text-sm text-red-500">Silakan muat ulang halaman dan masukkan nama Asisten Lab.</p>
    </div>
  `);
}