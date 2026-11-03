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
      <body className="bg-gradient-to-br from-[#fff1f7] via-white to-[#f2edfb] text-gray-800">
        <Navbar />
        <main className="min-h-[75vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
