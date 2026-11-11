import BukuForm from "@/components/BukuForm";
import { tambahBuku } from "../actions";

export default function TambahBukuPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <p className="font-bold text-pink-500">📚 Kelola Koleksi</p>
      <h2 className="mb-6 mt-1 text-4xl font-black text-violet-900">Tambah Buku</h2>
      <BukuForm action={tambahBuku} submitLabel="Simpan Buku ✨" batalHref="/katalog" />
    </div>
  );
}
