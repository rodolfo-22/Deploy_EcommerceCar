import { useDispatch, useSelector } from 'react-redux';
import { EcommerApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';


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

        // Incluye el rol en el dispatch
        dispatch(onLogin({
            name: data.user.username, // o data.user.name si usas nombre en lugar de username
            uid: data.user._id,
            role: data.user.role
        }));
        // Retorna un estado de éxito
        return { success: true };
    } catch (error) {
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
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
        }

}