import { MessageActions } from "./MessagesInterfaces";
import { PostActions } from "./PostsInterfaces";


export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    is_active: boolean;
    is_staff: boolean;
    type:string;
    profile_picture?: File ;
    banner_picture?: File ;
    disclaimer?: string | null;
    phone_number?: string;
    description?: string;
    office?: string | null;
    
}


type message = {
    text: string;
    type: string;
}

export interface AuthState {
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean ;
    user: User | null;
    loading: boolean;
    user_loading: boolean;
    message: message | null;
    activated:boolean;
    reset_password: boolean;
}


export type RootAction = AuthActions | PostActions | MessageActions

export enum AuthTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS',
    USER_LOADED_FAIL = 'USER_LOADED_FAIL',
    AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS',
    AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL',
    REFRESH_SUCCESS = 'REFRESH_SUCCESS',
    REFRESH_FAIL = 'REFRESH_FAIL',
    RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL',
    RESET_PASSWORD_CONFIRM_SUCCESS = 'RESET_PASSWORD_CONFIRM_SUCCESS',
    RESET_PASSWORD_CONFIRM_FAIL = 'RESET_PASSWORD_CONFIRM_FAIL',
    LOGOUT = 'LOGOUT',
    ACTIVATION_AVAILABLE = 'ACTIVATION_AVAILABLE',
    SET_AUTH_LOADING = 'SET_AUTH_LOADING',
    REMOVE_AUTH_LOADING = 'REMOVE_AUTH_LOADING',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAIL = 'REGISTER_FAIL',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE',
    ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS',
    ACTIVATION_FAIL = 'ACTIVATION_FAIL',
    REMOVE_RESET_PASSWORD_FLAG = 'REMOVE_RESET_PASSWORD_FLAG',
    UPDATE_DEFAULT_USER_SUCCESS = 'UPDATE_DEFAULT_USER_SUCCESS',
    UPDATE_DEFAULT_USER_FAIL = 'UPDATE_DEFAULT_USER_FAIL',
    DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS',
    DELETE_ACCOUNT_FAIL = 'DELETE_ACCOUNT_FAIL',
    REGISTER_PUBLISHER_SUCCESS = 'REGISTER_PUBLISHER_SUCCESS',
    REGISTER_PUBLISHER_FAIL = 'REGISTER_PUBLISHER_FAIL',
}  



export interface DeleteAccountSuccess {
    type: AuthTypes.DELETE_ACCOUNT_SUCCESS,
    payload:{}
}
export interface DeleteAccountFail {
    type: AuthTypes.DELETE_ACCOUNT_FAIL,
    payload:{}
}

export interface UpdateDefaultUserSuccess{
    type: AuthTypes.UPDATE_DEFAULT_USER_SUCCESS,
    payload: User
}

export interface UpdateDefaultUserFail{
    type: AuthTypes.UPDATE_DEFAULT_USER_FAIL,
    payload: {
        detail: string;
    }
}

export interface RemoveResetPasswordFlag {
    type: AuthTypes.REMOVE_RESET_PASSWORD_FLAG,
    payload: {}
}

export interface RemoveMessage {
    type:AuthTypes.REMOVE_MESSAGE;
    payload: {}
}

export interface ActivationSuccess {
    type: AuthTypes.ACTIVATION_SUCCESS;
    payload:{}
}

export interface ActivationFail {
    type: AuthTypes.ACTIVATION_FAIL;
    payload: {
        uid?:string,
        token?:string,
        detail?:string
    }
}



export interface ActivationAvailable {
    type: AuthTypes.ACTIVATION_AVAILABLE;
    payload: {}
}

export interface LoginSuccess {
    type: AuthTypes.LOGIN_SUCCESS;
    payload: {
        access:string
        refresh:string
    }
}

export interface RegisterSuccess {
    type: AuthTypes.REGISTER_SUCCESS;
    payload: User
}

export interface RegisterPublisherSuccess {
    type: AuthTypes.REGISTER_PUBLISHER_SUCCESS;
    payload: User
}

export interface RegisterPublisherFail {
    type: AuthTypes.REGISTER_PUBLISHER_FAIL;
    payload: {
        email?: string;
        name?: string;
        password?: string;
        re_password?: string;
        description?:string;
        disclaimer?:string;
        message: string;
    };
}

export interface RegisterFail {
    type: AuthTypes.REGISTER_FAIL;
    payload: {
        email?: string;
        name?: string;
        password?: string;
        re_password?: string;
        message: string;
    };
}

export interface LoginFail {
    type: AuthTypes.LOGIN_FAIL;
    payload?: {
        detail:string
    }
}

export interface UserLoadedSuccess {
    type: AuthTypes.USER_LOADED_SUCCESS;
    payload: User
}

export interface UserLoadedFail {
    type: AuthTypes.USER_LOADED_FAIL;
    payload?:{
        error?:string
    }
}

export interface AuthenticatedSuccess {
    type: AuthTypes.AUTHENTICATED_SUCCESS
    payload:any
}

export interface AuthenticatedFail {
    type: AuthTypes.AUTHENTICATED_FAIL
    payload?:any
}

export interface RefreshFail {
    type: AuthTypes.REFRESH_FAIL
    payload?: any
}

export interface RefreshSuccess {
    type: AuthTypes.REFRESH_SUCCESS
    payload: {
        access:string
    }
}
 
export interface ResetPasswordSuccess {
    type: AuthTypes.RESET_PASSWORD_SUCCESS,
    payload?:null
}
export interface ResetPasswordFail {
    type: AuthTypes.RESET_PASSWORD_FAIL,
    payload?:{
        email:string
    }
}

export interface ResetPasswordConfirmSuccess {
    type: AuthTypes.RESET_PASSWORD_CONFIRM_SUCCESS
    payload: null
}

export interface ResetPasswordConfirmFail {
    type: AuthTypes.RESET_PASSWORD_CONFIRM_FAIL
    payload: {
        uid:string | undefined;
        token:string | undefined;
        new_password:string | null
        re_new_password:string | null
        message:string;
    }
}

export interface Logout{
    type: AuthTypes.LOGOUT
    payload?: null
}

export interface SetAuthLoading {
    type: AuthTypes.SET_AUTH_LOADING
    payload?: null
}

export interface RemoveAuthLoading {
    type: AuthTypes.REMOVE_AUTH_LOADING
    payload?: null
}



export type AuthActions = 
    | LoginSuccess
    | LoginFail
    | UserLoadedSuccess
    | UserLoadedFail
    | AuthenticatedSuccess
    | AuthenticatedFail
    | RefreshFail
    | RefreshSuccess
    | ResetPasswordSuccess
    | ResetPasswordFail
    | ResetPasswordConfirmSuccess
    | ResetPasswordConfirmFail
    | Logout
    | SetAuthLoading
    | RemoveAuthLoading
    | RegisterSuccess
    | RegisterFail
    | ActivationSuccess
    | ActivationFail
    | ActivationAvailable
    | RemoveMessage
    | RemoveResetPasswordFlag
    | UpdateDefaultUserSuccess
    | UpdateDefaultUserFail
    | DeleteAccountSuccess
    | DeleteAccountFail
    | RegisterPublisherSuccess
    | RegisterPublisherFail

