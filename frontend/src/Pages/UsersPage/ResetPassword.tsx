import React from 'react';
import {ResetProps} from '@/Interfaces/PagesInterfaces';
import './Users.css'
import { Link} from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { connect } from 'react-redux';
import { remove_message,remove_reset_password_flag, reset_password, reset_password_confirm } from '@/redux/actions/auth';
import {useState, useEffect} from 'react'
import { RootState } from '@/redux/reducers';
import StandarBotton from '@/Components/Buttons/StandarButton';
import Message from '@/Components/Messages/Message';
import Layout from '@/Components/Layouts/Layout';
import Loading from '@/Components/Loadings/Loading';
import { useParams } from 'react-router-dom';


const ResetPassword: React.FC<ResetProps> = ({
    loading,
    remove_message,
    message,
    reset_password_confirm,
    reset_password_flag,
    remove_reset_password_flag,
}) => {

    //remove_reset_password_flag()    
    
    
    const [time, setTime] = useState<boolean>(false);
    const { uid, token } = useParams<{ uid: string | undefined; token: string | undefined}>();

    useEffect(() => {
        if (message) {
            setTime(true)
            setTimeout(() => 
            {
                setTime(false)
                remove_message()
            }, 4500)
        }
    }, [message]);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const {new_password, re_new_password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await reset_password_confirm(uid, token, new_password, re_new_password);

       
    };

    useEffect(() => {
        remove_reset_password_flag();
        

    }, [])
    
    

    return (
        <Layout>  
            { time && message&& <Message text={message.text} type={message.type}/>}
            {
                reset_password_flag ? 
                <>
                    <div className='content-title'>
                        <label htmlFor='email-address' className='title-form'>
                            TuCasa.com
                        </label>
                    </div>
                    <div className='form'>
                        <Link to='/'> <img src={logo} width='50px' /></Link>
                        <div className='div-activated'>
                            
                                <p className='activate-text'>Contrasena cambiada</p>
                                <Link to='/login' className='activate-text'>Iniciar Sesion</Link>
                            
                        </div>
                    </div>
                    
                </>
                    
                :
                    
                <>
                    <div className='content-title'>
                        <label htmlFor='email-address' className='title-form'>
                            TuCasa.com
                        </label>
                    </div>
                    <form className='form' onSubmit={(e) => {onSubmit(e)}} method='POST'>

                            <Link to='/'> <img src={logo} width='50px' /></Link>
                            
                            <p className='title'>Resetear Contrasena</p>
                            <input type='hidden' name='remember' defaultValue='true'/>
                            <label htmlFor='new_password' className='sr-only'>
                                Nueva Contrasena 
                            </label>
                            
                                <input
                                id='new_password'
                                value={new_password}
                                name='new_password'
                                type='password'
                                onChange={e=>onChange(e)}
                                required
                                className='email'
                                placeholder='Nueva contrasena'
                            
                                />
                            
                            <label htmlFor='password' className='sr-only'>
                                Repita la Nueva Contrasena
                            </label>
                            <input
                                value={re_new_password}
                                id='re_new_password'
                                name='re_new_password'
                                type='password'
                                onChange={e=>onChange(e)}
                                required
                                className='contrasena'
                                placeholder='Password'
                            />
                        
                        <div className='forgot'>
                            <Link to='/login' className='register-link'>
                                Iniciar Sesion
                            </Link>
                            <Link to='/register' className='register-link'>
                                Registrarme
                            </Link>
                        </div>
                        <div className='button'>
                            {
                                loading ? (<StandarBotton  type={"submit"} text={"Cargando"}  loading_component={<Loading color={'#ffffff'} width={'15px'} height={'15px'}/>}/>):(<StandarBotton  type={"submit"} text={"Cambiar Contrasena"}/>)
                            }
                            
                        </div>
                    </form> 
                </>
            }
            
        </Layout>
        )
};

const mapStateToProps= (state:RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    loading: state.auth.loading,
    reset_password_flag: state.auth.reset_password
})

export default connect(mapStateToProps, {
    reset_password_confirm,
    remove_message,
    reset_password,
    remove_reset_password_flag
})(ResetPassword);