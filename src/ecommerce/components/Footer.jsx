import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#121212] to-[#1F1F1F] text-white p-8 text-center">

      <div className="border-t-4 border-[#00BCD4] mx-auto w-1/2 mb-6"></div>

      <p className="text-sm font-poppins text-[#8C8C8C] mb-4">
        Las especificaciones, características, ilustraciones, colores y equipamientos mostrados están basados en la última información disponible. 
        Aunque las descripciones son consideradas correctas, la exactitud no puede ser garantizada.
      </p>
      <p className="text-sm font-poppins text-[#4B4B4B]">&copy; 2024 Uca Cars. Todos los derechos reservados.</p>

      <div className="flex justify-center items-center mt-6 space-x-8">
        <a href="#" className="text-[#8C8C8C] hover:text-[#00BCD4] font-poppins" aria-label="Aviso de privacidad">
          Aviso de privacidad
        </a>
        <a href="#" className="text-[#8C8C8C] hover:text-[#00BCD4] font-poppins" aria-label="Términos legales">
          Términos legales
        </a>
        <a href="#" className="text-[#8C8C8C] hover:text-[#00BCD4] font-poppins" aria-label="Contáctenos">
          Contáctenos
        </a>
      </div>

  
    </footer>
  );
};

export default Footer;
