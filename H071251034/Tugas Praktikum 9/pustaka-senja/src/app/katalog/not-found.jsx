import Link from "next/link";

export default function KatalogNotFound() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-paper px-6 py-14 text-center shadow-sm">
      <h1 className="font-display text-2xl font-bold text-coral">
        Buku tidak ditemukan
      </h1>
      <p className="mt-3 text-plum/70">
        Buku yang kamu cari tidak ada di koleksi Pustaka Senja. Mungkin ID-nya
        salah atau bukunya sudah dihapus.
      </p>
      <Link
        href="/katalog"
        className="mt-6 inline-block rounded-full bg-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-iris"
      >
        Kembali ke Katalog
      </Link>
    </div>
  );
}
