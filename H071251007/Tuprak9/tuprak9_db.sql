CREATE TABLE buku (
  id SERIAL PRIMARY KEY,
  judul VARCHAR(150) NOT NULL,
  penulis VARCHAR(100) NOT NULL,
  kategori VARCHAR(50) NOT NULL,
  tahun INTEGER NOT NULL,
  tersedia BOOLEAN NOT NULL,
  sinopsis TEXT NOT NULL
);

INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES
('Clean Code', 'Robert C. Martin', 'Teknologi', 2008, true, 'Panduan praktis tentang pemrograman agile dan penulisan kode perangkat lunak yang bersih, mudah dibaca, serta dapat dipelihara oleh tim pengembang.'),
('Designing Data-Intensive Applications', 'Martin Kleppmann', 'Teknologi', 2017, true, 'Eksplorasi mendalam mengenai arsitektur sistem data yang handal, terskala, dan dapat dipelihara dalam lanskap perangkat lunak modern.'),
('Refactoring', 'Martin Fowler', 'Teknologi', 2018, false, 'Panduan menyempurnakan struktur internal kode yang sudah ada tanpa mengubah perilaku eksternal untuk meningkatkan kualitas perangkat lunak.'),
('Laut Bercerita', 'Leila S. Chudori', 'Fiksi', 2017, true, 'Novel yang mengisahkan persahabatan, keluarga, cinta, dan perjuangan para aktivis mahasiswa pada masa-masa krusial penghujung era Orde Baru.'),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Fiksi', 1980, true, 'Karya mahakarya sastra Indonesia yang berlatar masa kolonial, mengikuti perjalanan Minke di tengah pergulatan sosial dan intelektual.'),
('Cantik Itu Luka', 'Eka Kurniawan', 'Fiksi', 2002, false, 'Sebuah kisah epik yang memadukan sejarah kelam Indonesia dengan unsur realisme magis melalui kehidupan seorang perempuan dan keluarganya.'),
('Atomic Habits', 'James Clear', 'Pengembangan Diri', 2018, true, 'Cara mudah dan terbukti untuk membangun kebiasaan baik dan membuang kebiasaan buruk lewat perubahan kecil yang memberikan hasil luar biasa.'),
('Deep Work', 'Cal Newport', 'Pengembangan Diri', 2016, true, 'Aturan untuk fokus tanpa gangguan di dunia yang penuh distraksi, membantu mencapai produktivitas maksimal dalam karier.'),
('The Psychology of Money', 'Morgan Housel', 'Pengembangan Diri', 2020, true, 'Pelajaran abadi mengenai kekayaan, keserakahan, dan kebahagiaan melalui sudut pandang perilaku manusia.');

ALTER TABLE buku ADD COLUMN cover VARCHAR(255);
UPDATE buku SET cover = NULL;

CREATE TABLE IF NOT EXISTS usulan_buku (
  id SERIAL PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  penulis VARCHAR(255) NOT NULL,
  kategori VARCHAR(100) NOT NULL,
  alasan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usulan_buku ADD COLUMN IF NOT EXISTS nama_pengusul VARCHAR(100);

select * from usulan_buku;