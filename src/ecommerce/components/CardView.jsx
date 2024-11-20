import React from "react";
import { useNavigate } from "react-router-dom";

const CardView = ({ car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${car._id}`); // Cambié `car.id` por `car._id`
  };

  return (
    <div
      className="border border-[#286181] rounded-lg p-4 sm:p-6 bg-[#1F1F1F] hover:shadow-xl transition-transform duration-200 cursor-pointer"
      onClick={handleCardClick}
      aria-label={`Tarjeta de ${car.model}`}
    >
      <img
        src={car.image[0]}
        alt={`Imagen del modelo ${car.model}`}
        className="w-full h-36 sm:h-48 md:h-64 object-cover mb-4 rounded-md"
        loading="lazy"
      />
      <h3
        className="text-lg sm:text-xl md:text-2xl font-raleway font-bold text-white"
        aria-label={`Modelo ${car.model}`}
      >
        {car.model}
      </h3>
      <p
        className="text-sm sm:text-lg md:text-xl font-poppins text-[#8C8C8C]"
        aria-label={`Precio: ${car.price}`}
      >
        ${car.price}
      </p>
    </div>

  );
};

export default CardView;
