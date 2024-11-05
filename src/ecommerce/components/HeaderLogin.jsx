import React from "react";
import { useAuthStore } from "../../hooks";

const Header = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-2xl">Mi Aplicación</h1>
      <div className="flex items-center">
        <p className="mr-4">Hola, {user?.name}</p>
        <button
          onClick={startLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
