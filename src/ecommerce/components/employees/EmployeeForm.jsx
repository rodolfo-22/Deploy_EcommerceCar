import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Empleado registrado exitosamente",
        confirmButtonText: "Aceptar",
      });
      reset(); // Reinicia los campos del formulario
      onClose(); // Cierra el modal
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al registrar empleado",
        text: result.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full border-4 border-gray-300"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Agregar Nuevo Empleado
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Pedro Páramo"
              {...register("username", {
                required: "El nombre es obligatorio",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Botón de envío */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Agregar Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
