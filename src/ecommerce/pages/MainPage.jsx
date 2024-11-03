import React from 'react';
import { FaCar } from 'react-icons/fa';
import CardView from '../components/CardView';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Carousel from '../components/Carousel';

const MainPage = ({ cars }) => {
  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Header />
      <Carousel />
      
      {/* Nueva Sección Estilo "El carro perfecto para ti" */}
      <section className="bg-[#00BCD4] py-16 px-8 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">El carro perfecto para ti</h2>
          <p className="text-lg mb-8">
            En todas las marcas y modelos de carros nuevos, híbridos, usados y de trabajo
          </p>
          <button className="bg-white text-[#00BCD4] font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
            Conoce más <span className="ml-2">→</span>
          </button>
        </div>
      </section>

      <section aria-labelledby="our-vehicles" className="my-12">
        <div className="flex justify-center items-center">
          <h2
            id="our-vehicles"
            className="text-5xl font-raleway font-bold text-[#00BCD4] py-4 px-6 inline-flex items-center"
          >
            <FaCar className="mr-4" size={36} /> Nuestra Selección
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-[#1F1F1F] shadow-lg rounded-lg p-4 transform hover:scale-105 transition duration-300"
              aria-label={`Información sobre el ${car.model}`}
            >
              <CardView car={car} />
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MainPage;
