import { useState, useEffect } from "react";
import { EcommerApi } from "../api";

export const useLoanService = () => {
  const [amortizationData, setAmortizationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateAmortization = async (amortizationParams) => {
    setLoading(true);
    try {
      const response = await EcommerApi.post("/amortization/calcular", amortizationParams);
      setAmortizationData(Array.isArray(response.data) ? response.data : []);
      setError(null); // Limpia cualquier error previo
    } catch (error) {
      setError(error.response?.data?.message || "Error al calcular la amortización");
      setAmortizationData([]); // Establece amortizationData como un arreglo vacío en caso de error
    } finally {
      setLoading(false); // Asegúrate de que loading se establece en false al final
    }
  };

  useEffect(() => {
    // Puedes agregar lógica aquí si deseas cargar datos automáticamente
  }, []);

  return {
    amortizationData,
    loading,
    error,
    calculateAmortization,
  };
};
