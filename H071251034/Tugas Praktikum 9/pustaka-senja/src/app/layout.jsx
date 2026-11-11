import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description:
    "Katalog buku dan usulan judul baru untuk ruang baca komunitas Pustaka Senja.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen bg-sand p-3 font-sans text-plum antialiased sm:p-6">
        <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-6xl flex-col rounded-[2rem] bg-cream shadow-xl sm:min-h-[calc(100vh-3rem)]">
          <Navbar />
          <main className="w-full flex-1 px-4 py-6 sm:px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
