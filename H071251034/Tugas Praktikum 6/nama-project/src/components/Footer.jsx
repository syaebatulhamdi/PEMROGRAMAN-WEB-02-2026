function Footer() {
  const nama = 'Aura'
  const tahun = '2026'

  return (
    <footer className="border-t-4 border-amber-400 bg-lime-900 py-8 text-center font-['unbounded'] text-amber-50">
      <p className="px-5 text-base font-semibold">
        <span aria-hidden="true" className="mr-2 text-orange-400">
          &#10022;
        </span>
        &copy; {tahun} {nama}
      </p>
    </footer>
  )
}


export default Footer