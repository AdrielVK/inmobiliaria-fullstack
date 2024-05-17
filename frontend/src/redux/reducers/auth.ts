import { AuthActions,AuthTypes, AuthState } from "@/Interfaces/AuthInterfaces";


const initialState: AuthState ={
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    loading: false,
    user_loading: true,
    message: null,
    activated: false,
    reset_password: false,
};

const auth = (
    state = initialState,
    action: AuthActions
): AuthState => {
    const {type, payload} = action;


    switch (type) {
        
        case AuthTypes.REGISTER_PUBLISHER_SUCCESS:
            return{
                ...state,
                user:payload,
                message: {
                    text: "Cuenta Creada",
                    type: "success"
                },
            };
        case AuthTypes.REGISTER_PUBLISHER_FAIL:
            const errorMessageRegister =
            payload?.message ||
            payload?.email?.[0] ||
            payload?.name?.[0] ||
            payload?.password?.[0] ||
            payload?.re_password?.[0] ||
            payload?.description?.[0] ||
            payload?.disclaimer?.[0] ||
            "Error desconocido";
            return {
                ...state,
                user: null,
                message: {
                    text: errorMessageRegister,
                    type: "fail"
                }
            }
        case AuthTypes.DELETE_ACCOUNT_FAIL:
            return {
                ...state,
                message: {
                    text: "Cuenta eliminada",
                    type: "success"
                },
            };
        case AuthTypes.DELETE_ACCOUNT_SUCCESS:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                message: {
                    text: "Cuenta eliminada",
                    type: "success"
                },
                user: null,
                isAuthenticated: false,                
            }
        case AuthTypes.DELETE_ACCOUNT_FAIL:
            return{
                ...state,
                message: {
                    text: "Error al intentar eliminar la cuenta",
                    type: "fail"
                },
                
            }
        case AuthTypes.UPDATE_DEFAULT_USER_SUCCESS:
            return{
                ...state,
                user: payload,
                message:{
                    text: "Informacion actualizada con exito",
                    type: "success"
                }
            }
        case AuthTypes.UPDATE_DEFAULT_USER_FAIL:
            const messageUpdateUserFail = payload?.detail || "Actualizacion fallida";
            return{
                ...state,
                message:{
                    text: messageUpdateUserFail,
                    type: "fail"
                }
            }
        case AuthTypes.REMOVE_MESSAGE:
            return {
                ...state,
                message: null
            }
        
        case AuthTypes.ACTIVATION_SUCCESS:
            return{
                ...state,
                activated:true,
                message:{
                    text:"Cuenta Activada con exito",
                    type: "success"
                }
                //user: payload,
            }
        case AuthTypes.ACTIVATION_FAIL:

            const errorMessageActivate = payload?.detail || "Activacion Fallida"
            
            return {
                ...state ,
                activated: false,
                user: null,
                message: {
                    text:errorMessageActivate,
                    type: "fail"
                    }
            }
        case AuthTypes.REGISTER_SUCCESS:
            return {
                ...state,
                user:payload,
                message:{
                    text:"Cuenta creada con exito",
                    type: "success"
                } 
            }
        case AuthTypes.REGISTER_FAIL:
            const errorMessage =
            payload?.message ||
            payload?.email?.[0] ||
            payload?.name?.[0] ||
            payload?.password?.[0] ||
            payload?.re_password?.[0] ||
            "Error";
            return {
                ...state,
                user: null,
                message: {
                    text: errorMessage,
                    type: "fail"
                }
            }
        case AuthTypes.USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                user_loading: false
            };
            
        case AuthTypes.USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                user_loading: false
            }
        case AuthTypes.SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case AuthTypes.REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case AuthTypes.AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AuthTypes.AUTHENTICATED_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
            }
        case AuthTypes.LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh'),
                message:{
                    text: "Sesion iniciada",
                    type: "success"
                } 
            }
        case AuthTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: {
                    text: "El enlace para restaurar la contrasena fue enviado a su correo.",
                    type: "success"
                }
            }
        case AuthTypes.RESET_PASSWORD_FAIL:
            return {
                ...state,
                message: {
                    text: "Error al intentar cambiar contrasena. Revise el campo email",
                    type: "fail"
                }
            }
        case AuthTypes.RESET_PASSWORD_CONFIRM_SUCCESS:
            return {
                ...state,
                reset_password: true,
                message: {
                    text: "Cambio de contrasena exitoso",
                    type: "success"
                }
            }
        case AuthTypes.RESET_PASSWORD_CONFIRM_FAIL:
            const errorMessageResetPassword =
            payload?.message || "Cambio de contrasena fallido"

            return {
                ...state,
                reset_password: false,
                message: {
                    text: errorMessageResetPassword,
                    type: "fail"
                }
            }
        case AuthTypes.REMOVE_RESET_PASSWORD_FLAG:
            return {
                ...state,
                reset_password: false,
            }
        case AuthTypes.REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: localStorage.getItem('access')
            }
        case AuthTypes.LOGIN_FAIL:
            console.log(payload)

            const errorMessageLogin = payload?.detail || "error"

            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                message: {
                    text: errorMessageLogin,
                    type: "fail"
                } 
            }

        case AuthTypes.LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                message: {
                    text:"Sesion cerrada",
                    type: "success"
                }
            }
        case AuthTypes.REFRESH_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

export default auth;