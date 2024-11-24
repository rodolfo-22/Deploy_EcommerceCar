import React, { useState, useEffect } from "react";
import EmployeeModal from "./EmployeeForm";
import { useEmployees, useBranchService, useAuthStore } from "../../../hooks";
import Swal from "sweetalert2";


const EmployeesMain = () => {
  const { startRegister } = useAuthStore();
  const { employees, getAllEmployees, deleteUser, updateUser } = useEmployees();
  const {
    branchs,
    loading: branchLoading,
    error: branchError,
  } = useBranchService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleEmployeeSubmit = async (data) => {
    const result = selectedEmployee
      ? await updateUser(selectedEmployee._id, data)
      : await startRegister(data);

    if (result.success) {
      await getAllEmployees();
      refreshEmployees();
    }
    return result;
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedEmployee(null); // Reinicia el estado del empleado seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  const refreshEmployees = () => {
    if (selectedBranch) {
      const filtered = employees.filter(
        (employee) => employee.branchId === selectedBranch
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees); // Muestra todos los empleados si no se selecciona sucursal
    }
  };

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);

    if (branchId) {
      const filtered = employees.filter(
        (employee) => employee.branchId === branchId
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees); // Muestra todos los empleados
    }
  };

const deleteEmploye = async (id) => {
  const confirmation = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará al empleado permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (confirmation.isConfirmed) {
    try {
      await deleteUser(id); // Elimina el empleado
      await getAllEmployees(); // Recarga la lista completa de empleados
      refreshEmployees(); // Actualiza los empleados filtrados

      Swal.fire({
        icon: "success",
        title: "Empleado eliminado",
        confirmButtonText: "Aceptar",
      });
    } catch (err) {
      console.error("Error al eliminar el empleado:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar al empleado",
        confirmButtonText: "Aceptar",
      });
    }
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllEmployees(); // Carga todos los empleados
      } catch (err) {
        console.error("Error al cargar empleados:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    refreshEmployees();
  }, [employees, selectedBranch]);

  if (branchError) return <div>Error al cargar sucursales: {branchError}</div>;

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Gestionar empleados
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
              onChange={handleBranchChange}
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
            onClick={handleAddClick}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Agregar Empleado
          </button>
        </div>

        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left text-gray-500">
              <th className="px-4 py-2 font-semibold">Nombre</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Código</th>
              <th className="px-4 py-2 font-semibold flex justify-center items-center space-x-2">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr
                  key={employee._id}
                  className="border-b border-gray-200 text-gray-800"
                >
                  <td className="px-4 py-2">{employee.username}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee._id}</td>
                  <td className="px-4 py-2 flex justify-center items-center space-x-2">
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No hay empleados disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmployeeSubmit}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeesMain;
