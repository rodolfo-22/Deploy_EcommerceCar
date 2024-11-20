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
        setLoading(true); // Indicamos que está cargando
        try {
            const response = await EcommerApi.get("/products");
            setCars(response.data || []); // Establece los carros en el estado
            return response.data; // Devuelve los datos por si necesitas usarlos
        } catch (error) {
            setError(error.response?.data?.message || "Error al obtener los carros");
            setCars([]); // Vacía el estado en caso de error
            throw error; // Lanza el error
        } finally {
            setLoading(false); // Finaliza la carga
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
        setLoading(true); // Indicamos que está cargando
        try {
            const response = await EcommerApi.get(`/stores/${branchId}`);
            return response; // Devuelve los datos de la sucursal
        } catch (error) {
            setError(error.response?.data?.message || "Error al obtener los vehículos de la sucursal");
            throw error;
        } finally {
            setLoading(false); // Finaliza la carga
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

    useEffect(() => {
        // Llama a getAllCars cuando se monta el hook
        (async () => {
            await getAllCars(); // Carga los carros al montar el hook
        })();
    }, []);


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
