import MenuCard from "./MenuCard.jsx";

function MenuList({ menuList, onTambah }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {menuList.map((menu) => (
        <MenuCard
          key={menu.id}
          id={menu.id}
          nama={menu.nama}
          kategori={menu.kategori}
          harga={menu.harga}
          tersedia={menu.tersedia}
          deskripsi={menu.deskripsi}
          onTambah={onTambah}
        />
      ))}
    </div>
  );
}

export default MenuList;
