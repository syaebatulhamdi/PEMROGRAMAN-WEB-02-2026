"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { parseId } from "@/lib/id";
import { daftarKategori } from "@/lib/konstanta";

const kategoriBoleh = daftarKategori.filter((k) => k !== "Semua");

// Membaca dan memvalidasi isi form (dipakai oleh tambah dan ubah).
function bacaDanValidasi(formData) {
  const nilai = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tahun: String(formData.get("tahun") ?? "").trim(),
    tersedia: String(formData.get("tersedia") ?? "").trim(),
    sinopsis: String(formData.get("sinopsis") ?? "").trim(),
  };

  const errors = {};
  const tahunIni = new Date().getFullYear();

  if (nilai.judul === "") errors.judul = "Judul wajib diisi.";
  else if (nilai.judul.length > 200)
    errors.judul = "Judul maksimal 200 karakter.";

  if (nilai.penulis === "") errors.penulis = "Penulis wajib diisi.";
  else if (nilai.penulis.length > 150)
    errors.penulis = "Penulis maksimal 150 karakter.";

  if (!kategoriBoleh.includes(nilai.kategori))
    errors.kategori = "Pilih salah satu kategori.";

  if (!/^\d{4}$/.test(nilai.tahun))
    errors.tahun = "Tahun terbit harus berupa 4 digit angka.";
  else if (Number(nilai.tahun) < 1000 || Number(nilai.tahun) > tahunIni)
    errors.tahun = `Tahun terbit harus antara 1000 dan ${tahunIni}.`;

  if (nilai.tersedia !== "true" && nilai.tersedia !== "false")
    errors.tersedia = "Pilih status ketersediaan.";

  if (nilai.sinopsis === "") errors.sinopsis = "Sinopsis wajib diisi.";

  return { nilai, errors, valid: Object.keys(errors).length === 0 };
}

// CREATE
export async function tambahBuku(stateSebelumnya, formData) {
  const { nilai, errors, valid } = bacaDanValidasi(formData);
  if (!valid) return { errors, values: nilai };

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        nilai.judul,
        nilai.penulis,
        nilai.kategori,
        Number(nilai.tahun),
        nilai.tersedia === "true",
        nilai.sinopsis,
      ]
    );
  } catch (error) {
    console.error("Gagal INSERT buku:", error.message);
    return {
      errors: { umum: "Gagal menyimpan ke database. Coba lagi." },
      values: nilai,
    };
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog?pesan=ditambah");
}

// UPDATE (id diikat lewat .bind di halaman edit)
export async function ubahBuku(id, stateSebelumnya, formData) {
  const idAngka = parseId(id);
  const { nilai, errors, valid } = bacaDanValidasi(formData);

  if (idAngka === null) {
    return { errors: { umum: "ID buku tidak valid." }, values: nilai };
  }
  if (!valid) return { errors, values: nilai };

  let ditemukan = false;
  try {
    const hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3,
           tahun = $4, tersedia = $5, sinopsis = $6
       WHERE id = $7`,
      [
        nilai.judul,
        nilai.penulis,
        nilai.kategori,
        Number(nilai.tahun),
        nilai.tersedia === "true",
        nilai.sinopsis,
        idAngka,
      ]
    );
    ditemukan = hasil.rowCount > 0;
  } catch (error) {
    console.error("Gagal UPDATE buku:", error.message);
    return {
      errors: { umum: "Gagal menyimpan perubahan. Coba lagi." },
      values: nilai,
    };
  }

  if (!ditemukan) {
    return {
      errors: { umum: "Buku tidak ditemukan. Mungkin sudah dihapus." },
      values: nilai,
    };
  }

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${idAngka}`);
  revalidatePath("/");
  redirect(`/katalog/${idAngka}?pesan=diubah`);
}

// DELETE
export async function hapusBuku(id) {
  const idAngka = parseId(id);
  if (idAngka === null) redirect("/katalog?pesan=gagal");

  let berhasil = true;
  try {
    await pool.query("DELETE FROM buku WHERE id = $1", [idAngka]);
  } catch (error) {
    console.error("Gagal DELETE buku:", error.message);
    berhasil = false;
  }

  if (!berhasil) redirect("/katalog?pesan=gagal");

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog?pesan=dihapus");
}
