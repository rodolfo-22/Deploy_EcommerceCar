import { useState, useEffect } from "react";
import { EcommerApi } from "../api";

export const useBranchService = () => {
  const [branchs, setBranchs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllBranchs = async () => {
    setLoading(true);
    try {
      const response = await EcommerApi.get("/stores");
      setBranchs(Array.isArray(response.data) ? response.data : []);
      setError(null); // Limpia cualquier error previo
    } catch (error) {
      setError(error.response?.data?.message || "Error al obtener los empleados");
      setBranchs([]); // Establece branchs como un arreglo vacío en caso de error
    } finally {
      setLoading(false); // Asegúrate de que loading se establece en false al final
    }
  };

  const createBranch = async (branchData) => {
  try {
    const response = await EcommerApi.post("/stores", branchData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error al crear la sucursal",
    };
  }
};



  useEffect(() => {
    getAllBranchs(); // Llama al método al montar el componente
  }, []);

return {
  branchs,
  loading,
  error,
  getAllBranchs,
  createBranch, 
};

};
