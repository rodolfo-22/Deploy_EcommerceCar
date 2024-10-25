import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarListAdmin from "./CarListAdmin";
import AddCarForm from "../components/AddCarForm";
import EditCarForm from "../components/EditCarForm";

const AdminPage = ({ cars, setCars }) => {
  const deleteCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Panel de Administración</h2>
      <Link
        to="/admin/add-car"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4 inline-block"
      >
        Agregar Nuevo Vehículo
      </Link>
      <CarListAdmin cars={cars} deleteCar={deleteCar} />
    </div>
  );
};

export default AdminPage;
