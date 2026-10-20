const dataPraktikan = [
  { nama: "Jegel", nilaiTugas: [80, 85, 90] },
  { nama: "Boris", nilaiTugas: [60, 60, 60] },
  { nama: "Oki", nilaiTugas: [90, 90, 90] },
  { nama: "Bene", nilaiTugas: [75, 75, 75] },
  { nama: "Koh Acim", nilaiTugas: [45, 45, 45] }
];

const BATAS_LULUS = 75;

const namaAsisten = prompt("Verifikasi kehadiran - masukkan nama Anda (Asisten Lab):");

function hitungRataRata(nilai) {
  const total = nilai.reduce((jumlah, n) => jumlah + n, 0);
  return total / nilai.length;
}

function tentukanStatus(rataRata) {
  return rataRata >= BATAS_LULUS ? "Lulus" : "Tidak Lulus";
}

function prosesData(data) {
  return data.map(function (p) {
    const rataRata = hitungRataRata(p.nilaiTugas);
    return {
      nama: p.nama,
      nilaiTugas: p.nilaiTugas,
      rataRata: Number(rataRata.toFixed(2)),
      status: tentukanStatus(rataRata)
    };
  });
}

function buatKartu(p) {
  const lulus = p.status === "Lulus";
  const warna = lulus ? "#34d399" : "#fb7185";
  const chip = p.nilaiTugas
    .map((n, i) => `<span class="chip">T${i + 1}: ${n}</span>`)
    .join("");
  return `
    <div class="kartu" style="--c:${warna}">
      <div class="atas">
        <div class="avatar">${p.nama.charAt(0)}</div>
        <div>
          <h3>${p.nama}</h3>
          <div class="chips">${chip}</div>
        </div>
        <span class="badge">${lulus ? "✔" : "✖"} ${p.status}</span>
      </div>
      <div class="skor"><span>Rata-rata</span><b>${p.rataRata}</b></div>
      <div class="bar"><div class="isi" style="width:${p.rataRata}%"></div>
        <i class="batas" style="left:${BATAS_LULUS}%"></i></div>
    </div>`;
}

const css = `
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;background:radial-gradient(circle at top,#1e293b,#0b1120);
       color:#e2e8f0;min-height:100vh;padding:32px 16px}
  .wrap{max-width:960px;margin:auto}
  header{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:24px}
  header h1{font-size:28px;background:linear-gradient(90deg,#38bdf8,#a78bfa);-webkit-background-clip:text;
            background-clip:text;color:transparent}
  header p{color:#94a3b8;font-size:14px;margin-top:4px}
  .asisten{background:#1e293b;border:1px solid #334155;padding:8px 16px;border-radius:999px;font-size:14px}
  .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:24px}
  .stat{background:#111827;border:1px solid #1f2937;border-radius:14px;padding:16px}
  .stat span{font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em}
  .stat b{display:block;font-size:28px;margin-top:6px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
  .kartu{background:#111827;border:1px solid #1f2937;border-top:4px solid var(--c);border-radius:16px;
         padding:18px;transition:transform .2s,box-shadow .2s}
  .kartu:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,.45)}
  .atas{display:flex;gap:12px;align-items:flex-start}
  .avatar{width:42px;height:42px;border-radius:12px;background:var(--c);color:#0b1120;font-weight:700;
          display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  .atas h3{font-size:18px}
  .chips{display:flex;gap:4px;flex-wrap:wrap;margin-top:4px}
  .chip{font-size:11px;background:#1f2937;color:#94a3b8;padding:2px 7px;border-radius:6px}
  .badge{margin-left:auto;font-size:12px;font-weight:600;color:var(--c);border:1px solid var(--c);
         padding:3px 10px;border-radius:999px;white-space:nowrap}
  .skor{display:flex;justify-content:space-between;align-items:baseline;margin:16px 0 8px;color:#94a3b8;font-size:13px}
  .skor b{font-size:26px;color:#f1f5f9}
  .bar{position:relative;height:8px;background:#1f2937;border-radius:99px;overflow:visible}
  .isi{height:100%;background:var(--c);border-radius:99px}
  .batas{position:absolute;top:-4px;width:2px;height:16px;background:#f1f5f9;opacity:.6}
  footer{text-align:center;color:#64748b;font-size:12px;margin-top:28px}
  .tolak{max-width:420px;margin:15vh auto;text-align:center;background:#111827;border:1px solid #7f1d1d;
         padding:32px;border-radius:16px}
  .tolak h2{color:#fb7185;margin-bottom:8px}
</style>`;

function renderLaporan(hasil, asisten) {
  const jumlahLulus = hasil.filter(p => p.status === "Lulus").length;
  const rataKelas = hitungRataRata(hasil.map(p => p.rataRata));
  const tertinggi = hasil.reduce((a, b) => (b.rataRata > a.rataRata ? b : a));

  document.write(css);
  document.write(`
  <div class="wrap">
    <header>
      <div>
        <h1>Dashboard Evaluasi Praktikum</h1>
        <p>Batas kelulusan: rata-rata ≥ ${BATAS_LULUS}</p>
      </div>
      <div class="asisten">👤 Asisten Lab: <b>${asisten}</b></div>
    </header>
    <section class="stats">
      <div class="stat"><span>Total Praktikan</span><b>${hasil.length}</b></div>
      <div class="stat"><span>Lulus</span><b style="color:#34d399">${jumlahLulus}</b></div>
      <div class="stat"><span>Tidak Lulus</span><b style="color:#fb7185">${hasil.length - jumlahLulus}</b></div>
      <div class="stat"><span>Rata-rata Kelas</span><b>${rataKelas.toFixed(1)}</b></div>
      <div class="stat"><span>Nilai Tertinggi</span><b style="font-size:20px">${tertinggi.nama} (${tertinggi.rataRata})</b></div>
    </section>
    <section class="grid">
      ${hasil.map(buatKartu).join("")}
    </section>
    <footer>Garis putih pada progress bar menandai batas kelulusan.</footer>
  </div>`);
}

function renderDitolak() {
  document.write(css);
  document.write(`<div class="tolak"><h2>Akses Ditolak</h2>
    <p>Nama Asisten Lab tidak diisi. Muat ulang halaman dan masukkan nama Anda.</p></div>`);
}

if (namaAsisten === null || namaAsisten.trim() === "") {
  renderDitolak();
} else {
  const hasilAkhir = prosesData(dataPraktikan);
  renderLaporan(hasilAkhir, namaAsisten.trim());

  console.log("Hasil akhir evaluasi praktikum:", hasilAkhir);
  console.table(hasilAkhir);
}