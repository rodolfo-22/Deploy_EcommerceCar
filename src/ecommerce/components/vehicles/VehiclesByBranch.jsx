import React, { useState, useEffect } from "react";
import { useCarService, useBranchService } from "../../../hooks";

const VehiclesByBranch = () => {
  const {
    branchs,
    loading: branchLoading,
    error: branchError,
  } = useBranchService();
  const { getCarsByBranch } = useCarService();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [cars, setCars] = useState([]);
  const [carLoading, setCarLoading] = useState(false);
  const [carError, setCarError] = useState(null);

  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);

    if (branchId) {
      setCarLoading(true);
      try {
        const response = await getCarsByBranch(branchId);
        setCars(response.data.vehicles || []);
        setCarError(null);
      } catch (error) {
        setCarError("Error al obtener los vehículos");
        setCars([]);
      } finally {
        setCarLoading(false);
      }
    } else {
      setCars([]);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar Vehiculos
        </h2>

        {/* Selección de sucursal */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="sucursal" className="font-semibold">
              Seleccione la sucursal:
            </label>
            <select
              id="sucursal"
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBranch}
              onChange={handleBranchChange}
            >
              <option value="">Seleccionar</option>
              {branchLoading ? (
                <option>Cargando sucursales...</option>
              ) : branchError ? (
                <option>Error al cargar sucursales</option>
              ) : (
                branchs.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Tabla de vehículos */}
        {carLoading ? (
          <p>Cargando vehículos...</p>
        ) : carError ? (
          <p className="text-red-500">{carError}</p>
        ) : cars.length === 0 ? (
          <p>No hay vehículos en esta sucursal, prueba con otra.</p>
        ) : (
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left text-gray-500">
                <th className="px-4 py-2 font-semibold">Fabricante</th>
                <th className="px-4 py-2 font-semibold">Modelo</th>
                <th className="px-4 py-2 font-semibold">Color</th>
                <th className="px-4 py-2 font-semibold">caja</th>
                <th className="px-4 py-2 font-semibold">Año</th>
                <th className="px-4 py-2 font-semibold">Precio</th>
                <th className="px-4 py-2 font-semibold">Inventario</th>
                <th className="px-4 py-2 font-semibold">Estado</th>
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
                  <td className="px-4 py-2">{car.color}</td>
                  <td className="px-4 py-2">{car.transmission}</td>
                  <td className="px-4 py-2">{car.year}</td>
                  <td className="px-4 py-2">{car.price}</td>
                  <td className="px-4 py-2">{car.stock}</td>
                  <td className="px-4 py-2">{car.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VehiclesByBranch;
