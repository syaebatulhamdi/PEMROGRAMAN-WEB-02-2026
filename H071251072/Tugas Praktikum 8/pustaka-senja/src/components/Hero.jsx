import Link from "next/link";

export default function Hero({
nama = "Pustaka Senja",
deskripsi = "Ruang baca dan perpustakaan komunitas hangat dekat kampus.",
lokasi = "Jl. Mahasiswa No. 12 | Buka: 09.00 - 21.00 WITA",
}) {
return (
    <section className="py-12 px-6 bg-slate-900 rounded-2xl border border-slate-800 text-center shadow-lg">
    <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        Selamat Datang di {nama}
    </span>
    <h1 className="text-4xl font-bold mb-3 text-white">
        Temukan Ketenangan Dalam Lembaran Buku
    </h1>
    <p className="text-slate-300 max-w-xl mx-auto mb-2 text-lg">{deskripsi}</p>
    <p className="text-slate-400 text-sm mb-8">{lokasi}</p>
    <div className="flex justify-center gap-4">
        <Link
        href="/katalog"
        className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
        Lihat Katalog Buku
        </Link>
        <Link
        href="/usulan"
        className="border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition"
        >
        Usulkan Buku Baru
        </Link>
    </div>
    </section>
);
}