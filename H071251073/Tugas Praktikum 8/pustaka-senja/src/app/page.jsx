import Link from "next/link";
import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function Beranda() {
  const total = dataBuku.length;
  const tersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const dipinjam = total - tersedia;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas untuk mahasiswa dan warga sekitar kampus. Pinjam, baca, dan usulkan buku yang ingin kamu temukan di rak kami."
        lokasi="Jl. Pendidikan No. 12, dekat kampus"
        jamBuka="setiap hari, 10.00 - 20.00"
      />

      <section className="grid gap-4 sm:grid-cols-3">
        {statistik.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center"
          >
            <p className="text-4xl font-bold text-sky-700">{item.nilai}</p>
            <p className="mt-1 text-slate-600">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap gap-3">
        <Link
          href="/katalog"
          className="rounded-lg bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700"
        >
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="rounded-lg border border-sky-600 px-5 py-3 font-medium text-sky-700 hover:bg-sky-50"
        >
          Usulkan Buku
        </Link>
      </section>
    </div>
  );
}