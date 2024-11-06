import React, { useState } from "react";
import { useAuthStore } from "../../../hooks";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const { startRegister } = useAuthStore();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await startRegister(form);

    // Muestra mensajes 
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Usuario creado exitosamente",
        confirmButtonText: "Aceptar",
      });
            // Restablece el formulario a los valores iniciales
      setForm({
        username: "",
        email: "",
        password: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al crear el usuario",
        text: result.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Nueva cuenta
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
