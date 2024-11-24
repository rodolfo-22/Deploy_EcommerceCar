import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCarForm = ({ cars, updateCar }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((car) => car.id === parseInt(id));

  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);
  const [fuel, setFuel] = useState(car.fuel);
  const [images, setImages] = useState(car.images);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCar = {
      ...car,
      model,
      year,
      price,
      fuel,
      images,
    };
    updateCar(updatedCar);
    navigate("/admin"); // Redirige a la página de administrador después de editar
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Vehículo</h2>
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
            type="text"
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
            value={images.join(",")}
            onChange={(e) => setImages(e.target.value.split(","))}
            className="border w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Actualizar Vehículo
        </button>
      </form>
    </div>
  );
};

export default EditCarForm;
