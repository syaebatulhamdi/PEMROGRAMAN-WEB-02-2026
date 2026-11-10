import { useState } from 'react'

export default function FormPesan({ pesanan, onPesananSelesai }) {
  const [nama, setNama] = useState('')
  const [nomorMeja, setNomorMeja] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    {/* PERINGATAN PESANAN */}
    if (pesanan.length === 0) {
      setErrorMsg('Pesanan Anda masih kosong! Pilih minimal 1 menu.')
      return
    }

    {/* PERINGATAN NAMA */}
    const nameRegex = /^[A-Za-z\s]+$/
    if (!nama.trim()) {
      setErrorMsg('Mohon lengkapi Nama Anda.')
      return
    }
    if (nama.trim().length < 3) {
      setErrorMsg('Nama pemesan minimal harus 3 karakter/huruf.')
      return
    }
    if (!nameRegex.test(nama)) {
      setErrorMsg('Nama tidak boleh mengandung angka atau simbol.')
      return
    }

    {/* PERINGATAN PESANAN */}
    if (nomorMeja === '') {
      setErrorMsg('Mohon lengkapi Nomor Meja Anda.')
      return
    }
    
    const mejaRegex = /^\d+$/
    if (!mejaRegex.test(nomorMeja)) {
      setErrorMsg('Nomor meja harus berupa angka bulat positif (tidak boleh ada minus atau desimal).')
      return
    }

    setErrorMsg('')
    setNama('')
    setNomorMeja('')
    onPesananSelesai()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cafe-card rounded-3xl p-6 border border-[#E2D4C3] shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-cafe-brown border-b border-[#E2D4C3] pb-3">
        Data Pemesan
      </h3>

      {errorMsg && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-cafe-brown-light mb-1">
            Nama Pelanggan
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value)
              if (errorMsg) setErrorMsg('')
            }}
            placeholder="Contoh: Budi Santoso"
            className="w-full px-3.5 py-2.5 bg-cafe-base border border-[#E2D4C3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cafe-accent text-cafe-brown placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-cafe-brown-light mb-1">
            Nomor Meja
          </label>
          <input
            type="number"
            value={nomorMeja}
            onChange={(e) => {
              setNomorMeja(e.target.value)
              if (errorMsg) setErrorMsg('')
            }}
            placeholder="Contoh: 5"
            className="w-full px-3.5 py-2.5 bg-cafe-base border border-[#E2D4C3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cafe-accent text-cafe-brown placeholder:text-gray-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-cafe-brown hover:bg-cafe-brown-light text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
      >
        🚀 Kirim Pesanan Sekarang
      </button>
    </form>
  )
}