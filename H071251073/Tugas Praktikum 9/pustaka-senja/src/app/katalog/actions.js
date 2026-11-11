
"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//insert
export async function tambahBuku(formData) {
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis")?.trim();

  if (
    !judul ||
    !penulis ||
    !kategori ||
    !sinopsis ||
    !Number.isInteger(tahun) ||
    tahun < 1000 ||
    tahun > 9999 ||
    !["true", "false"].includes(tersedia)
  ) {
    throw new Error("Data buku tidak valid.");
  }

  await pool.query(
    `INSERT INTO buku
    (judul, penulis, kategori, tahun, tersedia, sinopsis)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [judul, penulis, kategori, tahun, tersedia === "true", sinopsis]
  );

  revalidatePath("/katalog");
  revalidatePath("/");

  redirect("/katalog");
}

// UPDATE
export async function ubahBuku(formData) {
  const id = Number(formData.get("id"));
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis")?.trim();

  if (
    !Number.isInteger(id) || id < 1 ||
    !judul ||
    !penulis ||
    !kategori ||
    !sinopsis ||
    !Number.isInteger(tahun) ||
    tahun < 1000 ||
    tahun > 9999 ||
    !["true", "false"].includes(tersedia)
  ) {
    throw new Error("Data buku tidak valid.");
  }

  const hasil = await pool.query(
    `UPDATE buku
     SET judul = $1,
         penulis = $2,
         kategori = $3,
         tahun = $4,
         tersedia = $5,
         sinopsis = $6
     WHERE id = $7`,
    [
      judul,
      penulis,
      kategori,
      tahun,
      tersedia === "true",
      sinopsis,
      id,
    ]
  );

  if (hasil.rowCount === 0) {
    throw new Error("Buku tidak ditemukan.");
  }

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");

  redirect(`/katalog/${id}`);
}

// DELETE
export async function hapusBuku(id) {
  const idBuku = Number(id);

  if (!Number.isInteger(idBuku) || idBuku < 1) {
    throw new Error("ID buku tidak valid.");
  }

  await pool.query(
    "DELETE FROM buku WHERE id = $1",
    [idBuku]
  );
  
  //await pool.query(
    //"SELECT * FROM buku");

  revalidatePath("/katalog");
  revalidatePath("/");
  
  redirect("/katalog");
}
