import Layout from "@/Components/Layouts/Layout";
import { MessageInterface } from "@/Interfaces";
import React from 'react';
import { useState, useEffect } from "react";
import { RootState } from "@/redux/reducers";
import { connect } from "react-redux";
import { remove_message, reset_password, change_name } from "@/redux/actions/auth";
import Message from "@/Components/Messages/Message";
import './Users.css'
import Loading from "@/Components/Loadings/Loading";
import { User } from "@/Interfaces";
import StandarBotton from "@/Components/Buttons/StandarButton";
import editLogo from "@/assets/edit.svg";
import cancelLogo from "@/assets/cancel.svg";
import DeleteModal from "@/Components/Modals/DeleteModal";
import { useNavigate } from 'react-router-dom';
import EditProfilePictureModal from "@/Components/Modals/EditProfilePictureModal";
import EditBannerPictureModal from "@/Components/Modals/EditBannerPictureModal"
import EditNameModal from "@/Components/Modals/EditNameModal";
import EditOfficeModal from "@/Components/Modals/EditOfficeModal";
import EditTelModal from "@/Components/Modals/EditTelModal";
import EditDescModal from "@/Components/Modals/EditDescModal";
import EditDisclaimerModal from "@/Components/Modals/EditDisclaimerModal";
import Navbar from "@/Components/Navbar/Navbar";


interface ProfileProps {
   loading: boolean;
   message: MessageInterface | null;
   remove_message: () => void;
   isAuthenticated: boolean | null;
   user: User | null;
   reset_password: (email:string | null) => void;
   change_name: (name:string) => void
}


