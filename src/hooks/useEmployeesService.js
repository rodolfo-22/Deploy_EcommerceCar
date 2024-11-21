import { useState, useEffect } from "react";
import { EcommerApi } from "../api";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await EcommerApi.get("/users");
      setEmployees(Array.isArray(response.data) ? response.data : []);
      setError(null); // Limpia cualquier error previo
    } catch (error) {
      setError(error.response?.data?.message || "Error al obtener los empleados");
      setEmployees([]); // Establece employees como un arreglo vacío en caso de error
    } finally {
      setLoading(false); // Asegúrate de que loading se establece en false al final
    }
  };

const updateUser = async (id, userData) => {
  try {
    const response = await EcommerApi.put(`/users/${id}`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error desconocido" };
  }
};


const deleteUser = async (id) => {
  try {
    const response = await EcommerApi.delete(`/users/${id}`);
    return response.data; // Devuelve un mensaje de éxito si es necesario
  } catch (error) {
    throw error; // Lanza el error para manejarlo en el lugar donde se llame
  }
};


  useEffect(() => {
    getAllEmployees(); // Llama al método al montar el componente
  }, []);

  return {
    employees,
    loading,
    error,
    getAllEmployees,
    updateUser,
    deleteUser,
  };
};
