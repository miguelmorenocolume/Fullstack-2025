import { useState } from "react";

const menuItems = [
  { name: "Inicio", path: "/" },
  {
    name: "Servicios",
    path: "/servicios",
    submenu: [
      { name: "Web", path: "/servicios/web" },
      { name: "App", path: "/servicios/app" },
    ],
  },
  { name: "Contacto", path: "/contacto" },
];

function Menu() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-md w-full p-4 font-sans z-50">
      <ul className="flex space-x-8 justify-center">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <button
              onClick={() => item.submenu && toggleSubmenu(index)}
              className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none transition-colors"
              aria-expanded={openIndex === index}
            >
              {item.name}
            </button>

            {/* Submenu */}
            {item.submenu && (
              <ul
                className={`absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-md mt-2 w-44 transform transition-all duration-300 origin-top opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 ${
                  openIndex === index ? 'opacity-100 scale-y-100' : ''
                }`}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
