import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BranchForm = ({ isOpen, onClose, onSubmit }) => {
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
        title: "sucursal registrada exitosamente",
        confirmButtonText: "Aceptar",
      });
      reset(); // Reinicia los campos del formulario
      onClose(); // Cierra el modal
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al registrar sucursal",
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
          Agregar Nuevo sucursal
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Nombre
            </label>
            <input
              type="text"
              placeholder="sucursal Escalon"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Campo dirrecion */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Dirrecion
            </label>
            <input
              type="text"
              placeholder="6ta avenida sur #12"
              {...register("address", {
                required: "La direccion es obligatorio",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Campo dirrecion */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Numero telefonico
            </label>
            <input
              type="number"
              placeholder="22405232"
              {...register("phoneNumber", {
                required: "El numero de telefono es obligatorio",
                minLength: {
                  value: 8,
                  message: "El numero de telefono deber ser valido",
                },
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
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

          {/* Botón de envío */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Crear sucursal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;
