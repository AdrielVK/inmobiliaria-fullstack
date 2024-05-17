import React from 'react';
import {LoginInterface} from '@/Interfaces/PagesInterfaces';
import './Users.css'
import { Link, Navigate} from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { connect } from 'react-redux';
import { load_user,remove_message, login ,refresh,check_authenticated, reset_password } from '@/redux/actions/auth';
import {useState, useEffect} from 'react'
import { RootState } from '@/redux/reducers';
import StandarBotton from '@/Components/Buttons/StandarButton';
import Message from '@/Components/Messages/Message';
import Layout from '@/Components/Layouts/Layout';
import Loading from '@/Components/Loadings/Loading';

const Login: React.FC<LoginInterface> = ({
    login,
    isAuthenticated,
    loading,
    check_authenticated,
    refresh,
    load_user,
    remove_message,
    message,
    reset_password
}) => {

    const [time, setTime] = useState<boolean>(false);
    
    const onClickResetPassword = () => {
        
        reset_password(email)
        
    }

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

    useEffect(() => {
        if (!isAuthenticated) {
          refresh();
          check_authenticated();
          load_user();
        }
    }, [isAuthenticated]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Navigate to="/" />;
    };



    return (
        <Layout>  
            { time && message&& <Message text={message.text} type={message.type}/>}
            <div className='content-title'>
                <label htmlFor='email-address' className='title-form'>
                    TuCasa.com
                </label>
            </div>
            <form className='form' onSubmit={(e) => {onSubmit(e)}} method='POST'>

                    <Link to='/'> <img src={logo} width='50px' /></Link>
                    
                    <p className='title'>Iniciar Sesion</p>
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
                        placeholder='Password'
                    />
                
                <div className='forgot'>
                    <p onClick={onClickResetPassword} className='forgot-link'>
                        Olvide mi contrasena
                    </p>
                    <p>¿No tenes una cuenta?</p>
                    <Link to='/register' className='register-link'>
                        Registrate
                    </Link>
                
                </div>
                <div className='button'>
                    {
                        loading ? (<StandarBotton  type={"submit"} text={"Cargando"}  loading_component={<Loading color={'#ffffff'} width={'15px'} height={'15px'}/>}/>):(<StandarBotton  type={"submit"} text={"Iniciar Sesion"}/>)
                    }
                    
                </div>
            </form>
        </Layout>
        )
};

const mapStateToProps= (state:RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {
    login,
    refresh,
    check_authenticated,
    load_user,
    remove_message,
    reset_password
})(Login);