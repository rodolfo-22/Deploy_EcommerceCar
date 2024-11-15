import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCarForm from "./AddCarForm";

const VehiclesMain = ({ cars, deleteCar }) => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white ">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar vehiculos
        </h2>

        {/* Sección de selección de sucursal y botón de agregar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="sucursal" className="font-semibold">
              Seleccione la sucursal:
            </label>
            <select
              id="sucursal"
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              {/* Agrega opciones de sucursales aquí */}
            </select>
          </div>
          {/* Sección del modal para gregar carros */}
          <button
            onClick={openModal}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Agregar vehículo
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
                <AddCarForm />
              </div>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">Vehículos por Sucursal</h2>
        {/* Sección de selección de sucursal y botón de agregar */}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left text-gray-500">
              <th className="px-4 py-2 font-semibold">Fabricante</th>
              <th className="px-4 py-2 font-semibold">Modelo de vehículo</th>
              <th className="px-4 py-2 font-semibold">Año</th>
              <th className="px-4 py-2 font-semibold">Estado</th>
              <th className="px-4 py-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr
                key={car._id}
                className="border-b border-gray-200 text-gray-800"
              >
                <td className="px-4 py-2">{car.manufacturer}</td>
                <td className="px-4 py-2">{car.model}</td>
                <td className="px-4 py-2">{car.year}</td>
                <td className="px-4 py-2">{car.status}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Link
                    to={`/edit-car/${car._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => deleteCar(car._id)}
                    className="text-red-500 hover:underline"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default VehiclesMain;
