"use client";

import { useState } from "react";

export default function TombolFavorit({ bukuId }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("pustaka_favorites") || "[]");
      return favorites.includes(bukuId);
    } catch (e) {
      return false;
    }
  });

  const toggleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("pustaka_favorites") || "[]");
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter((id) => id !== bukuId);
      } else {
        updatedFavorites = [...favorites, bukuId];
      }
      localStorage.setItem("pustaka_favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error("Gagal memperbarui favorit:", e);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="flex items-center gap-1 bg-white border border-[#F0ECE4] px-3 py-2 rounded-full cursor-pointer"
    >
      <img
        src={isFavorite ? "/fav.svg" : "/notFav.svg"}
        alt="Favorite Icon"
        className="w-12 h-12 object-contain"
      />
    </button>
  );
}