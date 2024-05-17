import { User } from "./AuthInterfaces";
import { MessageInterface } from "./ComponentsInterfaces";

export interface RegisterInterface{
    loading: boolean;
    register: (email:string, name:string, password:string, re_password:string)=>void;
    message: MessageInterface | null;
    user: User | null;
    remove_message: () => void;
    resend_activate: (email:string) => void
}

export interface RegisterPublisherInterface{
    loading: boolean;
    register_publisher: (email:string,
                         name:string, 
                         password:string, 
                         re_password:string, 
                         phone_number:string, 
                         profile_picture:File | null, 
                         banner_disclaimer:File | null, 
                         disclaimer:string | null, 
                         description:string, 
                         office:string | null)=>void;


    message: MessageInterface | null;
    user: User | null;
    remove_message: () => void;
    resend_activate: (email:string) => void
}

export interface ResetProps {
    reset_password_flag: boolean,
    remove_reset_password_flag: () => void,
    loading:boolean;
    remove_message: () => void;
    message: MessageInterface | null;
    reset_password_confirm: (uid:string | undefined, token:string | undefined, new_password:string | null, re_new_password:string | null) => void;
}

export interface ActivateInterface{
    activation: (uid:string, token:string) => void;
    loading: boolean;
    message: MessageInterface | null;
    activated: boolean;
    remove_message: () => void;
}

export interface LoginInterface {
    login: (email: string, password: string) => void| null;
    isAuthenticated: boolean | null;
    loading: boolean ;
    check_authenticated: () => void ;
    refresh: () => void;
    load_user: () => void;
    message: MessageInterface | null;
    remove_message: () => void;
    reset_password: (email:string) => void;
}

export interface NavbarInterface {
    isAuthenticated: boolean | null;
    load_user: () => void| null;
    user:User|null
    logout: () => void
    refresh: () => void
    check_authenticated: ()=> void
}
