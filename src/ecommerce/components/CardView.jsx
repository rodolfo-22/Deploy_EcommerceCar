import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardView = ({ car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${car.id}`); // Navega a la página de detalles del carro
  };

  return (
    <div className="border rounded-lg p-4 cursor-pointer" onClick={handleCardClick}>
      <img src={car.images[0]} alt={car.model} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-bold">{car.model}</h3>
      <p>{car.price}</p>
    </div>
  );
};

export default CardView;
