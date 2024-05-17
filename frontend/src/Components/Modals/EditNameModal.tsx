import React from 'react';
import './Modal.css';
import StandarBotton from '../Buttons/StandarButton';
import { change_name } from '@/redux/actions/auth';
import { useState } from 'react';
import { User } from '@/Interfaces';
import { connect } from 'react-redux';
import { RootState } from '@/redux/reducers';
import Loading from '../Loadings/Loading';

interface EditNameModalProps {
    change_name: (new_name:string) => void;
    onClose: () => void;
    user: User | null;
    loading:boolean;
    
};

const EditNameModal: React.FC<EditNameModalProps> = ({
    onClose,
    user,
    loading,
    change_name
}) => {

    

    const [formData, setFormData] = useState({
        new_name: '',
    })

    const {new_name} = formData

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        change_name(new_name)
    }

    return(
        <div className="modal-overlay">
        
            
            <form className='modal-content' onSubmit={(e) => {onSubmit(e)}} method='POST'>

                <label htmlFor='new_name' className='sr-only-modal'>
                    Nombre de usuario actual: {user?.name}
                </label>
                    <input
                    id='new_name'
                    value={new_name}
                    name='new_name'
                    type='text'
                    onChange={e=>onChange(e)}
                    required
                    className='email-modal'
                    placeholder='Nombre de usuario'
                    />

                <div className='buttons'>
                    {
                        loading ? (<StandarBotton type={"submit"} text={"Cargando"} loading_component={<Loading width={'15px'} height={'15px'} color={'#ffffff'}/>}/>):(<StandarBotton type={"submit"} text={"Guardar"}/>)
                    }                    
                    <StandarBotton onClickAction={onClose} text='Cerrar' type='button'/>
                </div>
            </form>
            
        </div>
      
    )
}

const mapStateToProps = (state:RootState) => ({
    user: state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStateToProps, {
    change_name,
    
})(EditNameModal);