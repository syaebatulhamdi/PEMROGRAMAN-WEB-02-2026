import { KATEGORI } from "@/lib/konstanta";

const MAKS_INT4 = 2147483647;

// Mengubah parameter URL / input hidden menjadi angka ID yang valid.
// Mengembalikan null jika bukan bilangan bulat positif (misal "abc", "-1", "1.5").
export function parseId(nilai) {
  const teks = String(nilai ?? "").trim();
  if (!/^\d+$/.test(teks)) return null;
  const id = Number(teks);
  if (id < 1 || id > MAKS_INT4) return null;
  return id;
}

// Validasi data form buku. Mengembalikan { error } atau { data }.
export function validasiBuku(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunTeks = String(formData.get("tahun") ?? "").trim();
  const tersediaTeks = String(formData.get("tersedia") ?? "").trim();
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();

  // Nilai mentah dikembalikan agar form tidak kosong kembali saat ada error.
  const values = { judul, penulis, kategori, tahun: tahunTeks, tersedia: tersediaTeks, sinopsis };

  if (!judul || !penulis || !tahunTeks || !sinopsis) {
    return { error: "Judul, penulis, tahun, dan sinopsis wajib diisi.", values };
  }
  if (judul.length > 200) return { error: "Judul maksimal 200 karakter.", values };
  if (penulis.length > 150) return { error: "Nama penulis maksimal 150 karakter.", values };
  if (!KATEGORI.includes(kategori)) return { error: "Kategori tidak valid.", values };

  if (!/^\d{1,4}$/.test(tahunTeks)) {
    return { error: "Tahun terbit harus berupa bilangan bulat (misal 2020).", values };
  }
  const tahun = Number(tahunTeks);
  const tahunMaks = new Date().getFullYear() + 1;
  if (tahun < 1000 || tahun > tahunMaks) {
    return { error: `Tahun terbit harus antara 1000 dan ${tahunMaks}.`, values };
  }

  if (tersediaTeks !== "true" && tersediaTeks !== "false") {
    return { error: "Status ketersediaan tidak valid.", values };
  }
  const tersedia = tersediaTeks === "true";

  return { data: { judul, penulis, kategori, tahun, tersedia, sinopsis } };
}
