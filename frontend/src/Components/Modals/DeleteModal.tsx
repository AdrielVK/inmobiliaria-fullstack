import React from 'react';
import './Modal.css';
import {DeleteAccountModalProps} from '@/Interfaces/ComponentsInterfaces';
import { useState } from 'react';
import StandarBotton from '../Buttons/StandarButton';
import { connect } from 'react-redux';
import { RootState } from '@/redux/reducers';
import Loading from '../Loadings/Loading';
import { delete_user } from '@/redux/actions/auth';



const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ 
  onClose,
  loading,
  delete_user

  }) => {
    const [formData, setFormData] = useState({
        password: '',
    });

    const { password } = formData;
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      delete_user(password)
      
    };

    

    return (
      <div className="modal-overlay" onClick={onClose}>
        
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <form className="form" onSubmit={(e) => {onSubmit(e)}} method="POST">
            <p>Borrar cuenta</p>
            
            <input
                value={password}
                id='password'
                name='password'
                type='password'
                onChange={e=>onChange(e)}
                autoComplete='current-password'
                required
                className='contrasena'
                placeholder='Contrasena'
            />
            <div className='buttons'>
            {
                loading ? (<StandarBotton  type={"submit"} text={"Cargando"}  loading_component={<Loading color={'#ffffff'} width={'15px'} height={'15px'}/>}/>)
                :(
                  <>
                  <StandarBotton  type={"submit"} text={"Borrar"}/> 
                  <StandarBotton onClickAction={onClose} text='Cerrar' type='button'/>
                  </>
                )
            }
            </div>
          </form>
          
        </div>
      </div>
    );
};

const mapStateToProps= (state:RootState) => ({
    loading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapStateToProps, {
  delete_user
})(DeleteAccountModal);