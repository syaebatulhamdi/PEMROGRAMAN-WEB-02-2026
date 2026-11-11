export function parseId(nilai) {
  const teks = String(nilai);
  if (!/^\d+$/.test(teks)) return null;
  const angka = Number(teks);
  if (angka < 1 || angka > 2147483647) return null;
  return angka;
}