import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleMenu from "./VehicleMenu";
import logo from "../../assets/logo2.png"

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
      <header className={`bg-black bg-opacity-50 pt-8 pb-8 fixed w-full z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="font-poppins font-semibold text-2xl">CARCONNECT</p>
            {/* <img src={logo} alt="UCA Cars logo" className="w-50 h-50" /> */}
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={toggleMenu}
              className="text-white font-poppins font-semibold hover:text-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Abrir menú de vehículos"
            >
              VEHICULOS
            </button>
            <button
              onClick={toggleMenu}
              className="text-white font-poppins font-semibold hover:text-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Abrir menú de vehículos"
            >
              COTIZACIONES
            </button>
            <Link
              to="/login"
              className="bg-[#00BCD4] text-white px-4 py-2 rounded-md font-poppins font-semibold hover:bg-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Iniciar Sesión"
            >
              CARCONNECT BUSSINES
            </Link>
          </nav>
        </div>
      </header>
      <VehicleMenu showMenu={showMenu} closeMenu={() => setShowMenu(false)} />
    </>
  );
};

export default Header;
