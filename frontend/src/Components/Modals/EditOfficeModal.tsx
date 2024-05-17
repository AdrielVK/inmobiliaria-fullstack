import React from 'react';
import './Modal.css';
import StandarBotton from '../Buttons/StandarButton';
import { edit_office } from '@/redux/actions/auth';
import { useState } from 'react';
import { User } from '@/Interfaces';
import { connect } from 'react-redux';
import { RootState } from '@/redux/reducers';
import Loading from '../Loadings/Loading';

interface EditOfficeModalProps {
    edit_office: (new_office:string) => void;
    onClose: () => void;
    user: User | null;
    loading:boolean;
    
};

const EditOfficeModal: React.FC<EditOfficeModalProps> = ({
    onClose,
    user,
    loading,
    edit_office
}) => {

    

    const [formData, setFormData] = useState({
        new_office: '',
    })

    const {new_office} = formData

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        edit_office(new_office)
    }

    return(
        <div className="modal-overlay">
        
            
            <form className='modal-content' onSubmit={(e) => {onSubmit(e)}} method='POST'>

                <label htmlFor='new_name' className='sr-only-modal'>
                    Nombre de oficina actual: {user?.office}
                </label>
                    <input
                    id='new_office'
                    value={new_office}
                    name='new_office'
                    type='text'
                    onChange={e=>onChange(e)}
                    required
                    className='email-modal'
                    placeholder='Nombre de oficina'
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
    edit_office,
    
})(EditOfficeModal);