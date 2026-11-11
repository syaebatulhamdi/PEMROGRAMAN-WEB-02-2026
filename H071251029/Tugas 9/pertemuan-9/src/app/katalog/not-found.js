import Link from "next/link";

export default function KatalogNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 text-center">
      <div className="rounded-3xl bg-white p-10 shadow-lg">
        <p className="text-5xl">🔎</p>
        <h2 className="mt-4 text-3xl font-black text-violet-900">Buku tidak ditemukan</h2>
        <p className="mt-2 text-gray-500">ID buku yang kamu cari tidak valid atau sudah tidak tersedia.</p>
        <Link href="/katalog" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-pink-400 to-violet-500 px-5 py-3 font-bold text-white">← Kembali ke Katalog</Link>
      </div>
    </div>
  );
}
