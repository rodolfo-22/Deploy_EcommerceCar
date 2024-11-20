import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarService } from "../../hooks";
import carDetails from "../../assets/honda14.jpg";

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

  // useEffect(() => {
  //   if (autoPlay && car && car.image.length > 0) {
  //     const interval = setInterval(() => {
  //       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.image.length);
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [currentImageIndex, autoPlay, car]);

  // const handleNextImage = () => {
  //   if (car) {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.image.length);
  //     setAutoPlay(false);
  //   }
  // };

  // const handlePrevImage = () => {
  //   if (car) {
  //     setCurrentImageIndex(
  //       (prevIndex) => (prevIndex - 1 + car.image.length) % car.image.length
  //     );
  //     setAutoPlay(false);
  //   }
  // };

  const handleQuoteVehicle = () => {
    navigate("/quote");
  };

  if (loading) return <div>Cargando detalles del coche...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>No se encontró el coche.</div>;

  return (
    <div>
      <div className="bg-cover bg-center h-screen flex flex-row justify-center" style={{ backgroundImage: `url(${car.image[0]})` }}>
        <div className="h-screen flex flex-col justify-between w-full pb-20">
          <div className="pt-10">
            <p className="text-6xl text-white text-center sm:text-5xl md:text-6xl">{car.manufacturer} {car.model}</p>
          </div>
          <div className="flex flex-col bg-black bg-opacity-50 text-black mr-4 ml-4 rounded-3xl pt-4 sm:bg-transparent sm:flex-row sm:justify-evenly sm:items-center">
            <div className="text-center sm:text-left pb-6 sm:pb-0">
              <p className="text-3xl text-white">{car.fuelType}</p>
              <p className="text-white">Tipo de combustible</p>
            </div>
            <div className="text-center sm:text-left pb-6 sm:pb-0">
              <p className="text-3xl text-white">{car.transmission}</p>
              <p className="text-white">Transmisión</p>
            </div>
            <div className="text-center sm:text-left pb-6 sm:pb-0">
              <p className="text-3xl text-white">{car.fuelRange}</p>
              <p className="text-white">Rendimiento del combustible</p>
            </div>
            <div className="text-center sm:text-left pb-6 sm:pb-0">
              <p className="text-3xl text-white">{car.engine}</p>
              <p className="text-white">Cilindrada</p>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-black pl-8 pr-8">
        <div className="text-white p-4">
          <p className="text-3xl pt-4 pb-4">Modelo y Specs</p>

          {/* Conducción Section */}
          <div className="mb-6">
            <p className="text-2xl mb-2">Conducción</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-gray-500">Combustible</p>
                <p className="text-xl">{car.fuelType}</p>
              </div>
              <div>
                <p className="text-gray-500">Rango</p>
                <p className="text-xl">{car.fuelRange}</p>
              </div>
              <div>
                <p className="text-gray-500">Aceleración</p>
                <p className="text-xl">{car.aceleration}</p>
              </div>
              <div>
                <p className="text-gray-500">Tracción</p>
                <p className="text-xl">{car.driveTrain}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 pb-6">
            <hr />
          </div>

          {/* Dimensiones Section */}
          <div className="mb-6">
            <p className="text-2xl mb-2">Dimensiones</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-gray-500">Peso</p>
                <p className="text-xl">{car.weight} lbs</p>
              </div>
              <div>
                <p className="text-gray-500">Longitud de ruedas</p>
                <p className="text-xl">{car.wheel_length}''</p>
              </div>
              <div>
                <p className="text-gray-500">Asientos</p>
                <p className="text-xl">{car.seatingCapacity}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 pb-6">
            <hr />
          </div>

          {/* Tecnología Section */}
          <div className="mb-6">
            <p className="text-2xl mb-2">Tecnología</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-gray-500">Audio multimedia</p>
                <p className="text-xl">Compatibilidad inalámbrica con Apple CarPlay® * y Android Auto™ *</p>
              </div>
              <div>
                <p className="text-gray-500">Seguridad</p>
                <p className="text-xl">Safety Sense™ 3.0 *</p>
              </div>
              <div>
                <p className="text-gray-500">Conducción asistida</p>
                <p className="text-xl">Sensity CDN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CarDetail;
