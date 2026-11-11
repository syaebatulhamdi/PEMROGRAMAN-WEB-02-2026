"use client";

export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-paper px-6 py-14 text-center shadow-sm">
      <h1 className="font-display text-2xl font-bold text-coral">
        Terjadi kesalahan
      </h1>
      <p className="mt-3 text-plum/70">
        Aplikasi belum bisa membaca data. Pastikan PostgreSQL berjalan dan
        DATABASE_URL di .env.local sudah benar.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-iris"
      >
        Coba Lagi
      </button>
    </div>
  );
}
