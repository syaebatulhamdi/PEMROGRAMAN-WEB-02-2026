// Data diri disimpan dalam array of object
const dataDiri = [
  {
    id: 1,
    label: "Nama",
    value: "Talista Anindya",
    warna: "bg-[#FCE7F3] border-[#F9A8D4]",
  },
  {
    id: 2,
    label: "Program Studi",
    value: "Sistem Informasi",
    warna: "bg-[#EDE9FE] border-[#C4B5FD]",
  },
  {
    id: 3,
    label: "Universitas",
    value: "Universitas Hasanuddin",
    warna: "bg-[#DBEAFE] border-[#93C5FD]",
  },
  {
    id: 4,
    label: "Fokus",
    value: "Web Development & UI/UX",
    warna: "bg-[#D1FAE5] border-[#86EFAC]",
  },
];

// Komponen About
function About() {
  return (
    <section id="about" className="bg-white px-6 py-24">

      <div className="mx-auto max-w-6xl">

        {/* Judul */}
        <div className="mb-12 text-center">

          <p className="font-bold text-[#EC4899]">
            About Me
          </p>

          <h2 className="mt-2 text-4xl font-black text-[#312E81]">
            Mengenal Saya Lebih Dekat
          </h2>

        </div>

        <div className="grid gap-10 md:grid-cols-2">

          {/* Deskripsi */}
          <div className="rounded-3xl bg-gradient-to-br from-[#F5F3FF] to-[#FCE7F3] p-8 shadow-sm">

            <h3 className="mb-4 text-2xl font-bold text-[#7C3AED]">
              Hola! 
            </h3>

            <p className="leading-8 text-[#5B5563]">
              Saya adalah mahasiswa Sistem Informasi yang memiliki
              ketertarikan terhadap teknologi, pengembangan website,
              dan desain antarmuka. Saya senang mempelajari hal-hal
              baru dan mengembangkan kemampuan melalui berbagai
              proyek dan tugas perkuliahan.
            </p>

          </div>

          {/* Data diri menggunakan map */}
          <div className="grid gap-4 sm:grid-cols-2">

            {dataDiri.map((item) => (
              <div
                key={item.id}
                className={`rounded-3xl border-2 p-5 shadow-sm transition hover:-translate-y-1 ${item.warna}`}
              >

                <div className="text-2xl">
                  {item.icon}
                </div>

                <p className="mt-3 text-sm font-bold text-[#7C3AED]">
                  {item.label}
                </p>

                <p className="mt-1 font-semibold text-[#312E81]">
                  {item.value}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;