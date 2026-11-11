import { notFound } from "next/navigation";
import BukuForm from "@/components/BukuForm";
import { getBukuById } from "@/lib/buku";
import { parseId } from "@/lib/validasi";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  const idAngka = parseId(id);
  if (idAngka === null) notFound();

  const buku = await getBukuById(idAngka);
  if (!buku) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <p className="font-bold text-pink-500">✏️ Kelola Koleksi</p>
      <h2 className="mb-6 mt-1 text-4xl font-black text-violet-900">Edit Buku #{buku.id}</h2>
      <BukuForm action={ubahBuku} buku={buku} submitLabel="Simpan Perubahan" batalHref={`/katalog/${buku.id}`} />
    </div>
  );
}
