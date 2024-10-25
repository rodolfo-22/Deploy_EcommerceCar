import React from "react";
const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-4 mt-4 text-center">
      <p className="text-xs">
        Las especificaciones, características, ilustraciones, colores y
        equipamientos mostrados están basados en la ultima información
        disponible. Aunque las descripciones son consideradas correctas, la
        exactitud no puede ser garantizada. American Motor Co., inc. se reserva
        el derecho de realizar cambios en cualquier momento sin aviso previo.
        Algunas características mencionadas no están disponibles en todos los
        mercados.
      </p>
      <p>&copy; 2024. All rights reserved.</p>
      <div className="flex justify-center mt-4 space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
          Aviso de privacidad
        </a>
        <span className="text-gray-400">|</span>
        <a href="#" className="text-gray-400 hover:text-white">
          Términos legales
        </a>
      </div>
    </div>
  );
};

export default Footer;
