import React from 'react';
import './Modal.css';
import StandarBotton from '../Buttons/StandarButton';
import { edit_picture_banner } from '@/redux/actions/auth';
import { useState } from 'react';
import fileImage from '@/assets/image.svg'
import { User } from '@/Interfaces';
import { connect } from 'react-redux';
import { RootState } from '@/redux/reducers';
import Loading from '../Loadings/Loading';

interface EditBannerPictureModalProps {
    edit_picture_banner: (new_banner_picture:File | null) => void;
    onClose: () => void;
    user: User | null;
    loading:boolean;
    
};

const EditBannerPictureModal: React.FC<EditBannerPictureModalProps> = ({
    onClose,
    user,
    loading,
    edit_picture_banner
}) => {

    

    const [bannerPic, setBannerPic] = useState<File | null>(null)

    const fileSelectedHandlerBanner = (e:React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0]
        if(file){

            let reader = new FileReader();
            reader.readAsDataURL(file);
            
            setBannerPic(file)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("profilePic")
        edit_picture_banner(bannerPic)
    }

    return(
        <div className="modal-overlay">
        
            
            <form className='modal-content' onSubmit={(e) => {onSubmit(e)}} method='POST'>

                <div className='micro-cont-images'>
                    <label htmlFor='profile_picture' className='sr-only-modal'>
                        
                        Cambiar foto de portada
                    </label>
                    
                    <div className="custom-file-input-modal">
                        <div className="profile-imageprofile-modal">
                            {
                                user? (
                                    user.banner_picture && typeof user.banner_picture === 'string' ? (
                                        <img className="img-profile" src={user.banner_picture} alt="profile picture" />
                                    ) : null
                                ):(<></>)
                            }
                        </div>
                        <label htmlFor="profile_picture" className="custom-image-input-label">
                            <img src={fileImage} alt='profile picture' />
                        </label>
                        <input
                            id="profile_picture"
                            name="profile_picture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => fileSelectedHandlerBanner(e)}
                            className="image-inputs"
                        />
                        <span className="selected-file-text">{bannerPic? <>{bannerPic.name.length > 7 ? <>{`${bannerPic.name.slice(0,8)}...`}</>:<>{bannerPic.name}</>}</>:<>Sin archivos seleccionados</>}</span>
                    </div>
                </div>

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
    edit_picture_banner,
    
})(EditBannerPictureModal);