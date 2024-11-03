import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardView = ({ car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${car.id}`);
  };

  return (
    <div
      className="border border-[#2D2D2D] rounded-lg p-4 cursor-pointer bg-[#1F1F1F] hover:shadow-xl transition-transform duration-200"
      onClick={handleCardClick}
      aria-label={`Tarjeta de ${car.model}`}
    >
      <img
        src={car.images[0]}
        alt={`Imagen del modelo ${car.model}`}
        className="w-full h-48 object-cover mb-4 rounded-md"
        loading="lazy"
      />
      <h3 className="text-xl font-raleway font-bold text-[#00BCD4]" aria-label={`Modelo ${car.model}`}>
        {car.model}
      </h3>
      <p className="text-lg font-poppins text-[#8C8C8C]" aria-label={`Precio: ${car.price}`}>
        {car.price}
      </p>
    </div>
  );
};

export default CardView;
