import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderLogin, VehiclesMain } from "../../components";
import { useAuthStore } from "../../../hooks"; 
import { useCarService } from "../../../hooks";
import profileImage from "../../../assets/profile.png";

const AdminPage = () => {
  const { cars, loading, error, deleteCarById, getAllCars } = useCarService();
  const { startLogout, user } = useAuthStore();
  const [selectedComponent, setSelectedComponent] = useState(1);

  // Función para sincronizar los carros después de cualquier operación
  const refreshCars = async () => {
    try {
      await getAllCars(); // Refresca los datos globales del hook
    } catch (err) {
      console.error("Error al actualizar los vehículos:", err);
    }
  };

    useEffect(() => {
      refreshCars(); // Cargar los datos iniciales
    }, []);

  const deleteCar = async (id) => {
    try {
      await deleteCarById(id);
      refreshCars(); // Refresca la lista después de eliminar
    } catch (err) {
      console.error("Error al eliminar el vehículo:", err);
    }
  };

  if (loading) return <div>Cargando vehículos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-950 text-white p-4 w-1/6 flex flex-col justify-between">
        {/* Información del usuario */}
        <div>
          <div className="flex justify-center m-10">
            <img
              className="h-auto w-auto rounded-lg dark:shadow-gray-800"
              src={profileImage}
              alt="image description"
            ></img>
          </div>
          <div className="flex justify-center">
            <p className="text-3xl">{user?.name || "Usuario"}</p>
          </div>
          {/* Enlaces de navegación */}
          <div className="flex flex-col mt-10 space-y-5">
            <div onClick={() => setSelectedComponent(1)}>
              <Link to="/admin" className="block py-2 text-xl">
                Gestionar vehículos
              </Link>
            </div>
            <div onClick={() => setSelectedComponent(2)}>
              <Link to="#" className="block py-2 text-xl">
                Administrar empleados
              </Link>
            </div>
            <div onClick={() => setSelectedComponent(3)}>
              <Link to="#" className="block py-2 text-xl">
                Sucursales de venta
              </Link>
            </div>
            <div onClick={() => setSelectedComponent(4)}>
              <Link to="#" className="block py-2 text-xl">
                Asistir cotizaciones
              </Link>
            </div>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="mt-auto">
          <button
            onClick={startLogout}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-5/6 overflow-y-auto">
        {selectedComponent === 1 && (
          <VehiclesMain
            cars={cars}
            deleteCar={deleteCar}
            refreshCars={refreshCars}
          />
        )}
        {selectedComponent === 2 && <div>Administrar empleados</div>}
        {selectedComponent === 3 && <div>Sucursales de venta</div>}
        {selectedComponent === 4 && <div>Asistir cotizaciones</div>}
      </div>
    </div>
  );

};

export default AdminPage;