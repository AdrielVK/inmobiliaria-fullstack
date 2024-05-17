import React, { useState, useEffect } from 'react';
import './Users.css';
import {RegisterInterface} from '@/Interfaces/PagesInterfaces';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import { register, remove_message, resend_activate } from '@/redux/actions/auth';
import { Link } from 'react-router-dom';
import StandarBotton from '@/Components/Buttons/StandarButton';
import Message from '@/Components/Messages/Message';
import Layout from '@/Components/Layouts/Layout';
import Loading from '@/Components/Loadings/Loading';

const RegisterPage: React.FC<RegisterInterface> = ({
    register,
    message,
    user,
    loading,
    remove_message,
    resend_activate
}) => {

    const [time, setTime] = useState<boolean>(false);
    

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
        email: '',
        name: '',
        password: '',
        re_password: '',
        
    });

    const { email, name, password, re_password } = formData;

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(email, name, password, re_password);
    }

    const onClick = () => {
        resend_activate(email)
    }

    return (
        <Layout>
            { time && message&& <Message text={message.text} type={message.type}/>}
            <div className='content-title'>
                <label htmlFor='email-address' className='title-form'>
                    TuCasa.com
                </label>
            </div>
            <form className='form-register' onSubmit={(e) => {onSubmit(e)}} method='POST'>
                    <p className='title'>Registrarme</p>
                    
                    
                    
                    {user?
                        <>
                            <div className='activate-div'>
                                <p className='activate-text top'>Cuenta creada, revisa tu email</p>
                                <p className='activate-text'>y accede al enlace para activar tu cuenta</p>
                                <p className='activate-link' onClick={onClick}>Reenviar Activacion</p>
                            </div>
                        </>
                        :
                        <>
                            <input type='hidden' name='remember' defaultValue='true'/>
                            <label htmlFor='email-address' className='sr-only'>
                                Email 
                            </label>
                            <input
                            id='email-address'
                            value={email}
                            name='email'
                            type='email'
                            onChange={e=>onChange(e)}
                            required
                            className='email'
                            placeholder='Email '
                            />
                            <label htmlFor='name' className='sr-only'>
                                Nombre de usuario
                            </label>
                            <input
                            id='name'
                            value={name}
                            name='name'
                            type='text'
                            onChange={e=>onChange(e)}
                            required
                            className='email'
                            placeholder='Nombre de usuario'
                            />
                            <label htmlFor='password' className='sr-only'>
                                Contrasena
                            </label>
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
                            <label htmlFor='re_password' className='sr-only'>
                                Confirmar contrasena
                            </label>
                            <input
                                value={re_password}
                                id='re_password'
                                name='re_password'
                                type='password'
                                onChange={e=>onChange(e)}
                                autoComplete='current-password'
                                required
                                className='contrasena'
                                placeholder='Confirmar contrasena'
                            />
                            <div className='forgot'>
                                <Link to='/register/publisher' className='register-link'>
                                    Crea una cuenta para publicar
                                </Link>
                                <p>¿Ya tienes una cuenta?</p>
                                <Link to='/login' className='register-link'>
                                    Iniciar Sesion
                                </Link>
                            
                            </div>
                            
                            <div className='button'>
                            {
                                loading ? (<StandarBotton type={"submit"} text={"Cargando"} loading_component={<Loading width={'15px'} height={'15px'} color={'#ffffff'}/>}/>):(<StandarBotton type={"submit"} text={"Registrarse"}/>)
                            }
                            </div>
                        </>
                    }
                
                
            </form>
            
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    message: state.auth.message,
    user: state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStateToProps, {
    register,
    remove_message,
    resend_activate
})(RegisterPage);