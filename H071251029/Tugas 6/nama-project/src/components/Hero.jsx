// Komponen bagian utama / Hero
function Hero() {
  // Fungsi untuk tombol Hero
  const handleButtonClick = () => {
    console.log("Tombol Lihat Portfolio diklik!");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#E9D5FF] via-[#FDF2F8] to-[#DBEAFE] px-6 pt-28"
    >

      {/* Dekorasi warna */}
      <div className="absolute left-5 top-32 h-20 w-20 rounded-full bg-[#FDE68A] opacity-80"></div>

      <div className="absolute right-5 top-40 h-28 w-28 rounded-full bg-[#A7F3D0] opacity-80"></div>

      <div className="absolute bottom-20 left-1/3 h-24 w-24 rounded-full bg-[#FBCFE8] opacity-70"></div>

      {/* Isi Hero */}
      <div className="relative mx-auto grid min-h-[80vh] max-w-6xl items-center gap-12 md:grid-cols-2">

        {/* Bagian teks */}
        <div className="text-center md:text-left">

          <div className="mb-5 inline-block rounded-full bg-white px-5 py-2 shadow-md">
            <p className="font-bold text-[#8B5CF6]">
              Halo, saya
            </p>
          </div>

          <h1 className="text-5xl font-black leading-tight text-[#312E81] sm:text-6xl">
            Talista
            <span className="text-[#EC4899]"> Anindya</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#5B5563] md:mx-0">
            Mahasiswa Sistem Informasi yang tertarik pada pengembangan
            website, desain antarmuka, dan teknologi digital.
          </p>

          {/* Tombol */}
          <button
            onClick={handleButtonClick}
            className="mt-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Lihat Portfolio 
          </button>

        </div>

        {/* Foto Profil */}
        <div className="flex justify-center">

          <div className="relative">

            {/* Dekorasi belakang foto */}
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#FDE68A]"></div>

            <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-[#A7F3D0]"></div>

            {/* Frame foto */}
            <div className="relative rounded-[40px] bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#60A5FA] p-3 shadow-2xl">

              {/* Foto dari folder public */}
              <img
                src="/public/imoet.jpeg"
                alt="Foto profil Talista Anindya"
                className="h-72 w-72 rounded-[32px] object-cover sm:h-80 sm:w-80"
              />

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;