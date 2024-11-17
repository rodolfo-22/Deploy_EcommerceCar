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
      <div className="bg-cover bg-center h-screen flex flex-row justify-center" style={{ backgroundImage: `url(${carDetails})` }}>
        {/* <h2 className="text-2xl font-bold mb-4">{car.model}</h2> */}
        <div className="h-screen flex flex-col justify-between w-full pb-20">
          <div className="pt-10">
            <p className="text-6xl text-white text-center">Honda Civic</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-evenly text-white">
              <div>
                <p className="text-3xl ">Híbrido</p>
                <p>Tipo de combustible</p>
              </div>
              <div>
                <p className="text-3xl">Automático</p>
                <p>Transmisión</p>
              </div>
              <div>
                <p className="text-3xl">388 mi</p>
                <p>Rendimiento del combustible</p>
              </div>
              <div >
                <p className="text-3xl">2.0 litros</p>
                <p>Cilindrada</p>
              </div>
            </div>
            {/* <div className="pb-10 flex justify-center pt-20">
            <p className="text-4xl text-white text-center">Desde $12,000</p>
          </div> */}
          </div>

          {/* <img
          src={carDetails}
          // src={car.image[currentImageIndex]}
          alt={`${car.model}`}
          className="object-cover w-full h-full rounded-lg shadow-lg"
        /> */}
          {/* <button
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
        </button> */}
        </div>

        {/* < div className="lg:w-1/5 w-full mt-6 lg:mt-0 lg:ml-6 flex flex-col justify-between">
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
      </div> */}
      </div>
      {/* <div className="bg-black pl-8 pr-8">
        <div className="text-white p-4">
          <p className="text-3xl pt-4">Modelo y Specs</p>
          <div className="pt-4">
            <p className="text-2xl mb-2">Conducción</p>
            <div className="flex gap-80">
              <div>
                <p className="text-gray-500">Combustible</p>
                <p className="text-xl">Híbrido</p>
              </div>
              <div>
                <p className="text-gray-500">Rango</p>
                <p className="text-xl">277 mi</p>
              </div>
              <div>
                <p className="text-gray-500">Aceleración</p>
                <p className="text-xl">3.5 s 0-60 mph</p>
              </div>
              <div>
                <p className="text-gray-500">Tracción</p>
                <p className="text-xl">Delantera</p>
              </div>
            </div>
          </div>
          <div className="pt-6 pb-6">
            <hr></hr>
          </div>
          <div className="">
            <p className="text-2xl mb-2">Dimensiones</p>
            <div className="flex gap-80">
              <div>
                <p className="text-gray-500">Peso</p>
                <p className="text-xl">4398 lbs</p>
              </div>
              <div>
                <p className="text-gray-500">Longitud de ruedas</p>
                <p className="text-xl">21''</p>
              </div>
              <div>
                <p className="text-gray-500">Asientos</p>
                <p className="text-xl">5 adultos</p>
              </div>
            </div>
          </div>
          <div className="pt-6 pb-6">
            <hr></hr>
          </div>
          <div className="">
            <p className="text-2xl mb-2">Tecnología</p>
            <div className="flex gap-80">
              <div>
                <p className="text-gray-500">Audio multimedia</p>
                <p className="text-xl">Compatibilidad inalámbrica con Apple CarPlay® * y Android Auto™ *</p>
              </div>
              <div>
                <p className="text-gray-500">Segurida</p>
                <p className="text-xl">Honda Safety Sense™ 3.0 *</p>
              </div>
              <div className="pb-6">
                <p className="text-gray-500">Conducción asistida</p>
                <p className="text-xl">Sensity CDN</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-black pl-8 pr-8">
        <div className="text-white p-4">
          <p className="text-3xl pt-4 pb-4">Modelo y Specs</p>

          {/* Conducción Section */}
          <div className="">
            <p className="text-2xl mb-2">Conducción</p>
            <div className="grid grid-cols-4 gap-12">
              <div>
                <p className="text-gray-500">Combustible</p>
                <p className="text-xl">Híbrido</p>
              </div>
              <div>
                <p className="text-gray-500">Rango</p>
                <p className="text-xl">277 mi</p>
              </div>
              <div>
                <p className="text-gray-500">Aceleración</p>
                <p className="text-xl">3.5 s 0-60 mph</p>
              </div>
              <div>
                <p className="text-gray-500">Tracción</p>
                <p className="text-xl">Delantera</p>
              </div>
            </div>
          </div>

          <div className="pt-6 pb-6">
            <hr />
          </div>

          {/* Dimensiones Section */}
          <div className="">
            <p className="text-2xl mb-2">Dimensiones</p>
            <div className="grid grid-cols-4 gap-12">
              <div>
                <p className="text-gray-500">Peso</p>
                <p className="text-xl">4398 lbs</p>
              </div>
              <div>
                <p className="text-gray-500">Longitud de ruedas</p>
                <p className="text-xl">21''</p>
              </div>
              <div>
                <p className="text-gray-500">Asientos</p>
                <p className="text-xl">5 adultos</p>
              </div>
              <div />
            </div>
          </div>

          <div className="pt-6 pb-6">
            <hr />
          </div>

          {/* Tecnología Section */}
          <div className="">
            <p className="text-2xl mb-2">Tecnología</p>
            <div className="grid grid-cols-4 gap-12">
              <div>
                <p className="text-gray-500">Audio multimedia</p>
                <p className="text-xl">Compatibilidad inalámbrica con Apple CarPlay® * y Android Auto™ *</p>
              </div>
              <div>
                <p className="text-gray-500">Seguridad</p>
                <p className="text-xl">Honda Safety Sense™ 3.0 *</p>
              </div>
              <div>
                <p className="text-gray-500">Conducción asistida</p>
                <p className="text-xl">Sensity CDN</p>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CarDetail;
