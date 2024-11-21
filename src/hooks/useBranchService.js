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
    // Formatear los datos antes de enviar
    const formattedBranchData = {
      ...branchData,
      phoneNumber: branchData.phoneNumber.toString(), // Asegúrate de que sea string
    };

    const response = await EcommerApi.post("/stores", formattedBranchData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error en la solicitud POST:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al crear la sucursal",
    };
  }
};


const updateBranch = async (branchId, branchData) => {
  // Elimina valores nulos o no definidos
  const filteredData = Object.fromEntries(
    Object.entries(branchData).filter(([_, value]) => value != null)
  );

  // Asegúrate de eliminar duplicados en empleados y vehículos
  if (filteredData.employees) {
    filteredData.employees = [...new Set(filteredData.employees)];
  }
  if (filteredData.vehicles) {
    filteredData.vehicles = [...new Set(filteredData.vehicles)];
  }

  console.log("Datos enviados al backend:", filteredData); // Debugging

  try {
    const response = await EcommerApi.put(`/stores/${branchId}`, filteredData);
    console.log("Respuesta del servidor:", response.data); // Debugging
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error en el backend:", error.response?.data); // Debugging
    return {
      success: false,
      message: error.response?.data?.message || "Error al actualizar la sucursal",
    };
  }
};


  const deleteBranch = async (branchId) => {
    try {
      await EcommerApi.delete(`/stores/${branchId}`);
      // Actualiza la lista de sucursales después de eliminar
      setBranchs((prevBranchs) => prevBranchs.filter((branch) => branch._id !== branchId));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error al eliminar la sucursal",
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
  updateBranch, 
  deleteBranch,
};

};
