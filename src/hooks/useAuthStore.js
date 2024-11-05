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
    } catch (error) {
        dispatch(onLogout('Credenciales incorrectas'));
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 10);
        }
    }

    const startRegister = async ({ username, email, password }) => {
        dispatch(onChecking());
            console.log({ username, email, password }); // Verifica los datos antes de enviarlos
        try {
            const { data } = await EcommerApi.post('/users/register', { username, email, password });

            // Almacena el token y la fecha de inicio
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Incluye el rol en el dispatch
            dispatch(onLogin({
                name: data.user.username,
                uid: data.user._id,
                role: data.user.role
            }));
        } catch (error) {
                    console.error(error.response); // Verificar los detalles del error

            dispatch(onLogout(error.response?.data?.msg || 'Error en el registro'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 3000); // Mantén el mensaje de error visible por 3 segundos
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