import React, { useState } from "react";
import {
  mdiTable,
  mdiFileSearch,
  mdiCar,
  mdiLogout,
  mdiFileEdit,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import {
  VehiclesByBranch,
  CheckQuote,
  LoanMain,
  AgreementMain,
} from "../../components";
import { useAuthStore } from "../../../hooks";
import profileImage from "../../../assets/seller1.jpg";

const AdminPage = () => {
  const { startLogout, user } = useAuthStore();
  const [selectedComponent, setSelectedComponent] = useState(1); 

    return (
      <div className="flex h-screen font-sans">
        {/* Sidebar */}
        <div className="bg-gray-950 text-white p-4 w-1/6 flex flex-col justify-between items-center">
          {/* Información del usuario */}
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-center mt-5">
              <img
                className="h-auto w-auto rounded-lg dark:shadow-gray-800"
                src={profileImage}
                alt="profile"
              />
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-2xl font-semibold text-center">
                {user?.name || "Usuario"}
              </p>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="w-full flex flex-col items-center mt-10 space-y-5">
            <div
              onClick={() => setSelectedComponent(1)}
              className="text-center w-full"
            >
              <Link
                to="/vendedor"
                className="flex items-center justify-center gap-3 py-2 text-xl w-full"
              >
                <Icon path={mdiFileSearch} size={1.5} className="text-center" />
                Revisar cotizaciones
              </Link>
            </div>
            <div
              onClick={() => setSelectedComponent(2)}
              className="text-center w-full"
            >
              <Link
                to="#"
                className="flex items-center justify-center gap-3 py-2 text-xl w-full"
              >
                <Icon path={mdiTable} size={1.5} className="text-center" />
                Tablas de cuotas
              </Link>
            </div>
            <div
              onClick={() => setSelectedComponent(3)}
              className="text-center w-full"
            >
              <Link
                to="#"
                className="flex items-center justify-center gap-3 py-2 text-xl w-full"
              >
                <Icon path={mdiCar} size={1.5} />
                Vehículos sucursal
              </Link>
            </div>
            <div
              onClick={() => setSelectedComponent(4)}
              className="text-center w-full"
            >
              <Link
                to="#"
                className="flex items-center justify-center gap-3 py-2 text-xl w-full"
              >
                <Icon path={mdiFileEdit} size={1.5} />
                Contrato
              </Link>
            </div>
          </div>

          {/* Botón de cerrar sesión */}
          <div className="mt-auto w-full">
            <button
              onClick={startLogout}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3"
            >
              <Icon path={mdiLogout} size={1.5} />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-5/6 overflow-y-auto">
          {selectedComponent === 1 && <CheckQuote />}
          {selectedComponent === 2 && <LoanMain />}
          {selectedComponent === 3 && <VehiclesByBranch />}
          {selectedComponent === 4 && <AgreementMain />}
        </div>
      </div>
    );
};

export default AdminPage;
