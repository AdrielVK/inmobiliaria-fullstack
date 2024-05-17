import React from 'react';
import './Modal.css';
import {LogoutModalProps} from '@/Interfaces/ComponentsInterfaces';
import logo from '@/assets/logo.svg'
import StandarBotton from '../Buttons/StandarButton';

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onLogout }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img className="logo" src={logo}/>
          <p>¿Estás seguro de que quieres cerrar sesión?</p>
          <div className='buttons'>
            <StandarBotton onClickAction={onLogout} text='Cerrar Sesion' type='button'/>
            <StandarBotton onClickAction={onClose} text='Cancelar' type='button'/>

          </div>
          
        </div>
      </div>
    );
};

export default LogoutModal;