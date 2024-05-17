import React, { useEffect } from "react";
import {ActivateInterface} from '@/Interfaces/PagesInterfaces'
import Layout from "@/Components/Layouts/Layout";
import { activation,remove_message } from "@/redux/actions/auth";
import { RootState } from "@/redux/reducers";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import Message from '@/Components/Messages/Message';
import Loading from "@/Components/Loadings/Loading";
import { Link } from "react-router-dom";
import StandarBotton from "@/Components/Buttons/StandarButton";

const ActivatePage: React.FC<ActivateInterface> = ({ activation, message, loading, activated }) => {
    
    const { uid, token } = useParams<{ uid: string ; token: string }>();
    const [time, setTime] = useState<boolean>(false);

    const [error, setError] = useState(false)

    const activateAction = () => {
        if (uid && token) {
            activation(uid, token)
            setError(true)
        }
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

    return (
        <Layout>
            
            { time && message&& <Message text={message.text} type={message.type}/>}
            {
                (loading) ? 
                (
                    <Loading height={'40px'} color={'#000000'} width={'40px'}/>
                )
                :
                (   
                    
                    (activated ) ? (
                        <>
                            <label htmlFor='activate-div' className='title-form'>
                                TuCasa.com
                            </label>
                            <div className='activate-div' id='activate-div'>
                                <div className='container-activate'>
                                    <p className='activate-text'>Felicidades</p>
                                    <p className='activate-text'>Ya tienes todo listo para usar tu cuenta</p>
                                </div>
                                <Link className='activate-link' to='/'>Ir a inicio</Link>
                                <Link className='activate-link' to='/login'>Iniciar Sesion</Link>
                            </div>
                        </>
                        
                    )
                    :
                    (   <>
                            {
                                error ? <>
                                    <p>Error, algo salio mal. Intente registrarse nuevamente</p>
                                    <Link className='activate-link' to='/'>Ir a inicio</Link>
                                </>:
                                <>
                                    <label htmlFor='activate-div' className='title-form'>
                                        TuCasa.com
                                    </label>
                                    <div className='activate-div' id='activate-div'>
                                        <div className='container-activate'>
                                            <p className='activate-text'>Haz click aqui para activar la cuenta: </p>
                                            <StandarBotton text="Activar" onClickAction={activateAction}/>
                                            
                                            
                                        </div>
                                        <Link className='activate-link' to='/'>Ir a inicio</Link>
                                        <Link className='activate-link' to='/login'>Iniciar Sesion</Link>
                                    </div>
                                </>
                            }
                            
                        </>
                    )
                    
                    
                )
            }
        </Layout>
    )
};  

const mapStateToProps= (state:RootState) => ({
    
    message: state.auth.message,
    loading: state.auth.loading,
    activated:state.auth.activated
})

export default connect(mapStateToProps, {
    activation,
    remove_message
})(ActivatePage);