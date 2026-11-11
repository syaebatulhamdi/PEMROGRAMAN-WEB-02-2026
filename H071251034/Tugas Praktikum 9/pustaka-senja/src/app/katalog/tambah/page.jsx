import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

export default function TambahBukuPage() {
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Tambah Buku
      </h1>
      <p className="mt-2 text-plum/70">
        Masukkan buku baru ke koleksi Pustaka Senja.
      </p>
      <div className="mt-6">
        <FormBuku
          action={tambahBuku}
          nilaiAwal={{
            judul: "",
            penulis: "",
            kategori: "",
            tahun: "",
            tersedia: "true",
            sinopsis: "",
          }}
          labelTombol="Simpan Buku"
          hrefBatal="/katalog"
        />
      </div>
    </section>
  );
}
