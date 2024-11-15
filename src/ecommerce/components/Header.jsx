import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleMenu from "./VehicleMenu";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setVisible(lastScrollY > currentScrollY || currentScrollY <= 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <header className={`bg-[#121212] fixed w-full z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" aria-label="Inicio de CarConnect">
            <img src="/ucacars3.png" alt="UCA Cars logo" className="h-24 w-auto" /> 
          </Link>

          <nav className="flex items-center space-x-6">
            <button
              onClick={toggleMenu}
              className="text-[#00BCD4] font-poppins font-semibold hover:text-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Abrir menú de vehículos"
            >
              Vehículos
            </button>
            <Link
              to="/login"
              className="bg-[#F53756] text-white px-4 py-2 rounded-md font-poppins font-semibold hover:bg-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Iniciar Sesión"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>
      <VehicleMenu showMenu={showMenu} closeMenu={() => setShowMenu(false)} />
    </>
  );
};

export default Header;
