import { useDispatch, useSelector } from 'react-redux';
import { EcommerApi } from '../api';
import {  onChecking, onLogin, onLogout } from '../store';
import jwtDecode from "jwt-decode";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
        const { data } = await EcommerApi.post('/users/login', { email, password });

        // Almacena el token y la fecha de inicio
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        // Guarda el nombre del usuario en localStorage
        const username = jwtDecode(data.token).username || data.user.username;
        localStorage.setItem('username', username);

        // Guarda datos adicionales (como el nombre y rol del usuario) si no están en el token
        const decodedToken = jwtDecode(data.token);

        // Incluye el rol en el dispatch
        dispatch(onLogin({
            name: username,
            uid: jwtDecode(data.token)._id || data.user._id,
            role: jwtDecode(data.token).role || data.user.role,
        }));
        // Retorna un estado de éxito
        return { success: true };
    } catch (error) {
        // Manejar el error sin mostrarlo en la consola
        console.error("Error en el inicio de sesión:", error.response?.data?.message || "Error desconocido");

        // Llamar a onLogout para resetear el estado en caso de error
        dispatch(onLogout());
        
        // Retorna el mensaje de error para manejarlo en la vista
        return { success: false, message: "Credenciales incorrectas" };
    }
    }

    const startRegister = async ({ username, email, password, role }) => {
        try {
            const { data } = await EcommerApi.post('/users/register', { 
                username, email, password, role
                });

            // Verifica si el registro fue exitoso
            if (data && data._id) {
                return { success: true, message: 'Usuario registrado exitosamente' };
            } else {
                throw new Error('Registro fallido');
            }
        } catch (error) {
        console.error('Error en el registro:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || 'Error en el registro';
        return { success: false, message: errorMessage }; 
        }
    };

const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
        const { data } = await EcommerApi.get('auth/renew');
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        
        // Incluye el rol aquí
        dispatch(onLogin({ name: data.name, uid: data.uid, role: data.role }));
    } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        
    }
};

//alternativa
const initAuth = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
        dispatch(onLogout());
        return;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Verifica si el token ha expirado
        if (decodedToken.exp < currentTime) {
            dispatch(onLogout());
        } else {
            // Token válido: Inicializa la sesión
            dispatch(onLogin({
                name: username || "Usuario", // Usa el nombre del localStorage
                uid: decodedToken._id,
                role: decodedToken.role,
            }));
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        dispatch(onLogout());
    }
};



    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        startLogin,
        startRegister,
        startLogout,
        initAuth,
        }

}