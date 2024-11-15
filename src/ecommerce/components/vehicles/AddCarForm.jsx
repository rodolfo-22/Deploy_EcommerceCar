import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarService, useImageStore } from "../../../hooks";
import Swal from "sweetalert2";

const AddCarForm = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mileage, setMileage] = useState("");
  const [status, setStatus] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [vinCode, setVinCode] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [numberOfDoors, setNumberOfDoors] = useState("");
  const [color, setColor] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]); // Archivos seleccionados
  const [engine, setEngine] = useState("");

  const navigate = useNavigate();
  const { addCar, error } = useCarService();
  const { uploadImages, loading, error: imageError } = useImageStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Subir las imágenes seleccionadas y obtener las URLs
    const uploadedUrls = await uploadImages(selectedFiles);
    console.log("uploadedUrls", uploadedUrls); // Verifica que las URLs de las imágenes sean correctas
    if (imageError || !uploadedUrls.length) {
      Swal.fire("Error", imageError || "Error al subir las imágenes", "error");
      return;
    }

  const newCar = {
    manufacturer: manufacturer || "Toyota",
    model: model || "Corolla",
    engine: engine || "2.0L",
    year: year || "2022",
    price: price || "20000",
    description: description || "Vehículo en excelente estado",
    type: type || "Sedán",
    stock: stock || "5",
    transmission: transmission || "Automática",
    mileage: mileage || "0",
    status: status || "Nuevo",
    fuelType: fuelType || "Gasolina",
    vinCode: vinCode || "1G1RC6E42BU52N485",
    driveTrain: driveTrain || "traccion delantera",
    numberOfDoors: numberOfDoors || "4",
    color: color || "Negro",
    seatingCapacity: seatingCapacity || "5",
    image: uploadedUrls,
  };

    try {
      await addCar(newCar);
      Swal.fire("Éxito", "Vehículo agregado correctamente", "success");
      navigate("/admin");
    } catch {
      Swal.fire("Error", error || "Error al agregar el vehículo", "error");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

return (
  <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border-4 border-gray-300 ">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
      Agregar Nuevo Vehículo
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Seleccione la sucursal */}
        <div className="md:col-span-3">
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
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Empresa fabricante del vehículo
          </label>
          <input
            type="text"
            placeholder="Toyota"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Modelo del vehículo
          </label>
          <input
            type="text"
            placeholder="Corolla"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Año del vehículo
          </label>
          <input
            type="number"
            placeholder="2022"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600">
            Descripción
          </label>
          <textarea
            placeholder="Vehículo en excelente estado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="2" // Ajuste de altura para que sea más compacto
          ></textarea>
        </div>

        {/* Imágenes */}
        <div className="md:col-span-1">
          <label className="block text-sm font-semibold text-gray-600">
            Imágenes (Formato permitido JPG, PNG, SVG)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Precio
          </label>
          <input
            type="number"
            placeholder="20000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Tipo de combustible
          </label>
          <input
            type="text"
            placeholder="Gasolina"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Motor (engine)
          </label>
          <input
            type="text"
            placeholder="2.0L"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Tipo (sedán, camioneta, etc.)
          </label>
          <input
            type="text"
            placeholder="Sedán"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Unidades en stock
          </label>
          <input
            type="number"
            placeholder="5"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Transmisión
          </label>
          <input
            type="text"
            placeholder="Automática"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Kilometraje
          </label>
          <input
            type="number"
            placeholder="0"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Estado
          </label>
          <input
            type="text"
            placeholder="Nuevo"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Código VIN
          </label>
          <input
            type="text"
            placeholder="1G1RC6E42BU52N485"
            value={vinCode}
            onChange={(e) => setVinCode(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Tren de tracción
          </label>
          <input
            type="text"
            placeholder="traccion delantera"
            value={driveTrain}
            onChange={(e) => setDriveTrain(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Número de puertas
          </label>
          <input
            type="number"
            placeholder="4"
            value={numberOfDoors}
            onChange={(e) => setNumberOfDoors(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Color
          </label>
          <input
            type="text"
            placeholder="Negro"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Capacidad de asientos
          </label>
          <input
            type="number"
            placeholder="5"
            value={seatingCapacity}
            onChange={(e) => setSeatingCapacity(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Subiendo imágenes..." : "Agregar Vehículo"}
        </button>
      </div>
    </form>
  </div>
);

};

export default AddCarForm;
