import MenuCard from './MenuCard'

export default function MenuList({ menuList, onTambahPesanan, onShowDetail }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-cafe-brown">Daftar Menu</h2>
        <span className="text-xs font-semibold text-cafe-brown-light bg-cafe-card px-3 py-1 rounded-full">
          {menuList.length} Menu Tersedia
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {menuList.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onTambah={onTambahPesanan}
            onShowDetail={onShowDetail}
          />
        ))}
      </div>
    </div>
  )
}