import { EcommerApi } from "../api";

export const useQuoteService = () => {
  const getAllQuotes = async () => {
    try {
      const response = await EcommerApi.get("/requests");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al obtener las cotizaciones peticion ");
    }
  };

const getQuotesByBranch = async (branchId) => {
  try {
    const response = await EcommerApi.get(`/requests/requestsByStore/${branchId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      // Devuelve un array vacío para manejar la ausencia de datos
      return [];
    }
    throw new Error(
      error.response?.data?.message || "Error al obtener las cotizaciones por sucursal"
    );
  }
};

const deleteQuote = async (quoteId) => {
  try {
    const response = await EcommerApi.delete(`/requests/${quoteId}`);
    return response.status; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar la cotización."
    );
  }
};


  return {
    getAllQuotes,
    getQuotesByBranch,
    deleteQuote,
  };
};
