import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { CardView, Footer, Header, Carousel } from "../components";
import { useCarService } from "../../hooks";
import bgImage from "../../assets/bg-request.png";
import postRequest from '../../services/requestService'
import Swal from 'sweetalert2'

const MainPage = () => {

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
        text: `Hubo un problema al enviar la solicitud: ${result.error}`,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Datos enviados con éxito. Nos pondremos en contacto contigo a la brevedad posible.',
      });
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Header />
      <Carousel />

      {/* Sección "El carro perfecto para ti" */}
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

      {/* Manejo de carga y error */}
      {loading && (
        <div className="text-center text-lg text-gray-400 mt-8">
          Cargando vehículos...
        </div>
      )}
      {error && (
        <div className="text-center text-lg text-red-500 mt-8">{error}</div>
      )}

      {/* Sección de Vehículos */}
      {!loading && !error && (
        <section aria-labelledby="our-vehicles" className="my-12">
          <div className="flex justify-center items-center">
            <h2
              id="our-vehicles"
              className="text-5xl font-raleway font-bold text-[#00BCD4] py-4 px-6 inline-flex items-center"
            >
              <FaCar className="mr-4" size={36} /> Nuestra Selección
            </h2>
          </div>

        )}
        {/* Mensaje si no hay vehículos disponibles */}
        {!loading && !error && cars.length === 0 && (
          <div className="text-center text-lg text-gray-400 mt-8">
            No hay vehículos disponibles.
          </div>
        )}
      </section>

      <section className="bg-cover py-64 px-8 flex justify-end" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="flex flex-col">
          <div className="mb-8 max-w-xl mx-auto">
            <p className="text-4xl font-bold text-white leading-snug text-start drop-shadow-lg">Soluciones personalizadas, atención impecable y vehículos que se ajustan a tus necesidades y estilo de vida.</p>
          </div>
          <div className="p-8 bg-opacity-60 bg-[#525252] rounded-lg max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-start">Cotiza tu vehículo</h2>
            <p className="text-lg">
              No dudes en adquirir el auto de tus sueños. Para cotizarlo, ingresa tus datos:
            </p>
            <form onSubmit={sendRequest} className="max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 py-8 gap-6">
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
                  placeholder="Primer apellido"
                  value={formData.customerLastName}
                  onChange={handleChange}
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
                {/* Select para marcas */}
                <select
                  name="requestManufacturer"
                  value={formData.requestManufacturer}
                  onChange={handleChange}
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg focus:outline-none w-full"
                >
                  <option className="text-black" value="">Selecciona una marca</option>
                  {Object.keys(carData).map((brand) => (
                    <option className="text-black" key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {/* Select para modelos dependiente de la marca */}
                <select
                  name="requestModel"
                  value={formData.requestModel}
                  onChange={handleChange}
                  className="bg-[#525252] bg-opacity-0 border text-white p-4 rounded-lg focus:outline-none w-full"
                  disabled={!formData.requestManufacturer} // Deshabilitar si no hay marca seleccionada
                >
                  <option className="bg-[#525252] bg-opacity-0 text-black" value="">Selecciona un modelo</option>
                  {formData.requestManufacturer &&
                    carData[formData.requestManufacturer].map((model) => (
                      <option className="text-black" key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>

              <button type="submit" className="w-full bg-[#121212] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 hover:text-black transition duration-300 mt-4">
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