const ProfilePage: React.FC<ProfileProps> = ({
   loading,
   message,
   remove_message,
   isAuthenticated,
   user,
   reset_password,
   change_name
}) => {

   const [timeHome, setTimeHome] = useState<boolean>(false);
    

    useEffect(() => {
        if (message) {
            setTimeHome(true)
            setTimeout(() => 
            {
                setTimeHome(false)
                remove_message()
            }, 4500)
        }
    }, [message]);

    const [formData, setFormData] = useState({
        name: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const email = user? user.email : null

    const {name} = formData

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        change_name(name)
        setEdit(false)
    };

    const onClickResetPassword = () => {
        
        reset_password(email)
        
    }

    const [edit, setEdit] = useState(false)

    const handleEdit = () => {
        setEdit(!edit)
    }

    const [openModal, setOpenModal] = useState(false)

    const handleDeleteModal = () => {
        setOpenModal(!openModal)
    }

    const [modalTel, setModalTel] = useState(false)
    
    const [modalOffice, setModalOffice] = useState(false)
    const [modalName, setModalName] = useState(false)
    const [modalBannerPic, setModalBannerPic] = useState(false)
    const [modalProfilePic, setModalProfilePic] = useState(false)
    const [modalDesc, setModalDesc] = useState(false)
    const [modalDisclaimer, setModalDisclaimer] = useState(false)

    const openModalDesc= () =>{
        setModalDesc(!modalDesc)
        setModalProfilePic(false)
        setModalBannerPic(false)
        setModalName(false)
        setModalOffice(false)
        setModalTel(false)
        setModalDisclaimer(false)
    }
    const openModalName= () =>{
        setModalName(!modalName)
        setModalBannerPic(false)
        setModalProfilePic(false)
        setModalDesc(false)
        setModalOffice(false)
        setModalTel(false)
        setModalDisclaimer(false)
    }
    const openEditProfilePicture = () => {
        setModalProfilePic(!modalProfilePic)
        setModalDesc(false)
        setModalBannerPic(false)
        setModalName(false)
        setModalOffice(false)
        setModalTel(false)
        setModalDisclaimer(false)
    }
    const openEditBannerPicture = () => {
        setModalBannerPic(!modalBannerPic)
        setModalProfilePic(false)
        setModalDesc(false)
        setModalName(false)
        setModalOffice(false)
        setModalTel(false)
        setModalDisclaimer(false)
    }
    const openModalOffice = () => {
        setModalOffice(!modalOffice)
        setModalName(false)
        setModalBannerPic(false)
        setModalProfilePic(false)
        setModalDesc(false)
        setModalTel(false)
        setModalDisclaimer(false)
    }
    const openModalTel = () => {
        setModalTel(!modalTel)
        setModalOffice(false)
        setModalName(false)
        setModalBannerPic(false)
        setModalProfilePic(false)
        setModalDesc(false)
        setModalDisclaimer(false)
    }
    const openModalDisclaimer = () => {
        setModalDisclaimer(!modalDisclaimer)
        setModalTel(false)
        setModalOffice(false)
        setModalName(false)
        setModalBannerPic(false)
        setModalProfilePic(false)
        setModalDesc(false)
    }


    

    const navigate = useNavigate();
    
    useEffect(() => {
      if (user === null) {
        
        navigate('/');
      }
    }, [user]);

    return  (

        <Layout>
            <Navbar/>
            { timeHome && message&& <Message text={message.text} type={message.type}/>}
            {
                user && isAuthenticated ? (
                    (user.type === "default") ? 
                    <>
                    <form className='form' onSubmit={(e) => {onSubmit(e)}} method='POST'>
                        <p className='title'>Perfil de usuario</p>
                        
                        {
                            edit ? (
                                <div className='input-name'>
                                    <input
                                    id='name'
                                    value={name}
                                    name='name'
                                    type='text'
                                    onChange={e=>onChange(e)}
                                    required
                                    className='name'
                                    placeholder={user.name}
                                    />
                                    <div className="image-div">
                                        <img className='image' onClick={handleEdit} src={cancelLogo} />

                                    </div>
                                </div>
                            ):(
                                <div className='input-name' >
                                    <p className="name">{user.name}</p>
                                    <div className="image-div">

                                        <img className='image' onClick={handleEdit} src={editLogo} />
                                    </div>
                                </div>
                            )
                        }
                        
                        
                        

                        
                        <div className='forgot'>
                            <p onClick={onClickResetPassword} className='forgot-link'>
                                Olvide mi contrasena
                            </p> 
                        </div>

                        <div className='button'>
                            {
                                loading ? (<StandarBotton  type={"submit"} text={"Cargando"}  loading_component={<Loading color={'#ffffff'} width={'15px'} height={'15px'}/>}/>):(<StandarBotton  type={"submit"} text={"Guardar Cambios"}/>)
                            }
                            
                        </div>
                    </form>

                    <div className="form eliminate">
                        <StandarBotton onClickAction={handleDeleteModal}  type={"submit"} text={"Eliminar Cuenta"} />
                    </div>
                    {
                        openModal ? (
                            <DeleteModal onClose={handleDeleteModal}/>
                        ): (
                            <></>
                        )
                    }
                    </>
                    :
                    <>
                
        
                        <div className="container-profile-publisher">
                            <p className='title'>Perfil de usuario</p>
                            <div className="contain-items">
                                <div className="cont-profile-image">
                                    <p className="title-cont">Foto de perfil: </p>
                                    <div className="profile-imageprofile">
                                        {user.profile_picture && typeof user.profile_picture === 'string' ? (
                                            <img className="img-profile" src={user.profile_picture} alt="profile picture" />
                                        ) : null}
                                    </div>
                                    <p className="edit" onClick={openEditProfilePicture}>Editar</p>
                                </div>

                                <div className="cont-profile-image">
                                    <p className="title-cont">Foto de portada: </p>
                                    <div className="profile-imageprofile">
                                        {user.banner_picture && typeof user.banner_picture === 'string' ? (
                                            <img className="img-profile" src={user.banner_picture} alt="profile picture" />
                                        ) : null}
                                    </div>
                                    <p onClick={openEditBannerPicture} className="edit">Editar</p>
                                </div>

                                <div className="cont-name">
                                    <div className="cont-min-office">

                                        <p className="title-cont">Nombre: </p>
                                        <p className="name">{user.name}</p>
                                        <p onClick={openModalName} className="edit">Editar</p>
                                    </div>
                                </div>

                                <div className="cont-office">
                                    {
                                        user.office? (
                                            <div className="cont-min-office">
                                                <p className="title-cont">Oficina:</p>
                                                <p className="office"> {user.office}</p>
                                                
                                                <p onClick={openModalOffice} className="edit">Editar</p>
                                            </div>
                                        ):(
                                            <p onClick={openModalOffice} className="edit">Anadir oficina</p>
                                        )
                                    }
                                </div>
                                
                                <div className="cont-phone">
                                    <p className="title-cont">Telefono/Cel: </p>
                                    <p className="phone">{user.phone_number}</p>
                                    <p onClick={openModalTel} className="edit">Editar</p>
                                </div>
                            </div>

                            <div className="contain-texts">
                                <div className="cont-description">
                                    <p className="title-cont">Descripcion: </p>
                                    <p className="description">{user.description}</p>
                                    <p onClick={openModalDesc} className="edit">Editar</p>
                                </div>
                                
                                <div className="cont-description">
                                    {
                                        user.disclaimer ? 
                                        (
                                            <div className="min-cont-disclaimer">
                                            
                                                <p className="title-cont">Disclaimer: </p>
                                                <p className="description">{user.disclaimer}</p>
                                                <p onClick={openModalDisclaimer} className="edit">Editar</p>
                                            </div>

                                        ):(
                                            <div className="min-cont-disclaimer">
                                                <p className="title-cont">Disclaimer: </p>
                                                <p onClick={openModalDisclaimer} className="edit">Anadir disclaimer</p>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                            
                            
                            
                            
                        </div>
                        <div className="contain-bottons">
                            <div className='forgot'>
                                <p onClick={onClickResetPassword} className='forgot-link'>
                                    Olvide mi contrasena
                                </p> 
                            </div>

                            <div className='button'>
                                {
                                    loading ? (<StandarBotton  type={"submit"} text={"Cargando"}  loading_component={<Loading color={'#ffffff'} width={'15px'} height={'15px'}/>}/>):(<StandarBotton  type={"submit"} text={"Ver mis publicaciones"}/>)
                                }
                                
                                <StandarBotton onClickAction={handleDeleteModal}  type={"submit"} text={"Eliminar Cuenta"} />
                                
                            </div>
                        </div>
                         
                        {
                            openModal ? (
                                <DeleteModal onClose={handleDeleteModal}/>
                            ): (
                                <></>
                            )
                        }

                        {
                            modalProfilePic ? (
                                <EditProfilePictureModal onClose={openEditProfilePicture}/>
                            ): 
                            (
                                <></>
                            )

                        }
                        {

                            modalBannerPic ? (<EditBannerPictureModal onClose={openEditBannerPicture}/>):(<></>)
                        }
                        {
                            modalName ? (<EditNameModal onClose={openModalName}/>):(<></>)
                        }
                        {
                            modalOffice ? (<EditOfficeModal onClose={openModalOffice}/>):(<></>)
                        }
                        {
                            modalTel ? (<EditTelModal onClose={openModalTel}/>):(<></>)
                        }
                        {
                            modalDesc ? (<EditDescModal onClose={openModalDesc}/>):(<></>)
                        }
                        {
                            modalDisclaimer ? (<EditDisclaimerModal onClose={openModalDisclaimer}/>):(<></>)
                        }
                    </>
                ):(
                    <p>error</p>
                )
            }
        
      
        </Layout>
    )
};

const mapStateToProps= (state:RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    user: state.auth.user,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {
    reset_password,
    remove_message,
    change_name
})(ProfilePage);