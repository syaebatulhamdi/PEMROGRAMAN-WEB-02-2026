"use server";

import pool from "@/lib/db";
import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Fungsi pembantu untuk membuat huruf kapital di setiap awal kata
function toTitleCase(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

// 1. FUNGSI TAMBAH BUKU (DENGAN KAPITALISASI OTOMATIS)
export async function tambahBuku(formData) {
  const rawJudul = formData.get("judul");
  const rawPenulis = formData.get("penulis");
  const rawKategori = formData.get("kategori");
  const rawSinopsis = formData.get("sinopsis");

  // Terapkan kapitalisasi otomatis di setiap awal kata
  const judul = toTitleCase(rawJudul);
  const penulis = toTitleCase(rawPenulis);
  const kategori = toTitleCase(rawKategori);
  const tahun = formData.get("tahun");
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = toTitleCase(rawSinopsis);

  const coverFile = formData.get("coverFile");
  let coverPath = null;

  // Penanganan upload file cover ke folder public/uploads/
  if (coverFile && coverFile.size > 0) {
    const buffer = Buffer.from(await coverFile.arrayBuffer());
    const filename = `${Date.now()}-${coverFile.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      coverPath = `/uploads/${filename}`;
    } catch (error) {
      console.error("Gagal mengunggah file cover:", error);
    }
  }

  // Simpan ke database PostgreSQL (tuprak9_db)
  await pool.query(
    `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis, cover) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [judul, penulis, kategori, tahun, tersedia, sinopsis, coverPath]
  );

  revalidatePath("/katalog");
  redirect("/katalog");
}

// 2. FUNGSI HAPUS BUKU (BESERTA PEMBERSIHAN FILE LOKAL)
export async function hapusBuku(formData) {
  const id = formData.get("id");

  try {
    // Ambil data buku untuk mengecek apakah ada file cover lokal
    const { rows } = await pool.query("SELECT cover FROM buku WHERE id = $1", [id]);
    if (rows.length > 0) {
      const cover = rows[0].cover;
      // Jika cover menggunakan file lokal di /uploads/, hapus file fisiknya dari storage
      if (cover && cover.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), "public", cover);
        await fs.unlink(filePath).catch(() => {});
      }
    }

    // Hapus data dari database
    await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  } catch (error) {
    console.error("Gagal menghapus buku:", error);
  }

  revalidatePath("/katalog");
  redirect("/katalog");
}

// 3. FUNGSI UBAH BUKU
export async function ubahBuku(formData) {
  const id = formData.get("id");
  const judul = formData.get("judul");
  const penulis = formData.get("penulis");
  const kategori = formData.get("kategori");
  const tahun = formData.get("tahun");
  const tersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis");

  // Eksekusi update ke database PostgreSQL
  await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
    [judul, penulis, kategori, tahun, tersedia === "true", sinopsis, id]
  );

  // Bersihkan cache dan arahkan kembali ke katalog
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  redirect("/katalog");
}