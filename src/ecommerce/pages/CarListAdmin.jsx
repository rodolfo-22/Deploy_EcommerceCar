import React from "react";
import { Link } from "react-router-dom";

const CarListAdmin = ({ cars, deleteCar }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Vehículos</h2>
      <table className="w-full border-collapse bg-white shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Modelo</th>
            <th className="border px-4 py-2">Año</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="text-center">
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.year}</td>
              <td className="border px-4 py-2">{car.price}</td>
              <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                <Link
                  to={`/edit-car/${car.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteCar(car.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarListAdmin;
