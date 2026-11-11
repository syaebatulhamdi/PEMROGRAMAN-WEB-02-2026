import { pesanStatus } from "@/lib/konstanta";

// Menampilkan banner hasil operasi dari parameter ?pesan=... (Server Component).
function Notifikasi({ kode }) {
  const pesan = pesanStatus[kode];
  if (!pesan) return null;

  return (
    <p
      role="status"
      className={
        pesan.tipe === "sukses"
          ? "mt-4 rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-900"
          : "mt-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-900"
      }
    >
      {pesan.teks}
    </p>
  );
}

export default Notifikasi;
