// Data awal praktikan
const dataPraktikan = [
    { nama: "Taesan", nilaiTugas: [80, 85, 90] },
    { nama: "Karina", nilaiTugas: [60, 60, 60] },
    { nama: "Keonho", nilaiTugas: [90, 90, 90] },
    { nama: "Giselle", nilaiTugas: [75, 75, 75] },
    { nama: "Anton", nilaiTugas: [45, 45, 45] }
];

// Verifikasi kehadiran Asisten Lab
const namaAsisten = prompt("Masukkan nama Asisten Lab: ");

if (namaAsisten === null || namaAsisten.trim() === "") {
    alert("Nama Asisten Lab wajib diisi!");
    throw new Error("Nama Asisten Lab belum diisi.");
}

// Function untuk menghitung rata-rata
function hitungRataRata(nilai) {
    let total = nilai.reduce(function (jumlah, angka) {
        return jumlah + angka;
    }, 0);

    return total / nilai.length;
}

// Function untuk menentukan status kelulusan
function tentukanStatus(rataRata) {
    if (rataRata >= 75) {
        return "LULUS";
    } else {
        return "TIDAK LULUS";
    }
}

// Array untuk menyimpan hasil akhir
const hasilPraktikan = dataPraktikan.map(function (praktikan) {

    let rataRata = hitungRataRata(praktikan.nilaiTugas);
    let status = tentukanStatus(rataRata);

    return {
        nama: praktikan.nama,
        nilaiTugas: praktikan.nilaiTugas,
        rataRata: rataRata,
        status: status
    };
});

// Menampilkan hasil ke console
console.log(hasilPraktikan);

// Menampilkan halaman menggunakan document.write()
document.write(`
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sistem Laporan Praktikum</title>

    <style>

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f6f0fa;
            color: #3f3150;
        }

        .header {
            background: #7c5a9e;
            color: white;
            padding: 35px 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0 0 10px;
            font-size: 30px;
        }

        .header p {
            margin: 5px 0;
            color: #eadff2;
        }

        .container {
            width: 90%;
            max-width: 1100px;
            margin: 30px auto;
        }

        .info {
            background: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 4px 15px rgba(100, 70, 130, 0.10);
            border-left: 5px solid #a884c2;
        }

        .info h2 {
            margin-top: 0;
            color: #604478;
        }

        .info p {
            color: #71627d;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 20px;
        }

        .card {
            background: white;
            padding: 22px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(100, 70, 130, 0.10);
            border-top: 5px solid #a884c2;
        }

        .card h3 {
            margin-top: 0;
            color: #4f3860;
        }

        .card p {
            color: #76687f;
        }

        .nilai {
            display: flex;
            gap: 8px;
            margin: 15px 0;
            flex-wrap: wrap;
        }

        .nilai span {
            background: #eee5f5;
            color: #624b70;
            padding: 7px 10px;
            border-radius: 8px;
            font-size: 14px;
        }

        .rata {
            font-size: 24px;
            font-weight: bold;
            color: #8055a0;
            margin: 10px 0;
        }

        .lulus {
            display: inline-block;
            background: #e5d5ef;
            color: #69418a;
            padding: 7px 14px;
            border-radius: 20px;
            font-weight: bold;
        }

        .tidak-lulus {
            display: inline-block;
            background: #f1dce9;
            color: #965777;
            padding: 7px 14px;
            border-radius: 20px;
            font-weight: bold;
        }

        .footer {
            text-align: center;
            padding: 25px;
            color: #8b7b95;
        }

    </style>
</head>

<body>

    <div class="header">
        <h1>Sistem Laporan Praktikum</h1>
        <p>Evaluasi Performa Nilai Praktikan</p>
    </div>

    <div class="container">

        <div class="info">
            <h2>Informasi Praktikum</h2>

            <p>
                <strong>Asisten Lab:</strong>
                ${namaAsisten}
            </p>

            <p>
                <strong>Batas Kelulusan:</strong>
                75
            </p>

            <p>
                <strong>Jumlah Praktikan:</strong>
                ${hasilPraktikan.length} orang
            </p>
        </div>

        <div class="cards">
`);

// Menampilkan setiap data praktikan
hasilPraktikan.forEach(function (praktikan) {

    let classStatus = "";

    if (praktikan.status === "LULUS") {
        classStatus = "lulus";
    } else {
        classStatus = "tidak-lulus";
    }

    document.write(`
        <div class="card">

            <h3>${praktikan.nama}</h3>

            <p>Nilai Tugas:</p>

            <div class="nilai">
                <span>
                    Tugas 1: ${praktikan.nilaiTugas[0]}
                </span>

                <span>
                    Tugas 2: ${praktikan.nilaiTugas[1]}
                </span>

                <span>
                    Tugas 3: ${praktikan.nilaiTugas[2]}
                </span>
            </div>

            <p>Rata-rata Nilai:</p>

            <div class="rata">
                ${praktikan.rataRata.toFixed(2)}
            </div>

            <p>
                <span class="${classStatus}">
                    ${praktikan.status}
                </span>
            </p>

        </div>
    `);
});

document.write(`
        </div>

    </div>

    <div class="footer">
        <p>Sistem Evaluasi Praktikum Interaktif</p>
        <p>JavaScript - Bab 4</p>
    </div>

</body>
</html>
`);