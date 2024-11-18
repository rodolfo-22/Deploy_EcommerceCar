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

  return {
    getAllQuotes,
  };
};
