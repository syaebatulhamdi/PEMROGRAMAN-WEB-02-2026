
const perkenalan =
  'Hai! Saya Ayu Anggraini. Kalau baru kenal, aku cenderung pendiam. Tapi kalau sudah akrab, banyak tingkahnya. Sekarang saya masih mengeksplorasi berbagai bidang teknologi, mulai dari web development sampai database. Belum menentukan ingin fokus ke mana, jadi untuk sekarang saya coba pelajari dulu satu per satu. Siapa tahu ketemu passion, bukan cuma ketemu error.'

const dataDiri = [
  { id: 1, label: 'Nama', value: 'Ayu Anggraini' },
  { id: 2, label: 'Kampus', value: 'Universitas Hasanuddin' },
  { id: 3, label: 'Status', value: 'Mahasiswa' },
  {
    id: 4,
    label: 'Kepribadian',
    value: 'Pendiam di awal, banyak tingkah kalau sudah akrab',
  },
  {
    id: 5,
    label: 'Minat',
    value: 'Masih coba-coba',
  },
]

function About() {
  return (
    <section id="about" className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900">
          Tentang Saya
        </h2>
        <div className="mt-2 h-1 w-16 rounded bg-amber-400" />

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="max-w-prose text-lg leading-relaxed text-slate-600">
            <p>{perkenalan}</p>

            <p className="mt-4 text-base text-slate-500">
              Motto hidup: Ekspektasi boleh setinggi langit, usaha menyusul setelah istirahat.
            </p>
          </div>

          <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {dataDiri.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:gap-4"
              >
                <dt className="w-28 shrink-0 font-semibold text-slate-900">
                  {item.label}
                </dt>
                <dd className="break-words text-slate-600">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
export default About;