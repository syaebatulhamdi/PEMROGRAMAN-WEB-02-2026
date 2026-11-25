import React from "react";
import MenuCard from "./MenuCard.jsx";

function MenuList({ menuList, onTambahPesanan }) {
if (menuList.length === 0) {
    return (
    <div className="text-center py-12 text-stone-500">
        <p className="text-lg">Tidak ada menu dalam kategori ini.</p>
    </div>
    );
}

return (
    <section className="mb-10">
    <h2 className="text-xl font-bold text-stone-800 mb-4">Daftar Menu</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuList.map((item) => (
        <MenuCard
            key={item.id}
            menu={item}
            onTambahPesanan={onTambahPesanan}
        />
        ))}
    </div>
    </section>
);
}

export default MenuList;