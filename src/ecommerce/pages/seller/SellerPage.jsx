import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VehiclesByBranch, CheckQuote } from "../../components";
import { useAuthStore } from "../../../hooks";
import profileImage from "../../../assets/profile.png";

const AdminPage = () => {
  const { startLogout, user } = useAuthStore();
  const [selectedComponent, setSelectedComponent] = useState(1); 

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
              <Link to="/vendedor" className="block py-2 text-xl">
                Revisar cotizaciones
              </Link>
            </div>
            <div onClick={() => setSelectedComponent(2)}>
              <Link to="#" className="block py-2 text-xl">
                Tablas de cuotas
              </Link>
            </div>
            <div onClick={() => setSelectedComponent(3)}>
              <Link to="#" className="block py-2 text-xl">
                Vehiculos por sucursal
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
        {selectedComponent === 1 && <CheckQuote />}
        {selectedComponent === 2 && <div>Asistir cotizaciones</div>}
        {selectedComponent === 3 && <VehiclesByBranch />}
      </div>
    </div>
  );
};

export default AdminPage;
