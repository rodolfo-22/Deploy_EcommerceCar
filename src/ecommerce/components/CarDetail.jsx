import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CarDetail = ({ cars }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((car) => car.id === parseInt(id));

  if (!car) return <div>No se encontró el coche.</div>;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Moverse a la siguiente imagen cada 3 segundos automáticamente
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % car.images.length
        );
      }, 3000); // Cambia de imagen cada 3 segundos

      return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonta
    }
  }, [currentImageIndex, autoPlay, car.images.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    setAutoPlay(false); // Detener autoplay cuando el usuario interactúa
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length
    );
    setAutoPlay(false); // Detener autoplay cuando el usuario interactúa
  };

  const handleQuoteVehicle = () => {
    navigate("/quote"); // Reemplaza '/quote' con la ruta de tu vista de cotización
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row">
      <div className="relative lg:w-4/5 w-full" style={{ height: "90vh" }}>
        <h2 className="text-2xl font-bold mb-4">{car.model}</h2>
        <img
          src={car.images[currentImageIndex]}
          alt={`${car.model}`}
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
      <div className="lg:w-1/5 w-full mt-6 lg:mt-0 lg:ml-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-4">Detalles:</h3>
          <p>
            Año: <span className="font-medium">{car.year}</span>
          </p>
          <p>
            Combustible: <span className="font-medium">{car.fuel}</span>
          </p>
          <p>
            Precio: <span className="font-medium">{car.price}</span>
          </p>
        </div>
        <button
          onClick={handleQuoteVehicle}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4 lg:mt-6"
        >
          Cotizar Vehículo
        </button>
      </div>
    </div>
  );

};

export default CarDetail;
