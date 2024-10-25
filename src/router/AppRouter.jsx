import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import MainPage from "../ecommerce/pages/MainPage";
import CarDetail from "../ecommerce/components/CarDetail";
import AdminPage from "../ecommerce/pages/AdminPage";
import AddCarForm from "../ecommerce/components/AddCarForm";
import EditCarForm from "../ecommerce/components/EditCarForm";


const AppRouter = ({ user, setUser, setCars }) => {
  const [cars] = useState([
    {
      id: 1,
      model: "Toyota RAV4",
      price: "$12,000",
      year: "2018",
      fuel: "Gasoline",
      images: [
        "/toyota.jpg",
        "/toyota2.jpg",
        "/toyota3.jpg",
        "/toyota4.jpg",
        "/toyota5.jpg",
      ],
    },
    {
      id: 2,
      model: "Honda Civic",
      price: "$15,000",
      year: "2019",
      fuel: "Diesel",
      images: ["/civic.jpg", "/civic2.jpg", "/civic3.jpg", "/civic4.jpg"],
    },
    {
      id: 3,
      model: "Toyota RAV4",
      price: "$12,000",
      year: "2018",
      fuel: "Gasoline",
      images: [
        "/toyota.jpg",
        "/toyota2.jpg",
        "/toyota3.jpg",
        "/toyota4.jpg",
        "/toyota5.jpg",
      ],
    },
    {
      id: 4,
      model: "Honda Civic",
      price: "$15,000",
      year: "2019",
      fuel: "Diesel",
      images: ["/civic.jpg", "/civic2.jpg", "/civic3.jpg", "/civic4.jpg"],
    },
    {
      id: 5,
      model: "Toyota RAV4",
      price: "$12,000",
      year: "2018",
      fuel: "Gasoline",
      images: [
        "/toyota.jpg",
        "/toyota2.jpg",
        "/toyota3.jpg",
        "/toyota4.jpg",
        "/toyota5.jpg",
      ],
    },
    {
      id: 6,
      model: "Honda Civic",
      price: "$15,000",
      year: "2019",
      fuel: "Diesel",
      images: ["/civic.jpg", "/civic2.jpg", "/civic3.jpg", "/civic4.jpg"],
    },
    {
      id: 7,
      model: "Toyota RAV4",
      price: "$12,000",
      year: "2018",
      fuel: "Gasoline",
      images: [
        "/toyota.jpg",
        "/toyota2.jpg",
        "/toyota3.jpg",
        "/toyota4.jpg",
        "/toyota5.jpg",
      ],
    },
    {
      id: 8,
      model: "Honda Civic",
      price: "$15,000",
      year: "2019",
      fuel: "Diesel",
      images: ["/civic.jpg", "/civic2.jpg", "/civic3.jpg", "/civic4.jpg"],
    },
    {
      id: 9,
      model: "Toyota RAV4",
      price: "$12,000",
      year: "2018",
      fuel: "Gasoline",
      images: [
        "/toyota.jpg",
        "/toyota2.jpg",
        "/toyota3.jpg",
        "/toyota4.jpg",
        "/toyota5.jpg",
      ],
    },
    {
      id: 10,
      model: "Honda Civic",
      price: "$15,000",
      year: "2019",
      fuel: "Diesel",
      images: ["/civic.jpg", "/civic2.jpg", "/civic3.jpg", "/civic4.jpg"],
    },
    {
      id: 11,
      model: "Toyota RAV4",
      price: "$12,000",
      year: "2018",
      fuel: "Gasoline",
      images: [
        "/toyota.jpg",
        "/toyota2.jpg",
        "/toyota3.jpg",
        "/toyota4.jpg",
        "/toyota5.jpg",
      ],
    },
    {
      id: 12,
      model: "Honda Civic",
      price: "$15,000",
      year: "2019",
      fuel: "Diesel",
      images: ["/civic.jpg", "/civic2.jpg", "/civic3.jpg", "/civic4.jpg"],
    },
  ]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<MainPage cars={cars} />} />
      <Route path="/car/:id" element={<CarDetail cars={cars} />} />

      {/* Ruta del administrador donde puede gestionar autos */}
      <Route
        path="/admin"
        element={<AdminPage cars={cars} setCars={setCars} />}
      />

      {/* Ruta para agregar un nuevo auto */}
      <Route
        path="/admin/add-car"
        element={<AddCarForm addCar={(newCar) => setCars([...cars, newCar])} />}
      />

      {/* Ruta para editar un auto existente */}
      <Route
        path="/edit-car/:id"
        element={
          <EditCarForm
            cars={cars}
            updateCar={(updatedCar) => {
              setCars(
                cars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
              );
            }}
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
