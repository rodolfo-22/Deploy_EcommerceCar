import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCarService, useImageStore } from "../../../hooks";
import Swal from "sweetalert2";

const AddCarForm = ({ car, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (car) {
      // Prellenar el formulario con los datos del vehículo a editar
      Object.keys(car).forEach((key) => setValue(key, car[key]));
    } else {
      reset(); // Limpia el formulario para un nuevo registro
    }
  }, [car, setValue, reset]);

  const { addCar, updateCarById, error } = useCarService();
  const { uploadImages, loading, error: imageError } = useImageStore();

  const onSubmit = async (data) => {
    // Subir las imágenes seleccionadas
    const uploadedUrls = data.images?.length
      ? await uploadImages(data.images)
      : car?.image || []; // Usa imágenes existentes si no se suben nuevas

    if (imageError || (!uploadedUrls.length && !car)) {
      Swal.fire(
        "Error",
        imageError || "Debe subir al menos una imagen",
        "error"
      );
      return;
    }

    const newCar = { ...data, image: uploadedUrls };

    try {
      let savedCar;
      if (car) {
        // Actualiza un vehículo existente
        savedCar = await updateCarById(car._id, newCar);
        Swal.fire("Éxito", "Vehículo actualizado correctamente", "success");
      } else {
        // Agrega un nuevo vehículo
        savedCar = await addCar(newCar);
        Swal.fire("Éxito", "Vehículo agregado correctamente", "success");
      }

      onSave(savedCar); // Actualiza la lista de vehículos
      onClose(); // Cierra el modal
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al guardar el vehículo", "error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border-4 border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        {car ? "Editar Vehículo" : "Agregar Nuevo Vehículo"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campos del formulario */}
          {/* Seleccione la sucursal */}
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-600">
              Seleccione la sucursal
            </label>
            <select
              id="sucursal"
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              {/* Agrega opciones aquí */}
            </select>
          </div>
          <div></div>
          <div></div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Empresa fabricante del vehículo
            </label>
            <input
              type="text"
              placeholder="Toyota"
              {...register("manufacturer", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.manufacturer && (
              <span className="text-red-500 text-sm">
                {errors.manufacturer.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Modelo del vehículo
            </label>
            <input
              type="text"
              placeholder="Corolla"
              {...register("model", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.model && (
              <span className="text-red-500 text-sm">
                {errors.model.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Año del vehículo
            </label>
            <input
              type="number"
              placeholder="2022"
              {...register("year", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.year && (
              <span className="text-red-500 text-sm">
                {errors.year.message}
              </span>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-600">
              Descripción
            </label>
            <textarea
              placeholder="Vehículo en excelente estado"
              {...register("description", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="2"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Imágenes (Formato permitido JPG, PNG, SVG)
            </label>
            <input
              type="file"
              multiple
              {...register("images")}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Precio
            </label>
            <input
              type="number"
              placeholder="20000"
              {...register("price", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Tipo de combustible
            </label>
            <input
              type="text"
              placeholder="Gasolina"
              {...register("fuelType", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fuelType && (
              <span className="text-red-500 text-sm">
                {errors.fuelType.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Motor (engine)
            </label>
            <input
              type="text"
              placeholder="2.0L"
              {...register("engine", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.engine && (
              <span className="text-red-500 text-sm">
                {errors.engine.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Tipo de carroceria
            </label>
            <input
              type="text"
              placeholder="sedán, Hatchback, SUV, etc."
              {...register("type", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Unidades en stock
            </label>
            <input
              type="number"
              placeholder="10"
              {...register("stock", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.stock && (
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Tipo de transmisión
            </label>
            <input
              type="text"
              placeholder="Automática, Manual"
              {...register("transmission", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.transmission && (
              <span className="text-red-500 text-sm">
                {errors.transmission.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Kilometraje
            </label>
            <input
              type="number"
              placeholder="0"
              {...register("mileage", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mileage && (
              <span className="text-red-500 text-sm">
                {errors.mileage.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Estado
            </label>
            <input
              type="text"
              placeholder="Nuevo, Usado"
              {...register("status", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.status && (
              <span className="text-red-500 text-sm">
                {errors.status.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Código VIN
            </label>
            <input
              type="text"
              placeholder="1HGCM82633A404352"
              {...register("vinCode", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.vinCode && (
              <span className="text-red-500 text-sm">
                {errors.vinCode.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Tren de tracción
            </label>
            <input
              type="text"
              placeholder="delantera, trasera, 4x4"
              {...register("driveTrain", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.driveTrain && (
              <span className="text-red-500 text-sm">
                {errors.driveTrain.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Número de puertas
            </label>
            <input
              type="number"
              placeholder="4"
              {...register("numberOfDoors", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.numberOfDoors && (
              <span className="text-red-500 text-sm">
                {errors.numberOfDoors.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Color
            </label>
            <input
              type="text"
              placeholder="Negro"
              {...register("color", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.color && (
              <span className="text-red-500 text-sm">
                {errors.color.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Capacidad de asientos
            </label>
            <input
              type="number"
              placeholder="5"
              {...register("seatingCapacity", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.seatingCapacity && (
              <span className="text-red-500 text-sm">
                {errors.seatingCapacity.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading
              ? "Guardando..."
              : car
              ? "Guardar Cambios"
              : "Agregar Vehículo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
