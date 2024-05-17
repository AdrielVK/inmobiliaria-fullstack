import React from 'react';
import './Modal.css';
import logo from '@/assets/logo.svg'
import StandarBotton from '../Buttons/StandarButton';

interface AuthenticationModalProps {
  onClose: (e: React.MouseEvent) => void;
  onNav: (e: React.MouseEvent) => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({ onClose,onNav }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img className="logo" src={logo}/>
          <p>Para anadir una publicacion a favoritos debes iniciar sesion</p>
          <div className='buttons'>
            <StandarBotton onClickAction={onNav} text='Ir a iniciar sesion' type='button'/>

          </div>
          
        </div>
      </div>
    );
};

export default AuthenticationModal;