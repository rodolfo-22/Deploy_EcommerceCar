// hooks/useCarService.js
import { useState } from "react";
import { EcommerApi } from "../api"; 

const useCarService = () => {
    const [error, setError] = useState(null);

    const addCar = async (carData) => {
        try {
            const response = await EcommerApi.post("/products", carData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Error al agregar el vehículo");
            throw err;
        }
    };

    return {
        addCar,
        error
    };
};

export default useCarService;
