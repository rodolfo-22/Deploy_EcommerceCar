import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarService, useImageStore } from "../../hooks";
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
  <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
      Agregar Nuevo Vehículo
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Empresa fabricante del vehículo
          </label>
          <input
            type="text"
            placeholder="Toyota"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modelo del vehículo
          </label>
          <input
            type="text"
            placeholder="Corolla"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Año del vehículo
          </label>
          <input
            type="number"
            placeholder="2022"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            placeholder="20000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            placeholder="Vehículo en excelente estado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de combustible
          </label>
          <input
            type="text"
            placeholder="Gasolina"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Motor (engine)
          </label>
          <input
            type="text"
            placeholder="2.0L"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo (sedán, camioneta, etc.)
          </label>
          <input
            type="text"
            placeholder="Sedán"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unidades en stock
          </label>
          <input
            type="number"
            placeholder="5"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transmisión
          </label>
          <input
            type="text"
            placeholder="Automática"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kilometraje
          </label>
          <input
            type="number"
            placeholder="0"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <input
            type="text"
            placeholder="Nuevo"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Código VIN
          </label>
          <input
            type="text"
            placeholder="1G1RC6E42BU52N485"
            value={vinCode}
            onChange={(e) => setVinCode(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tren de tracción
          </label>
          <input
            type="text"
            placeholder="traccion delantera"
            value={driveTrain}
            onChange={(e) => setDriveTrain(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de puertas
          </label>
          <input
            type="number"
            placeholder="4"
            value={numberOfDoors}
            onChange={(e) => setNumberOfDoors(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            placeholder="Negro"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacidad de asientos
          </label>
          <input
            type="number"
            placeholder="5"
            value={seatingCapacity}
            onChange={(e) => setSeatingCapacity(e.target.value)}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Imágenes (Formato permitido JPG, PNG, SVG)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
