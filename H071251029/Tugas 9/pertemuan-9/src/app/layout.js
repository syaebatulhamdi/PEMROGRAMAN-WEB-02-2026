import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Pustaka Senja",
  description: "Ruang Baca Pustaka Senja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-pink-50 via-white to-violet-50 text-gray-800">
        <Navbar />
        <main className="min-h-[75vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
