import { useState, useEffect } from "react";
import { EcommerApi } from "../api";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllEmployees = async () => {
    setLoading(true);
    try {
      const response = await EcommerApi.get("/employees");
      setEmployees(Array.isArray(response.data) ? response.data : []);
      setError(null); // Limpia cualquier error previo
    } catch (error) {
      setError(error.response?.data?.message || "Error al obtener los empleados");
      setEmployees([]); // Establece employees como un arreglo vacío en caso de error
    } finally {
      setLoading(false); // Asegúrate de que loading se establece en false al final
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
  };
};
