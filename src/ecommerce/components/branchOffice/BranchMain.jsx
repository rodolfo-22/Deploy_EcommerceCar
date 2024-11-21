import React, { useState } from "react";
import CombinedBranchModal from "./BranchForm"; 
import { useBranchService, useCarService, useEmployees } from "../../../hooks";
import Swal from "sweetalert2";

const BranchMain = () => {
  const { branchs, getAllBranchs, createBranch, updateBranch, deleteBranch } =
    useBranchService();
  const { cars: allCars, getAllCars } = useCarService();
  const { employees: allEmployees, getAllEmployees } = useEmployees();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

const handleOpenModal = async (branch = null) => {
  await getAllCars(); // Asegúrate de tener la lista de vehículos
  await getAllEmployees(); // Asegúrate de tener la lista de empleados

  if (!branch) {
    setSelectedBranch(null); // Limpia el estado para una nueva sucursal
  } else {
    setSelectedBranch(branch); // Carga los datos existentes
  }

  setIsModalOpen(true);
};



const handleBranchSubmit = async (data) => {
  const result = selectedBranch
    ? await updateBranch(selectedBranch._id, data) // Datos completos
    : await createBranch(data);

  if (result?.success) {
    await getAllBranchs();
    Swal.fire({
      icon: "success",
      title: "Operación exitosa",
      text: `Sucursal ${
        selectedBranch ? "actualizada" : "creada"
      } correctamente`,
      confirmButtonText: "Aceptar",
    });
    setIsModalOpen(false);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: result?.message || "No se pudo completar la operación",
      confirmButtonText: "Aceptar",
    });
  }
};


const handleDeleteBranch = async (branchId) => {
  const confirmation = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará la sucursal permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (confirmation.isConfirmed) {
    const result = await deleteBranch(branchId);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Sucursal eliminada",
        confirmButtonText: "Aceptar",
      });
      await getAllBranchs(); // Actualiza la lista
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message || "No se pudo eliminar la sucursal",
        confirmButtonText: "Aceptar",
      });
    }
  }
};


  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar sucursales
        </h2>

        {/* Botón para abrir el modal */}
        {/* Sección de selección de sucursal y botón de agregar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="sucursal" className="font-semibold">
              Sucursales disponibles:
            </label>
          </div>
          {/* Botón para abrir el modal para agregar */}
          <button
            onClick={() => handleOpenModal()}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Agregar Sucursal
          </button>
        </div>

        {/* Tabla de sucursales */}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left text-gray-500">
              <th className="px-4 py-2 font-semibold">Nombre</th>
              <th className="px-4 py-2 font-semibold">Dirección</th>
              <th className="px-4 py-2 font-semibold">Teléfono</th>
              <th className="px-4 py-2 font-semibold">Vehiculos</th>
              <th className="px-4 py-2 font-semibold">Empleados</th>
              <th className="px-4 py-2 font-semibold flex justify-center items-center space-x-2">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {branchs.length ? (
              branchs.map((branch) => (
                <tr
                  key={branch._id}
                  className="border-b border-gray-200 text-gray-800"
                >
                  <td className="px-4 py-2">{branch.name}</td>
                  <td className="px-4 py-2">{branch.address}</td>
                  <td className="px-4 py-2">{branch.phoneNumber}</td>
                  <td className="px-4 py-2">
                    {branch.vehicles?.length ? (
                      <ul>
                        {branch.vehicles.map((vehicle) => (
                          <li key={vehicle._id}>
                            {vehicle.model}, {vehicle.year}
                          </li> // Asegúrate de que "model" existe en el objeto
                        ))}
                      </ul>
                    ) : (
                      "No hay vehículos"
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {branch.employees?.length ? (
                      <ul>
                        {branch.employees.map((employee) => (
                          <li key={employee._id}>{employee.username}</li>
                        ))}
                      </ul>
                    ) : (
                      "No hay empleados"
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(branch)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteBranch(branch._id)}
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
                  No hay sucursales disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal combinado */}
      <CombinedBranchModal
        isOpen={isModalOpen}
        initialData={selectedBranch}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBranchSubmit}
        cars={allCars}
        employees={allEmployees}
      />
    </div>
  );
};

export default BranchMain;
