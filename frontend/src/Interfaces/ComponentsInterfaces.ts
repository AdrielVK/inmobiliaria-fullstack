import React, { ReactNode } from "react";

export interface LogoutModalProps {
    onClose: () => void;
    onLogout: () => void;
};

type ButtonTypes = "submit" | "button" | "reset" | undefined;

export interface StandarButtonProps {
    loading_component?: ReactNode;
    type?: ButtonTypes;
    text?: string;
    
    onClickAction?: React.MouseEventHandler<HTMLButtonElement>| undefined;
};

export interface MessageInterface {
    type: string;
    text: string;
}

export interface DeleteAccountModalProps {
    loading: boolean;
    delete_user: (password:string) => void;
    onClose: () => void;
    
}