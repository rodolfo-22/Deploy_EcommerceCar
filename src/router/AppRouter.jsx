import { useAuthStore } from "../hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "../auth/LoginPage";
import { MainPage, AdminPage, RegisterPage, SellerPage } from "../ecommerce/pages";
import { CarDetail, EditCarForm } from "../ecommerce/components";
import { HashLoader } from "react-spinners";

const AppRouter = ({ setUser }) => {
  const { status, user, checkAuthToken } = useAuthStore();

  // Verificar token al cargar la aplicacións
  useEffect(() => {
    checkAuthToken();
  }, []);


if (status === "checking") {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <HashLoader color="#36d7b7" size={50} />
    </div>
  );
}


  return (
    <Routes>
      {status === "not-authenticated" ? (
        // Rutas públicas,
        <>
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/car/:id" element={<CarDetail />} />
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
                element={<AdminPage />}
              />
              <Route path="/admin/register" element={<RegisterPage />} />
              <Route
                path="/admin/edit-car/:id"
                element={
                  <EditCarForm
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
