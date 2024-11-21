import React, { useState } from "react";
import EmployeeModal from "./EmployeeForm";
import { useEmployees } from "../../../hooks";
import { useAuthStore } from "../../../hooks";

const EmployeesMain = () => {
    const { startRegister } = useAuthStore();
    const {
      employees,
      getAllEmployees,
      deleteUser,
      updateUser,
    } = useEmployees();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeSubmit = async (data) => {
    const result = selectedEmployee
      ? await updateUser(selectedEmployee._id, data)
      : await startRegister(data);

    if (result.success) {
      await getAllEmployees();
    }
    return result;
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const deleteEmploye = async (id) => {
    try {
      await deleteUser(id); // Asegúrate de que deleteUser no se auto-llama
      await getAllEmployees(); // Recarga los empleados tras eliminar
    } catch (err) {
      console.error("Error al eliminar el empleado:", err);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar empleados
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
          {/* Botón para abrir el modal para agregar */}
          <button
            onClick={handleAddClick}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Agregar Empleado
          </button>
        </div>

        {/* Seccion de la tabla mostrar empleados */}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left text-gray-500">
              <th className="px-4 py-2 font-semibold">Nombre</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Codigo de empleado</th>
              <th className="px-4 py-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-b border-gray-200 text-gray-800"
              >
                <td className="px-4 py-2">{employee.username}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee._id}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEditClick(employee)}
                    className="text-blue-500 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteEmploye(employee._id)}
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

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmployeeSubmit} // Asegúrate de pasar esta función
        employee={selectedEmployee}
      />
    </div>
  );

};

export default EmployeesMain;
