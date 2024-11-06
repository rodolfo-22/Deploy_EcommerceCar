import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCarService from "../../hooks/useCarService";
import useImageStore from "../../hooks/useImageStore";
import Swal from "sweetalert2";

const AddCarForm = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]); // Archivos seleccionados
  const navigate = useNavigate();
  const { addCar, error } = useCarService();
  const { uploadImages, loading, error: imageError } = useImageStore();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Subir las imágenes seleccionadas y obtener las URLs
    const uploadedUrls = await uploadImages(selectedFiles);
    console.log("uploadedUrls", uploadedUrls);
    if (imageError || !uploadedUrls.length) {
      Swal.fire("Error", imageError || "Error al subir las imágenes", "error");
      return;
    }

    const newCar = {
      manufacturer,
      model,
      year,
      price,
      fuel,
      description: uploadedUrls,
      type,
      stock,
      //images: uploadedUrls,
    };

    try {
      await addCar(newCar);
      Swal.fire("Éxito", "Vehículo agregado correctamente", "success");
      navigate("/admin"); // Redirige de vuelta a la página del administrador
    } catch {
      Swal.fire("Error", error || "Error al agregar el vehículo", "error");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files); // Guardar los archivos seleccionados
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">
            Empresa fabricante del vehiculo
          </label>
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Modelo del vehiculo</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Año del vehiculo</label>
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
          <label className="block text-sm">
            Que tipo de combustible ocupa?
          </label>
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
            Agrega mas detalles del vehiculo
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">
            Tipo: sedan, camioneta, pickup, camion
          </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">
            Cauntas unidades hay disponibles
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Imágenes</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange} // Cambiar el valor de archivos seleccionados
            className="border w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Subiendo imágenes..." : "Agregar Vehículo"}
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
