import { useState, useEffect } from "react";
import { EcommerApi } from "../api"; 

export const useCarService = () => {
    const [cars, setCars] = useState([]);// Inicializamos como arreglo vacío
    const [loading, setLoading] = useState(true);
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

    const getAllCars = async () => {
        setLoading(true);
        try {
            const response = await EcommerApi.get("/products");
            setCars(Array.isArray(response.data) ? response.data : []); // Asegura que cars sea un arreglo
            setError(null); // Limpia cualquier error previo
        } catch (error) {
            setError(error.response?.data?.message || "Error al obtener los carros");
            setCars([]); // Establece cars como un arreglo vacío en caso de error
        } finally {
            setLoading(false); // Asegúrate de que loading se establece en false al final
        }
    };

    const getCarById = async (id) => {
        try {
            const response = await EcommerApi.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || "Error al obtener el carro por ID");
            throw error;
        }
    };

    const getCarsByBranch = async (branchId) => {
        try {
            const response = await EcommerApi.get(`/stores/${branchId}`);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const deleteCarById = async (id) => {
        try {
            await EcommerApi.delete(`/products/${id}`);
            setCars(cars.filter(car => car._id !== id)); // Actualiza el estado después de eliminar
        } catch (error) {
            setError(error.response?.data?.message || "Error al eliminar el carro");
            throw error;
        }
    };

    const updateCarById = async (id, updatedData) => {
        try {
            const response = await EcommerApi.put(`/products/${id}`, updatedData);
            // Actualiza el estado del carro modificado
            setCars((prevCars) =>
            prevCars.map((car) => (car._id === id ? response.data : car))
            );
            return response.data;
        } catch (error) {
                throw error.response?.data?.message || "Error al actualizar el vehículo";
        }
    };

    // Efecto para cargar todos los carros automáticamente cuando se monta el hook
    useEffect(() => {
        // Llama a getAllCars cuando se monta el hook
        getAllCars();
    }, []); // Deja el array vacío para que solo se ejecute al montar


    return {
        cars,
        loading,
        error,
        addCar,
        getAllCars,
        getCarById,
        getCarsByBranch,
        deleteCarById,
        updateCarById,
    };
};
