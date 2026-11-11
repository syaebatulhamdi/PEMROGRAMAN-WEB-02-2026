"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { parseId, validasiBuku } from "@/lib/validasi";

function segarkanHalaman() {
  revalidatePath("/"); // statistik beranda
  revalidatePath("/katalog", "layout"); // katalog, detail, dan edit
}

// CREATE
export async function tambahBuku(prevState, formData) {
  const hasil = validasiBuku(formData);
  if (hasil.error) return { error: hasil.error, values: hasil.values };

  const { judul, penulis, kategori, tahun, tersedia, sinopsis } = hasil.data;

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [judul, penulis, kategori, tahun, tersedia, sinopsis]
    );
  } catch (err) {
    console.error("Gagal menambah buku:", err);
    return { error: "Gagal menyimpan ke database. Coba lagi.", values: hasil.values };
  }

  segarkanHalaman();
  redirect("/katalog");
}

// UPDATE
export async function ubahBuku(prevState, formData) {
  const id = parseId(formData.get("id"));
  if (id === null) return { error: "ID buku tidak valid.", values: null };

  const hasil = validasiBuku(formData);
  if (hasil.error) return { error: hasil.error, values: hasil.values };

  const { judul, penulis, kategori, tahun, tersedia, sinopsis } = hasil.data;

  let jumlahBaris;
  try {
    const res = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
       WHERE id = $7`,
      [judul, penulis, kategori, tahun, tersedia, sinopsis, id]
    );
    jumlahBaris = res.rowCount;
  } catch (err) {
    console.error("Gagal mengubah buku:", err);
    return { error: "Gagal menyimpan perubahan. Coba lagi.", values: hasil.values };
  }

  if (jumlahBaris === 0) {
    return { error: "Buku tidak ditemukan (mungkin sudah dihapus).", values: hasil.values };
  }

  segarkanHalaman();
  redirect(`/katalog/${id}`);
}

// DELETE
export async function hapusBuku(formData) {
  const id = parseId(formData.get("id"));
  if (id === null) return;

  try {
    await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  } catch (err) {
    console.error("Gagal menghapus buku:", err);
    return;
  }

  segarkanHalaman();
  redirect("/katalog");
}
