// Seluruh query SELECT (raw SQL) untuk tabel buku.
// File ini hanya boleh di-import dari Server Component / Server Action.
import pool from "@/lib/db";

export async function getSemuaBuku(kategori) {
  if (kategori) {
    const { rows } = await pool.query(
      "SELECT * FROM buku WHERE kategori = $1 ORDER BY id",
      [kategori]
    );
    return rows;
  }
  const { rows } = await pool.query("SELECT * FROM buku ORDER BY id");
  return rows;
}

export async function getBukuById(id) {
  const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function getStatistik() {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  return rows[0];
}
