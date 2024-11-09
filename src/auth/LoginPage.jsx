import React, { useEffect } from "react";
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

  const loginSubmit = async (event) => {
    event.preventDefault();

    // Llamamos a startLogin y capturamos el resultado
    const result = await startLogin({
      email: loginEmail,
      password: loginPassword,
    });

    if (!result.success) {
      // Mostrar mensaje de error con SweetAlert solo si falló
      Swal.fire("Error en la autenticación", result.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Inicia sesión</h2>
        <form onSubmit={loginSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
