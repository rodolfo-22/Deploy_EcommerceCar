import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { CardView, Footer, Header, Carousel } from "../components";
import { useCarService } from "../../hooks";
import bgImage from "../../assets/bg-request.png";
import postRequest from '../../services/requestService'
import Swal from 'sweetalert2'
import { ShoppingBagIcon, WrenchScrewdriverIcon, CreditCardIcon, TruckIcon } from "@heroicons/react/24/solid";

const MainPage = () => {

  const vehiclesRef = useRef(null); // Referencia para la sección de vehículos
  const quoteRef = useRef(null);    // Referencia para el formulario de cotización

  const handleScrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { cars, loading, error } = useCarService();

  // FEATURE: RequestForm

  const carData = {
    Toyota: ["Corolla", "Camry", "RAV4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["Fiesta", "Focus", "Mustang"],
  };

  const [formData, setFormData] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerPhoneNumber: "",
    requestManufacturer: "",
    requestModel: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "requestManufacturer" && { requestModel: "" }), // Resetea modelos si cambia la marca
    }));
  };

  const sendRequest = async (event) => {
    event.preventDefault();

    const result = await postRequest(formData);

    if (result.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar la solicitud',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Datos enviados con éxito. Nos pondremos en contacto contigo a la brevedad posible.',
      });
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setVisible(lastScrollY > currentScrollY || currentScrollY <= 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      {/* <Header /> */}
      <header
        className="bg-black bg-opacity-50 pt-8 pb-8 fixed w-full z-50 transition-transform duration-300"
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div>
            <p className="font-poppins font-semibold text-2xl">CARCONNECT</p>
          </div>

          {/* Botón hamburguesa para móviles */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navegación */}
          <nav
            className={`flex-col md:flex-row md:flex items-center md:space-x-6 ${showMenu ? "flex" : "hidden"
              } absolute top-16 left-0 right-0 md:static md:bg-transparent bg-black bg-opacity-90 md:space-y-0 space-y-4 p-4 md:p-0`}
          >
            <button
              onClick={() => handleScrollTo(vehiclesRef)}
              className="text-white font-poppins font-semibold hover:text-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Abrir menú de vehículos"
            >
              VEHICULOS
            </button>
            <button
              onClick={() => handleScrollTo(quoteRef)}
              className="text-white font-poppins font-semibold hover:text-[#286181] transition-colors duration-300 focus:outline-none"
              aria-label="Abrir menú de cotizaciones"
            >
              COTIZACIONES
            </button>
            <Link
              to="/login"
              className="bg-[#286181] text-white px-4 py-2 rounded-md font-poppins font-semibold hover:bg-gray-100 hover:text-black transition duration-300 focus:outline-none"
              aria-label="Iniciar Sesión"
            >
              CARCONNECT BUSSINES
            </Link>
          </nav>
        </div>
      </header>

      <Carousel />
      <section className="bg-[#2D2D2D] py-16 px-8 text-center text-white flex flex-col">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-5xl font-bold mb-4">Explora nuestros servicios y vehículos</h2>
          <p className="text-lg mb-4">
            Ofrecemos soluciones integrales para la compra, renta y mantenimiento de autos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Compra de vehículos */}
          <div className="bg-black p-6 py-14 rounded-lg shadow-lg flex flex-col items-center">
            <ShoppingBagIcon className="w-12 h-12 text-[#286181] mb-4" />
            <h3 className="text-xl font-bold mb-2">Compra de Vehículos</h3>
            <p className="text-gray-400 text-lg">
              Encuentra el auto ideal para ti. Contamos con todas las marcas y modelos disponibles.
            </p>
          </div>
          {/* Card 2: Renta de vehículos */}
          <div className="bg-black p-6 py-14 rounded-lg shadow-lg flex flex-col items-center">
            <TruckIcon className="w-12 h-12 text-[#286181] mb-4" />
            <h3 className="text-xl font-bold mb-2">Renta de Vehículos</h3>
            <p className="text-gray-400 text-lg">
              Renta autos por día, semana o mes. Ideal para viajes, eventos o negocios.
            </p>
          </div>
          {/* Card 3: Financiamiento */}
          <div className="bg-black p-6 py-14 rounded-lg shadow-lg flex flex-col items-center">
            <CreditCardIcon className="w-12 h-12 text-[#286181] mb-4" />
            <h3 className="text-xl font-bold mb-2">Financiamiento</h3>
            <p className="text-gray-400 text-lg">
              Ofrecemos planes flexibles de financiamiento para que adquieras tu auto sin preocupaciones.
            </p>
          </div>
          {/* Card 4: Mantenimiento */}
          <div className="bg-black p-6 py-14 rounded-lg shadow-lg flex flex-col items-center">
            <WrenchScrewdriverIcon className="w-12 h-12 text-[#286181] mb-4" />
            <h3 className="text-xl font-bold mb-2">Mantenimiento</h3>
            <p className="text-gray-400 text-lg">
              Mantén tu vehículo en óptimas condiciones con nuestro servicio de mantenimiento especializado.
            </p>
          </div>
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
      <section ref={vehiclesRef} aria-labelledby="our-vehicles" className="my-12">
        <div className="flex justify-center items-center">
          <h2
            id="our-vehicles"
            className="text-3xl sm:text-4xl md:text-5xl font-raleway font-bold text-white py-3 sm:py-4 px-4 sm:px-6 mb-3 sm:mb-4 inline-flex items-center"
          >
            <FaCar className="mr-3 sm:mr-4" size={30} /> Nuestra selección
          </h2>
        </div>
        {!loading && !error && cars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-6 m-10">
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

      <section
        ref={quoteRef}
        className="bg-cover py-16 sm:py-32 md:py-64 px-4 sm:px-8 flex flex-col md:flex-row justify-end items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex flex-col md:mr-10 w-full max-w-2xl">
          <div className="mb-8 px-4">
            <p className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-snug text-center md:text-start drop-shadow-lg">
              Soluciones personalizadas, atención impecable y vehículos que se ajustan
              a tus necesidades y estilo de vida.
            </p>
          </div>
          <div className="p-8 bg-opacity-50 bg-black rounded-lg w-full mx-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center md:text-start">
              Cotiza tu vehículo
            </h2>
            <p className="text-lg sm:text-base text-center md:text-start">
              Registra tus datos y un agente se contactará contigo
            </p>
            <form onSubmit={sendRequest} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="customerFirstName"
                  value={formData.customerFirstName}
                  onChange={handleChange}
                  placeholder="Primer nombre"
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg placeholder:text-white focus:outline-none w-full"
                />
                <input
                  type="text"
                  name="customerLastName"
                  value={formData.customerLastName}
                  onChange={handleChange}
                  placeholder="Primer apellido"
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg placeholder:text-white focus:outline-none w-full"
                />
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg placeholder:text-white focus:outline-none w-full"
                />
                <input
                  type="tel"
                  name="customerPhoneNumber"
                  value={formData.customerPhoneNumber}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg placeholder:text-white focus:outline-none w-full"
                />
                <select
                  name="requestManufacturer"
                  value={formData.requestManufacturer}
                  onChange={handleChange}
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg focus:outline-none w-full"
                >
                  <option className="text-black" value="">
                    Selecciona una marca
                  </option>
                  {Object.keys(carData).map((brand) => (
                    <option className="text-black" key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <select
                  name="requestModel"
                  value={formData.requestModel}
                  onChange={handleChange}
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg focus:outline-none w-full"
                  disabled={!formData.requestManufacturer}
                >
                  <option className="text-black" value="">
                    Selecciona un modelo
                  </option>
                  {formData.requestManufacturer &&
                    carData[formData.requestManufacturer].map((model) => (
                      <option className="text-black" key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#286181] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:text-black transition duration-300 mt-4"
              >
                Cotizar ahora<span className="ml-2"></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MainPage;
