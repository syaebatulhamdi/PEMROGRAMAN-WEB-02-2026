import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pustaka Senja",
  description: "Ruang baca dan perpustakaan komunitas Pustaka Senja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-white text-slate-800 antialiased`}
      >
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}