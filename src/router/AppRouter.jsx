import { useAuthStore } from "../hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import { MainPage, AdminPage, SellerPage } from "../ecommerce/pages";
import { CarDetail, AddCarForm, EditCarForm } from "../ecommerce/components";
import { HashLoader } from "react-spinners";

const AppRouter = ({ setUser, setCars }) => {
  {
    /*} 
  const { status, user, checkAuthToken } = useAuthStore();

  // Verificar token al cargar la aplicacións
  useEffect(() => {
    checkAuthToken();
  }, []);
*/
  }

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
  {
    /*}
if (status === "checking") {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <HashLoader color="#36d7b7" size={50} />
    </div>
  );
}
*/
  }

  // Simula que el usuario ya está autenticado
  const status = "not-authenticated"; // Cambia a "authenticated" para saltarte el login not-authenticated
  const user = { role: "admin" }; // Simula un rol de usuario, como "admin" o "user"

  return (
    <Routes>
      {status === "not-authenticated" ? (
        // Rutas públicas, 
        <>
          <Route path="/" element={<MainPage cars={cars} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/car/:id" element={<CarDetail cars={cars} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          {/* Ruta para usuarios autenticados */}

          {/* Rutas para usuario con rol "user" */}
          {user.role === "user" ? (
            <>
              <Route path="/vendedor" element={<SellerPage />} />
              <Route path="*" element={<Navigate to="/vendedor" />} />
            </>
          ) : null}

          {/* Rutas para administrador */}
          {user.role === "admin" ? (
            <>
              <Route
                path="/admin"
                element={<AdminPage cars={cars} setCars={setCars} />}
              />
              <Route
                path="/admin/add-car"
                element={
                  <AddCarForm addCar={(newCar) => setCars([...cars, newCar])} />
                }
              />
              <Route
                path="/edit-car/:id"
                element={
                  <EditCarForm
                    cars={cars}
                    updateCar={(updatedCar) => {
                      setCars(
                        cars.map((car) =>
                          car.id === updatedCar.id ? updatedCar : car
                        )
                      );
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          ) : (
            // Si el usuario autenticado no tiene rol asignado
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
