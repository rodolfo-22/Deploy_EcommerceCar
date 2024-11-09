import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarService } from "../../hooks";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCarById } = useCarService();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
      } catch (err) {
        setError("No se encontró el coche.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, getCarById]);

  useEffect(() => {
    if (autoPlay && car && car.image.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.image.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, autoPlay, car]);

  const handleNextImage = () => {
    if (car) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.image.length);
      setAutoPlay(false);
    }
  };

  const handlePrevImage = () => {
    if (car) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + car.image.length) % car.image.length
      );
      setAutoPlay(false);
    }
  };

  const handleQuoteVehicle = () => {
    navigate("/quote");
  };

  if (loading) return <div>Cargando detalles del coche...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>No se encontró el coche.</div>;

  return (
    <div className="p-4 flex flex-col lg:flex-row">
      <div className="relative lg:w-4/5 w-full" style={{ height: "90vh" }}>
        <h2 className="text-2xl font-bold mb-4">{car.model}</h2>
        <img
          src={car.image[currentImageIndex]}
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
            Combustible: <span className="font-medium">{car.fuelType}</span>
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
