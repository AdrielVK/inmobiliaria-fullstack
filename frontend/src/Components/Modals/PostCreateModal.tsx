import React from 'react';
import './Modal.css';
import logo from '@/assets/logo.svg'
import StandarBotton from '../Buttons/StandarButton';

interface PostCreateModalProps {
  onClose: (e: React.MouseEvent) => void;
  onNav: (e: React.MouseEvent) => void;
  text: string
  text_button:string
}

const PostCreateModal: React.FC<PostCreateModalProps> = ({ onClose,onNav, text,text_button }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img className="logo" src={logo}/>
          <p>{text}</p>
          <div className='buttons'>
            <StandarBotton onClickAction={onNav} text={text_button} type='button'/>

          </div>
          
        </div>
      </div>
    );
};

export default PostCreateModal;