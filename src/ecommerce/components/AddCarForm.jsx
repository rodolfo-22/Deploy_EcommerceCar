import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCarForm = ({ addCar }) => {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      id: Date.now(), // Genera un ID temporal
      model,
      year,
      price,
      fuel,
      images,
    };
    addCar(newCar);
    navigate("/admin"); // Redirige de vuelta a la página del administrador
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Modelo</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Año</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Combustible</label>
          <input
            type="text"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">
            Imágenes (URLs separadas por comas)
          </label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value.split(","))}
            className="border w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Agregar Vehículo
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
