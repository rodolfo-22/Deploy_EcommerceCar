import React from "react";

const VehicleMenu = ({ showMenu, closeMenu }) => {
  if (!showMenu) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-white bg-opacity-90">
      <div className="container mx-auto mt-20">
        <div className="relative flex justify-between items-center">
          <ul className="flex justify-evenly w-full py-4 px-8">
            <li className="hover:text-red-500 cursor-pointer">
              <a href="#">Autos sedan</a>
            </li>
            <li className="hover:text-red-500 cursor-pointer">
              <a href="#">SUVs y Crossovers</a>
            </li>
          </ul>

          {/* Botón para cerrar el menú (X) */}
          <button
            className="absolute top-2 right-6 text-red-600 font-bold text-3xl hover:text-red-400 transition-colors duration-200"
            onClick={closeMenu}
          >
            &times;
          </button>
        </div>
        <div className="border-b-2 border-red-500 w-full mt-2"></div>
      </div>
    </div>
  );
};

export default VehicleMenu;
