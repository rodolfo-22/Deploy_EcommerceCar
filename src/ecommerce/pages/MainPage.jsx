import React from "react";
import { FaCar } from "react-icons/fa";
import { CardView, Footer, Header, Carousel } from "../components";
import { useCarService } from "../../hooks";
import bgImage from "../../assets/bg.jpg";
import bgImage2 from "../../assets/b9.jpg";

const MainPage = () => {
  const { cars, loading, error } = useCarService();

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Header />
      <Carousel />

      {/* Sección Estilo "El carro perfecto para ti" */}
      <section className="bg-[#2D2D2D] py-16 px-8 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">El carro perfecto para ti</h2>
          <p className="text-lg mb-8">
            En todas las marcas y modelos de carros nuevos, híbridos, usados y
            de trabajo
          </p>
          <button className="bg-white text-[#00BCD4] font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
            Conoce más <span className="ml-2">→</span>
          </button>
        </div>
      </section>

      {/* Manejo de error y carga */}
      {loading && (
        <div className="text-center text-lg text-gray-400 mt-8">
          Cargando vehículos...
        </div>
      )}
      {error && (
        <div className="text-center text-lg text-red-500 mt-8">{error}</div>
      )}

      {/* Sección de Vehículos */}
      <section aria-labelledby="our-vehicles" className="my-12">
        <div className="flex justify-center items-center">
          <h2
            id="our-vehicles"
            className="text-5xl font-raleway font-bold text-[#00BCD4] py-4 px-6 inline-flex items-center"
          >
            <FaCar className="mr-4" size={36} /> Nuestra Selección
          </h2>
        </div>

        {!loading && !error && cars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-[#1F1F1F] shadow-lg rounded-lg p-4 transform hover:scale-105 transition duration-300"
                aria-label={`Información sobre el ${car.model}`}
              >
                <CardView car={car} />
              </div>
            ))}
          </div>
        )}

        {/* Mensaje si no hay vehículos disponibles */}
        {!loading && !error && cars.length === 0 && (
          <div className="text-center text-lg text-gray-400 mt-8">
            No hay vehículos disponibles.
          </div>
        )}
      </section>

      <section className="bg-cover py-64 px-8 text-center text-white flex items-baseline"
        style={{ backgroundImage: `url(${bgImage2})` }}>
        <div className=" text-white p-8 bg-opacity-70 bg-black rounded-lg">
          <h2 className="text-4xl font-bold mb-4">Cotiza tu vehiculo</h2>
          <p className="text-lg mb-8">
            ¡Nosotros te ayudamos a encontrar tu carro ideal! Contáctanos y te
            asesoraremos en todo el proceso.
          </p>
          {/* Vamos a reducir el tamaño del form */}
          <form action="">
            <div className="grid grid-cols-1 sm:grid-cols-2 py-8 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="text"
                placeholder="Marca"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="text"
                placeholder="Modelo"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="text"
                placeholder="Año"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="text"
                placeholder="Kilometraje"
                className="bg-white text-white p-4 rounded-lg"
              />
              <input
                type="text"
                placeholder="Precio"
                className="bg-white text-white p-4 rounded-lg"
              />
            </div>
            <button className="bg-[#121212] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300 mt-4">
              Cotizar ahora<span className="ml-2"></span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MainPage;
