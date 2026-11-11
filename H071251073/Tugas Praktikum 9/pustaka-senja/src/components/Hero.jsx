export default function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="rounded-lg border border-sky-100 bg-sky-50 px-6 py-14 sm:px-12">
      <div className="mb-5 h-1 w-12 rounded bg-orange-300" />
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
        {nama}
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
        {slogan}
      </p>
      <p className="mt-6 text-sm text-slate-500">
        {lokasi} | Buka {jamBuka}
      </p>
    </section>
  );
}