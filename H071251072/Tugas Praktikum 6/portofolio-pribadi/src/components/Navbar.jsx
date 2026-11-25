function Navbar() {
  const menuList = [
    { name: "Home", target: "#home" },
    { name: "About", target: "#about" },
    { name: "Skills", target: "#skills" },
    { name: "Gallery", target: "#gallery" }
  ];

  const handleMenuClick = (menuName, target) => {
    console.log(`Menu ${menuName} diklik! Mengarahkan ke ${target}`);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md text-white sticky top-0 z-50 shadow-lg border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Portofolio
        </h1>
        <ul className="flex space-x-6 md:space-x-8">
          {menuList.map((item, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(item.name, item.target)}
              className="cursor-pointer text-gray-300 hover:text-cyan-400 transition font-medium text-sm md:text-base"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;