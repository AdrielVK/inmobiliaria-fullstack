import React, { useState, useEffect } from 'react';
import './Users.css';
import {RegisterPublisherInterface} from '@/Interfaces/PagesInterfaces';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import { register_publisher, remove_message, resend_activate } from '@/redux/actions/auth';
import { Link } from 'react-router-dom';
import StandarBotton from '@/Components/Buttons/StandarButton';
import Message from '@/Components/Messages/Message';
import Layout from '@/Components/Layouts/Layout';
import Loading from '@/Components/Loadings/Loading';
import fileImage from '@/assets/image.svg'

const RegisterPublisherPage: React.FC<RegisterPublisherInterface> = ({
    register_publisher,
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
        disclaimer: '',
        phone_number: '',
        description: '',
        office: ''
    });

    const { email,
            name, 
            password, 
            re_password, 
            phone_number,
            
            disclaimer,
            description,
            office,    
        } = formData;

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const [profilePic, setProfilePic] = useState<File | null>(null)
    const [bannerPic, setBannerPic] = useState<File | null>(null)


    const fileSelectedHandlerProfile = (e:React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0]
        if(file){

            let reader = new FileReader();
            reader.readAsDataURL(file);
            
            setProfilePic(file)
        }
    }

    const fileSelectedHandlerBanner = (e:React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0]

        if (file ) {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            
            setBannerPic(file)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register_publisher(email, name, password, re_password, phone_number, profilePic, bannerPic, disclaimer,description,office);
    }

    const onClick = () => {
        resend_activate(email)
    }

    return (
        <Layout>
            { time && message&& <Message text={message.text} type={message.type}/>}
            
            <form className='form-register-publisher' onSubmit={(e) => {onSubmit(e)}} method='POST'>
                <div className='content-title'>
                    <label htmlFor='email-address' className='title-form'>
                        <Link className='title-form' to='/' >TuCasa.com</Link>
                    </label>
                </div>
                    
                    <p className='title'>Registrarme</p>
                      
                    {user?
                        <>
                            <div className='activate-div'>
                                <p className='activate-text'>Cuenta creada, revisa tu email</p>
                                <p className='activate-text'>y accede al enlace para activar tu cuenta</p>
                                <p className='activate-link' onClick={onClick}>Reenviar Activacion</p>
                            </div>
                        </>
                        :
                        <>
                            <div className='container-form'>
                                <div className='divs-form'>
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
                                        required
                                        className='contrasena'
                                        placeholder='Confirmar contrasena'
                                    />
                                    <label htmlFor='phone_number' className='sr-only'>
                                        Numero de telefono
                                    </label>
                                    <input
                                        value={phone_number}
                                        id='phone_number'
                                        name='phone_number'
                                        type='tel'
                                        onChange={e=>onChange(e)}
                                        required
                                        className='email'
                                        placeholder='Numero de telefono'
                                    />
                                    
                                </div>
                                <div className='divs-form'>
                                    <div className='container-images'>
                                        <div className='micro-cont-images'>
                                            <label htmlFor='profile_picture' className='sr-only'>
                                                Foto de perfil
                                            </label>
                                            
                                            <div className="custom-file-input">
                                                <label htmlFor="profile_picture" className="custom-image-input-label">
                                                    <img src={fileImage} alt='profile picture' />
                                                </label>
                                                <input
                                                    id="profile_picture"
                                                    name="profile_picture"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => fileSelectedHandlerProfile(e)}
                                                    className="image-inputs"
                                                />
                                                <span className="selected-file-text">{profilePic? <>{profilePic.name.length > 7 ? <>{`${profilePic.name.slice(0,8)}...`}</>:<>{profilePic.name}</>}</>:<>Sin archivos seleccionados</>}</span>
                                            </div>
                                        </div>

                                        <div className='micro-cont-images'>
                                            <label htmlFor='banner_disclaimer' className='sr-only'>
                                                Foto de portada
                                            </label>

                                            <div className="custom-file-input">
                                                <label htmlFor="profile_picture" className="custom-image-input-label">
                                                    <img src={fileImage} alt='profile picture' />
                                                </label>
                                                <input
                                                    id="banner_disclaimer"
                                                    name="banner_disclaimer"
                                                    type="file"
                                                    
                                                    accept="image/*"
                                                    onChange={(e) => fileSelectedHandlerBanner(e)}
                                                    className="image-inputs"
                                                />
                                                <span className="selected-file-text">{ bannerPic? <>{bannerPic.name.length > 7 ? <>{`${bannerPic.name.slice(0,8)}...`}</>:<>{bannerPic.name}</>}</>:<>Sin archivos seleccionados</>}</span>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    
                                    <label htmlFor='office' className='sr-only'>
                                        Oficina
                                    </label>
                                    <input
                                        value={office}
                                        id='office'
                                        name='office'
                                        type='text'
                                        onChange={e=>onChange(e)}
                                        
                                        className='email '
                                        placeholder='Nombre de oficina'
                                    />
                                
                                    <label htmlFor='description' className='sr-only'>
                                        Descripcion
                                    </label>
                                    <textarea
                                        value={description}
                                        id='description'
                                        name='description'
                                        style={{ resize: 'none' }}
                                        onChange={e=>onChangeText(e)}
                                        required
                                        className='email long'
                                        placeholder='Descripcion (hasta 300 caracteres)'
                                    />
                                    <label htmlFor='disclaimer' className='sr-only'>
                                        Disclaimer
                                    </label>
                                    <textarea
                                        value={disclaimer}
                                        id='disclaimer'
                                        name='disclaimer'
                                        style={{ resize: 'none' }}
                                        onChange={e=>onChangeText(e)}
                                        
                                        className='email long'
                                        placeholder='Disclaimer (hasta 300 caracteres)'
                                    />
                                    
                                </div>
                            </div>    
                            <div className='links-reg'>
                                
                                <Link to='/login' className='register-link'>
                                    Iniciar Sesion
                                </Link>
                                <Link to='/' className='register-link'>
                                    Ir a inicio
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
    register_publisher,
    remove_message,
    resend_activate
})(RegisterPublisherPage);