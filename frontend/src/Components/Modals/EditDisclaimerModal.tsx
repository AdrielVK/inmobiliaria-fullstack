import React from 'react';
import './Modal.css';
import StandarBotton from '../Buttons/StandarButton';
import { edit_disclaimer } from '@/redux/actions/auth';
import { useState } from 'react';
import { User } from '@/Interfaces';
import { connect } from 'react-redux';
import { RootState } from '@/redux/reducers';
import Loading from '../Loadings/Loading';

interface EditDisclaimerModalProps {
    edit_disclaimer: (new_disclaimer:string) => void;
    onClose: () => void;
    user: User | null;
    loading:boolean;
    
};

const EditDisclaimerModal: React.FC<EditDisclaimerModalProps> = ({
    onClose,
    user,
    loading,
    edit_disclaimer
}) => {

    

    const [formData, setFormData] = useState({
        new_disclaimer: '',
    })

    const {new_disclaimer} = formData

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        edit_disclaimer(new_disclaimer)
    }

    return(
        <div className="modal-overlay">
        
            
            <form className='modal-content' onSubmit={(e) => {onSubmit(e)}} method='POST'>

                <label htmlFor='new_name' className='sr-only-modal'>
                    Disclaimer
                </label>
                    <textarea
                    id='new_disclaimer'
                    value={new_disclaimer}
                    name='new_disclaimer'
                    onChange={e=>onChange(e)}
                    required
                    className='email-modal'
                    placeholder={user?.disclaimer? user.disclaimer : 'disclaimer'}
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
    edit_disclaimer,
    
})(EditDisclaimerModal);