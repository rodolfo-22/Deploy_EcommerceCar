import React, { useState, useEffect } from "react";
import { useCarService, useBranchService } from "../../../hooks";
import AddCarForm from "./AddCarForm";
import Swal from "sweetalert2";


const VehiclesMain = () => {
  const {
    branchs,
    loading: branchLoading,
    error: branchError,
  } = useBranchService();
  const {
    loading: carLoading,
    error: carError,
    getCarsByBranch,
    deleteCarById,
    getAllCars,
  } = useCarService();
  const [cars, setCars] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

const refreshCars = async () => {
  try {
    if (selectedBranch) {
      const response = await getCarsByBranch(selectedBranch);
      setCars(response?.data?.vehicles || []); // Actualiza el estado con vehículos de la sucursal
    } else {
      const response = await getAllCars();
      setCars(response || []); // Asegúrate de que sea un arreglo
    }
  } catch (err) {
    console.error("Error al actualizar los vehículos:", err);
    setCars([]); // Limpia el estado si ocurre un error
  }
};


const deleteCar = async (id) => {
  const confirmation = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el vehículo permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (confirmation.isConfirmed) {
    try {
      await deleteCarById(id);
      Swal.fire({
        icon: "success",
        title: "Vehículo eliminado",
        confirmButtonText: "Aceptar",
      });
      refreshCars();
    } catch (err) {
      console.error("Error al eliminar el vehículo:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el vehículo",
        confirmButtonText: "Aceptar",
      });
    }
  }
};


  useEffect(() => {
    refreshCars(); // Carga inicial de datos
  }, [selectedBranch]);

if (branchError) return <div>Error al cargar sucursales: {branchError}</div>;
if (carError) return <div>Error al cargar vehículos: {carError}</div>;

  const openModal = (car = null) => {
    setCurrentCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentCar(null);
    setShowModal(false);
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar vehículos
        </h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="sucursal" className="font-semibold">
              Seleccione la sucursal:
            </label>
            <select
              id="sucursal"
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">Todas las sucursales</option>
              {branchLoading ? (
                <option>Cargando sucursales...</option>
              ) : branchError ? (
                <option>Error al cargar sucursales</option>
              ) : Array.isArray(branchs) && branchs.length > 0 ? (
                branchs.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))
              ) : (
                <option>No hay sucursales disponibles</option>
              )}
            </select>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Agregar vehículo
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <AddCarForm
                car={currentCar}
                onClose={closeModal}
                onSave={async () => {
                  await refreshCars();
                  closeModal();
                }}
              />
            </div>
          </div>
        )}

        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left text-gray-500">
              <th className="px-4 py-2 font-semibold">Fabricante</th>
              <th className="px-4 py-2 font-semibold">Modelo</th>
              <th className="px-4 py-2 font-semibold">Motor</th>
              <th className="px-4 py-2 font-semibold">Transmision</th>
              <th className="px-4 py-2 font-semibold">Año</th>
              <th className="px-4 py-2 font-semibold">Estado</th>
              <th className="px-4 py-2 font-semibold flex justify-center items-center space-x-2">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cars) && cars.length > 0 ? (
              cars.map((car) => (
                <tr
                  key={car._id}
                  className="border-b border-gray-200 text-gray-800"
                >
                  <td className="px-4 py-2">{car.manufacturer}</td>
                  <td className="px-4 py-2">{car.model}</td>
                  <td className="px-4 py-2">{car.engine}</td>
                  <td className="px-4 py-2">{car.transmission}</td>
                  <td className="px-4 py-2">{car.year}</td>
                  <td className="px-4 py-2">{car.status}</td>
                  <td className="px-4 py-2 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => openModal(car)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteCar(car._id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No hay vehículos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesMain;
