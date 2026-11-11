function Footer({ namaKedai, jamBuka }) {
  return (
    <footer className="bg-stone-900 py-10 text-center text-orange-100/70">
      <p className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-bold text-orange-100">{namaKedai}</p>
      <p className="mt-1 text-sm">{jamBuka}</p>
      <p className="mt-4 text-xs text-orange-100/40">&copy; 2026 {namaKedai}. Semua hak dilindungi.</p>
    </footer>
  );
}

export default Footer;
