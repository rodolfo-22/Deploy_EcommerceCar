import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const LoanForm = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = async (data) => {
    await onSubmit(data); // Llama al servicio
    reset();
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full border-4 border-gray-300"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear Amortización
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Precio
            </label>
            <input
              type="number"
              {...register("precio", { required: "El precio es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.precio && (
              <span className="text-red-500">{errors.precio.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Tasa Anual
            </label>
            <input
              type="number"
              {...register("tasaAnual", { required: "La tasa es obligatoria" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.tasaAnual && (
              <span className="text-red-500">{errors.tasaAnual.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Enganche
            </label>
            <input
              type="number"
              {...register("enganche", {
                required: "El enganche es obligatorio",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.enganche && (
              <span className="text-red-500">{errors.enganche.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Plazo (meses)
            </label>
            <input
              type="number"
              {...register("plazo", { required: "El plazo es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.plazo && (
              <span className="text-red-500">{errors.plazo.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Seguro Anual
            </label>
            <input
              type="number"
              {...register("seguroAnual", {
                required: "El seguro es obligatorio",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.seguroAnual && (
              <span className="text-red-500">{errors.seguroAnual.message}</span>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md"
            >
              Crear amortización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
