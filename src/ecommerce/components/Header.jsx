import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleMenu from "./VehicleMenu"; // Importamos el menú de vehículos

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  // Detectar scroll y dirección para mostrar/ocultar el header
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (lastScrollY > currentScrollY) {
        setVisible(true); // Mostrar cuando subes
      } else if (currentScrollY > 100) {
        setVisible(false); // Ocultar cuando bajas
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para abrir/cerrar el menú
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header
        className={`bg-white p-4 fixed w-full z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Nombre del sitio a la izquierda */}
          <h1 className="text-3xl font-bold text-blue-600">Venta de carros</h1>

          {/* Menú de navegación */}
          <nav className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-blue-600 font-semibold hover:underline"
            >
              Vehículos
            </button>

            {/* Botón de Iniciar Sesión */}
            <Link
              to="/login"
              className="bg-blue-600 text-white ml-4 mr-10 px-4 py-2 rounded-md font-semibold hover:bg-blue-500"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* Menú de Vehículos */}
      <VehicleMenu showMenu={showMenu} closeMenu={() => setShowMenu(false)} />
    </>
  );
};

export default Header;
