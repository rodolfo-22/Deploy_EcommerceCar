import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CombinedBranchModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  cars,
  employees,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

useEffect(() => {
  if (initialData && Object.keys(initialData).length > 0) {
    reset(initialData); // Pre-carga los datos en el formulario
    setSelectedCars(initialData.vehicles || []);
    setSelectedEmployees(initialData.employees || []); // Objetos completos
  } else {
    // Limpia el formulario para crear una nueva sucursal
    reset({
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
    });
    setSelectedCars([]);
    setSelectedEmployees([]);
  }
}, [initialData, reset]);

  const handleCarChange = (car) => {
    setSelectedCars(
      (prev) =>
        prev.some((c) => c._id === car._id)
          ? prev.filter((c) => c._id !== car._id) // Elimina si ya existe
          : [...prev, car] // Agrega el objeto completo
    );
  };

  const handleEmployeeChange = (employee) => {
    setSelectedEmployees(
      (prev) =>
      prev.some((e) => e._id === employee._id)
        ? prev.filter((e) => e._id !== employee._id)
        : [...prev, employee]
    );
  };


const onSubmitForm = async (data) => {
  if (!data.name || !data.address || !data.phoneNumber || !data.email) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Todos los campos son obligatorios",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  const formattedData = {
    ...data,
    phoneNumber: data.phoneNumber.toString(),
    vehicles: selectedCars, // Objetos completos
    employees: selectedEmployees, // Objetos completos
  };

  const result = await onSubmit(formattedData);

  if (result?.success || result === undefined) {
    Swal.fire({
      icon: "success",
      title: "Sucursal guardada exitosamente",
      confirmButtonText: "Aceptar",
    });
    reset();
    onClose();
  } else {
    Swal.fire({
      icon: "error",
      title: "Error al guardar sucursal",
      text: result?.message || "Ocurrió un error inesperado",
      confirmButtonText: "Aceptar",
    });
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300 relative"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {initialData ? "Editar Sucursal" : "Agregar Nueva Sucursal"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="grid grid-cols-2 gap-8"
        >
          {/* Primera fila: Nombre y Dirección */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-600">
              Nombre
            </label>
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              placeholder="Sucursal Escalón"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-600">
              Dirección
            </label>
            <input
              type="text"
              {...register("address", {
                required: "La dirección es obligatoria",
              })}
              placeholder="6ta avenida sur #12"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Segunda fila: Teléfono y Correo Electrónico */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-600">
              Teléfono
            </label>
            <input
              type="number"
              {...register("phoneNumber", {
                required: "El número de teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]{8}$/,
                  message: "Debe ser un número de 8 dígitos",
                },
              })}
              placeholder="22405232"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-600">
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido",
                },
              })}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Tercera fila: Vehículos disponibles y Empleados disponibles */}
          <div
            className="col-span-1 overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            <h4 className="text-md font-semibold mb-2">
              Vehículos disponibles:
            </h4>
            {cars.length > 0 ? (
              cars.map((car) => (
                <label key={car._id || car.id} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCars.some((c) => c._id === car._id)}
                    onChange={() => handleCarChange(car)}
                    className="mr-2"
                  />
                  {car.model} - Año: {car.year} - Precio: ${car.price || "N/A"}
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No hay vehículos disponibles
              </p>
            )}
          </div>
          <div
            className="col-span-1 overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            <h4 className="text-md font-semibold mb-2">
              Empleados disponibles:
            </h4>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <label key={employee._id || employee.id} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.some(
                      (e) => e._id === employee._id
                    )}
                    onChange={() => handleEmployeeChange(employee)}
                    className="mr-2"
                  />
                  {employee.username}
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No hay empleados disponibles
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {initialData ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CombinedBranchModal;
