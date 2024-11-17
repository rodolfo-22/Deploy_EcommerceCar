import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;
//`${apiUrl}/request`

const postRequest = async (data) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/requests', // URL de la API
            JSON.stringify(data), // Convertir objeto a JSON
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        // Manejo de errores HTTP
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || 'Error desconocido';

            switch (status) {
                case 400:
                    console.error('Solicitud incorrecta:', message);
                    break;
                case 401:
                    console.error('No autorizado:', message);
                    break;
                case 403:
                    console.error('Prohibido:', message);
                    break;
                case 404:
                    console.error('Recurso no encontrado:', message);
                    break;
                case 500:
                    console.error('Error interno del servidor:', message);
                    break;
                default:
                    console.error(`Error ${status || 'desconocido'}:`, message);
            }

            return { error: true, message };

        } else {
            // Errores fuera de Axios
            console.error('Error inesperado:', error.message);
            return { error: true, message: error.message };
        }
    }
}

export default postRequest;
