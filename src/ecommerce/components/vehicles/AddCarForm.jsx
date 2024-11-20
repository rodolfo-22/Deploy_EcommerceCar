import React, { useEffect, useState } from "react";
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

  const { addCar, updateCarById, error } = useCarService();
  const { uploadImages, loading, error: imageError } = useImageStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Opciones de fabricantes y modelos
  const manufacturers = ["Toyota", "Honda", "Hyundai", "Kia"];
  const models = {
    Toyota: ["Corolla", "Camry", "RAV4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Hyundai: ["Elantra", "Sonata", "Tucson"],
    Kia: ["Soul", "Picanto", "Sportage"],
  };

    const [selectedManufacturer, setSelectedManufacturer] = useState("");

  useEffect(() => {
    if (car) {
      Object.keys(car).forEach((key) => setValue(key, car[key]));
    } else {
      reset();
    }
  }, [car, setValue, reset]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    // Subir las imágenes seleccionadas
    setIsSubmitting(true);
    try {
      // Subir imágenes si se proporcionaron
      const uploadedUrls = data.images?.length
        ? await uploadImages(data.images)
        : car?.image || []; // Usa imágenes existentes si no hay nuevas

      if (imageError || (!uploadedUrls.length && !car)) {
        Swal.fire(
          "Error",
          imageError || "Debe subir al menos una imagen",
          "error"
        );
        return;
      }

      const newCar = { ...data, image: uploadedUrls };

      let savedCar;
      if (car) {
        savedCar = await updateCarById(car._id, newCar);
        Swal.fire("Éxito", "Vehículo actualizado correctamente", "success");
      } else {
        savedCar = await addCar(newCar);
        Swal.fire("Éxito", "Vehículo agregado correctamente", "success");
      }

      onSave(savedCar); // Emitir el vehículo actualizado
      onClose(); // Cerrar modal
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al guardar el vehículo", "error");
    } finally {
      setIsSubmitting(false);
      reset(); // Limpia el formulario después de guardar
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full border-4 border-gray-300"
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
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
            <select
              {...register("manufacturer", {
                required: "Este campo es obligatorio",
              })}
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
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
            <select
              {...register("model", { required: "Este campo es obligatorio" })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              {selectedManufacturer &&
                models[selectedManufacturer].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
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
            <select
              {...register("fuelType", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diésel">Diésel</option>
            </select>
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
            <select
              {...register("type", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="Sedán">Sedán</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV (Sport Utility Vehicle)</option>
              <option value="Coupé">Coupé</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Todoterreno">Todoterreno</option>
              <option value="Pickup">Pickup</option>
            </select>
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
            <select
              {...register("transmission", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="Automatica">Automatica</option>
              <option value="Manual">Manual</option>
            </select>
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
            <select
              {...register("status", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </select>
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
            <select
              {...register("driveTrain", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="Delantera">Delantera</option>
              <option value="Trasera">Trasera</option>
              <option value="4x4">4x4</option>
            </select>
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
            <select
              {...register("numberOfDoors", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
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
            <select
              {...register("seatingCapacity", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
            {errors.seatingCapacity && (
              <span className="text-red-500 text-sm">
                {errors.seatingCapacity.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Alcance: rango de combustible
            </label>
            <input
              type="text"
              placeholder="20 km por galón"
              {...register("fuelRange", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fuelRange && (
              <span className="text-red-500 text-sm">
                {errors.fuelRange.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Peso del vehiculo en Kilogramos
            </label>
            <input
              type="text"
              placeholder="150 kg"
              {...register("weight", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.weight && (
              <span className="text-red-500 text-sm">
                {errors.weight.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Longitud en centimetros
            </label>
            <input
              type="text"
              placeholder="360 cm"
              {...register("wheel_length", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.wheel_length && (
              <span className="text-red-500 text-sm">
                {errors.wheel_length.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Aceleracion
            </label>
            <input
              type="text"
              placeholder="0-50 mph en 10s"
              {...register("aceleration", {
                required: "Este campo es obligatorio",
              })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.aceleration && (
              <span className="text-red-500 text-sm">
                {errors.aceleration.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Guardando..."
              : car
              ? "Guardar Cambios"
              : "Agregar Vehículo"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
