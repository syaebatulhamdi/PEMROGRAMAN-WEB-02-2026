// Bukti koneksi: node --env-file=.env.local scripts/cek-koneksi.mjs
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  const hasil = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia FROM buku ORDER BY id"
  );
  console.log("Koneksi ke PostgreSQL berhasil.");
  console.log(`Jumlah buku terbaca: ${hasil.rowCount}`);
  console.table(hasil.rows);
} catch (error) {
  console.error("Koneksi gagal:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
