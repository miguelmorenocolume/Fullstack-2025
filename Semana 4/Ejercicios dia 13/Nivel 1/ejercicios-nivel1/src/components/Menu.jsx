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
    <nav className="bg-white shadow-md w-full p-4">
      <ul className="flex space-x-8">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <button
              onClick={() => item.submenu && toggleSubmenu(index)}
              className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
            >
              {item.name}
            </button>

            {/* Submenu */}
            {item.submenu && openIndex === index && (
              <ul className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-md mt-2 py-2 w-40">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600"
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
