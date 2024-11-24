import React, { useState } from "react";
import { useAuthStore, useForm } from "../hooks";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const Login = () => {
  const { startLogin } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const [showModal, setShowModal] = useState(false); // Estado para el modal

  const loginSubmit = async (event) => {
    event.preventDefault();

    const result = await startLogin({
      email: loginEmail,
      password: loginPassword,
    });

    if (!result.success) {
      Swal.fire("Error en la autenticación", result.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Contenedor del logo y título */}
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-68 h-20" />
        <h2 className="text-2xl text-white font-bold mt-2">CARCONNECT</h2>
      </div>

      {/* Contenedor principal */}
      <div className="bg-gray-500 text-black rounded-xl p-8 shadow-md w-full max-w-sm">
        <h2 className="text-2xl text-white font-bold mb-2">Iniciar sesión</h2>
        <form onSubmit={loginSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*************"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
              required
            />
          </div>
          <div className="mb-2 text-right">
            <button
              type="button"
              onClick={() => setShowModal(true)} // Abre el modal
              className="text-white text-sm hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div>
            <button
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setShowModal(false)} // Cierra el modal
              className="absolute top-2 right-2 text-black font-bold"
            >
              ✖
            </button>
            <div className="flex flex-col items-center">
              <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
              <p className="text-center text-gray-800">
                Si olvidaste tu contraseña, por favor contacta al administrador
                del sistema lo más pronto posible para ayudarte a recuperarla.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
