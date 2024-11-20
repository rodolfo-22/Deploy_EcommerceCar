import React, { useState } from "react";
import BranchModal from "./BranchForm";
import { useBranchService } from "../../../hooks";

const BranchMain = () => {
  const { branchs, loading, error, getAllBranchs, createBranch } = useBranchService();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBranchSubmit = async (data) => {
    const result = await createBranch(data);
    if (result.success) {
      await getAllBranchs(); // Recarga los empleados tras un registro exitoso
    }
    return result; // Devuelve el resultado para manejar mensajes en el modal
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar sucursaels
        </h2>

        {/* Sección de selección de sucursal y botón de agregar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="sucursal" className="font-semibold">
              Empleados asignados a la sucursal:
            </label>
          </div>
          {/* Botón para abrir el modal para agregar */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Agregar Sucursal
          </button>
        </div>

        {/* Seccion de la tabla mostrar empleados */}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left text-gray-500">
              <th className="px-4 py-2 font-semibold">Nombre</th>
              <th className="px-4 py-2 font-semibold">Direccion</th>
              <th className="px-4 py-2 font-semibold">Telefono</th>
              <th className="px-4 py-2 font-semibold">Correo electronico</th>
              <th className="px-4 py-2 font-semibold">Empleados</th>
              <th className="px-4 py-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {branchs.map((branch) => (
              <tr
                key={branch._id}
                className="border-b border-gray-200 text-gray-800"
              >
                <td className="px-4 py-2">{branch.name}</td>
                <td className="px-4 py-2">{branch.address}</td>
                <td className="px-4 py-2">{branch.phoneNumber}</td>
                <td className="px-4 py-2">{branch.email}</td>
                <td className="px-4 py-2">
                  {branch.employees && branch.employees.length > 0 ? (
                    <ul>
                      {branch.employees.map((employee) => (
                        <li key={employee._id}>{employee.username}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No hay empleados</span>
                  )}
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => console.log("Editar empleado", employee._id)}
                    className="text-blue-500 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() =>
                      console.log("Eliminar empleado", employee._id)
                    }
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

      {/* Modal */}

      <BranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBranchSubmit} // Pasa la función al modal
      />
    </div>
  );
};

export default BranchMain;
