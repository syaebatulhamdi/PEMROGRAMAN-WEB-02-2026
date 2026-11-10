import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja | Ruang Baca & Perpustakaan Komunitas",
  description: "Aplikasi multi-halaman perpustakaan menggunakan Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-marshy/10 text-tangaroa font-sans">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}