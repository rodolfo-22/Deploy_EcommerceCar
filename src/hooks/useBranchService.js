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
    // Elimina valores nulos o no definidos
    const filteredData = Object.fromEntries(
      Object.entries(branchData).filter(([_, value]) => value != null)
    );

    // Asegúrate de enviar solo identificadores de empleados y vehículos
    if (filteredData.employees) {
      filteredData.employees = filteredData.employees.map((employee) => employee._id);
    }
    if (filteredData.vehicles) {
      filteredData.vehicles = filteredData.vehicles.map((vehicle) => vehicle._id);
    }

    const response = await EcommerApi.post("/stores", filteredData);
    return { success: true, data: response.data };
  } catch (error) {
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

  // Asegúrate de enviar solo identificadores de empleados y vehículos
  if (filteredData.employees) {
    filteredData.employees = filteredData.employees.map((employee) => employee._id);
  }
  if (filteredData.vehicles) {
    filteredData.vehicles = filteredData.vehicles.map((vehicle) => vehicle._id);
  }


  try {
    const response = await EcommerApi.put(`/stores/${branchId}`, filteredData);
    return { success: true, data: response.data };
  } catch (error) {
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
