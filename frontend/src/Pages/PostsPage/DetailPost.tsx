import React, { useEffect, useState } from 'react';
import "./Posts.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import { get_property, remove_fav_post, add_fav_post, get_favorites_posts } from "@/redux/actions/posts";
import { redirect, useNavigate, useParams } from 'react-router';
import { Post, PostDetail } from '@/Interfaces/PostsInterfaces';
import favorite from "@/assets/favorite.svg";
import AuthenticationModal from "@/Components/Modals/AuthenticacionModal";
import next from'@/assets/next.svg';
import prev from "@/assets/prev.svg";
import Icon from '@/Components/ListCard/Icon';
import "leaflet/dist/leaflet.css";
import DOMPurify from 'dompurify';
import { Map } from '@/Components/Map/Map';
import wppIcon from '@/assets/wppIcon.svg';
import StandarBotton from '@/Components/Buttons/StandarButton';
import Loading from '@/Components/Loadings/Loading';
import {send_message} from '@/redux/actions/messages';
import { is_favorite } from '@/redux/actions/posts';
import { User } from '@/Interfaces';

interface DetailPostProps {
    send_message:(content:string, id_user_receiver:number) => void;
    get_property:(uid:string|undefined)=>void;
    post: PostDetail | null;
    isAuthenticated: boolean;
    isFavorite?: boolean;
    remove_fav_post: (id:number)=> void;
    add_fav_post: (id:number)=> void;
    get_favorites_posts: ()=> void;
    user: User | null;
    loading: boolean;
    favorites_posts_list: Post[] | undefined;
    is_favorite:(id:number, favorites_posts_list:Post[]) => void;
    //last_message: Message|null;
}

const DetailPost: React.FC<DetailPostProps> = ({
    is_favorite,
    send_message,
    get_property,
    post,
    isAuthenticated,
    isFavorite,
    remove_fav_post,
    add_fav_post,
    get_favorites_posts,
    loading,
    favorites_posts_list,
    user
    //last_message
}) => {
    
    const navigate = useNavigate();
    const params = useParams()
    const uid = params.uid
    

    useEffect(() => {
        get_property(uid)
        
    },[uid])

    

    
    

    const [formData, setFormData] = useState({
        name: '',
        mensaje: ''
    });

    const {name, mensaje} = formData;
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (post){
            send_message(`Propiedad: ${post.property.title}, uid: ${uid}, Mensaje:${mensaje}`, post.property.author.id )

        }
    }
    

    const actionHandleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (post){
            
            if (isFavorite) {
                
                await remove_fav_post(post.property.id)
            } else {
                await add_fav_post(post.property.id)
            }
            await get_favorites_posts()

        } 
    }

    useEffect(() => {
        console.log(isFavorite)
        if(post && favorites_posts_list){
            is_favorite(post.property.id, favorites_posts_list)
        }
    },[ actionHandleFavorite])

    const [openModalAuth, setOpenModalAuth] = useState(false)

    const openModalAuthentication = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenModalAuth(true)
    }

    const closeModalAuthentication = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenModalAuth(false)
    }  

    const onNav = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate('/login')
    }
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = (e: React.MouseEvent) => {
        
        e.stopPropagation();
        if (post?.property.images.length || 0 > currentImageIndex){
            setCurrentImageIndex(currentImageIndex+1);
        } 

    };
    const handlePrevImage = (e: React.MouseEvent) => {
        
        e.stopPropagation();
        if ( currentImageIndex >= 0 ){
            setCurrentImageIndex(currentImageIndex-1);
        } 

    };

    const [video, setVideo] = useState(false)
    
    const handleSetVideo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setVideo(true)
        
        
    }

    const handleSetQuitVideo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setVideo(false)
        
    }

    const operationTraslate = (op:string) => {
        switch(op){
            case 'rent':
                return 'Alquiler'
            case  'sale':
                return 'Venta'
            case 'other':
                return 'Otra'
            case 'audiction':
                return 'Remate'
            default:
                return ''
        }

    }

    const stateTraslate = (state:string) => {
        switch(state){
            case 'available':
                return 'Disponible'
            case  'reserved':
                return 'reservado'
            
        }
    }

    

    const servicesTraslate = (ser:string) => {
        switch(ser){
            case 'electricity':
                return 'Electricidad'
            case 'water':
                return 'Agua corriente'
            case 'sewer':
                return 'Cloaca'
            case 'care':
                return 'Cuidados'
            case 'maintenance':
                return 'Mantenimiento'
            case 'gas':
                return 'Gas'
            default:
                return ser
            
        }
    }

    const featuresTraslate = (ft:string, n:number) => {
        switch(ft){
            case 'bedrooms':
                if(n>1){
                    return `${n} Habitaciones`
                } else {
                    return '1 Habitacion'
                }
            case 'toilets':
                if(n>1){
                    return `${n} Tocadores`
                } else {
                    return '1 Tocador'
                }
            case 'bathroom':
                if(n>1){
                    return `${n} Baños`
                } else {
                    return '1 Baño'
                }
            case 'flats':
                if(n>1){
                    return `${n} Pisos`
                } else {
                    return '1 Piso'
                }
            case 'garage':
                if(n>1){
                    return `${n} Cocheras`
                } else {
                    return '1 cochera'
                }
            case 'environments':
                if(n>1){
                    return `${n} Ambientes`
                } else {
                    return '1 ambiente'
                }
            default:
                return ft
            
        }
    }

    const lat = post?.property.latitude
    const lng = post?.property.longitude

    

    const handleWhatsAppClick = () => {
        if (post) {
            const phoneNumber = post.property.author.phone_number;
        
            // Formatea el número de teléfono eliminando caracteres no numéricos
            const formattedPhoneNumber = phoneNumber?.replace(/\D/g, '');
        
            // URL de WhatsApp con el número de teléfono
            const whatsappUrl = `https://wa.me/${formattedPhoneNumber}`;
        
            // Abre la ventana de WhatsApp en una nueva pestaña
            window.open(whatsappUrl, '_blank');
        }
    };

    const redirect_edit = () => {
        if (post){

            navigate(`/edit/${post.property.uid}`)
        }
    }
    
    return (
        <Layout>
            <Navbar/>
            {
                post?
                <section className='section-detail-post'>
                    <div className='top-detail-post'>
                        <h1 className='title-detail-post'>{post.property.title}</h1>
                        <img onClick={isAuthenticated? actionHandleFavorite:openModalAuthentication} className={isFavorite ?"favorite-icon-active":"favorite-icon"} src={favorite} />
                        {
                            user?.id === post.property.author.id ? 
                            <div className='button-edit'>
                                <StandarBotton text='Editar' onClickAction={redirect_edit}/>

                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className='image-cont-detail-post'>
                        {
                            video?
                            <>
                                <video 
                                onContextMenu={e => e.preventDefault()}
                                id='video-post'
                                controlsList='nodownload'
                                //onCanPlay={() => setVideoLoaded(true)}
                                controls
                                data-setup="{'playbackRates': [0.5, 1.5, 20], 'fluid':true}"
                                className='img-detail-post' >
                                    <source src={`${post.property.video}`} />
                                </video>

                           
                                <img  className="prev-icon-detail" src={prev} onClick={handleSetQuitVideo}/>
                            
                            </> 
                            :
                            <>
                            <img
                                className="img-detail-post"
                                src={`${post.property.images[currentImageIndex].image}`}
                                alt={`Property Image ${currentImageIndex + 1}`}
                            />
                            {
                            (currentImageIndex < post.property.images.length-1) ?
                            <>
                                <img className="next-icon-detail" src={next} onClick={handleNextImage}/>
                            </>
                            :
                            <>
                            </>
                        }

                        {
                            currentImageIndex > 0 ?
                            <>
                                <img  className="prev-icon-detail" src={prev} onClick={handlePrevImage}/>
                            </>
                            :
                            <>
                            </>
                        }

                        {
                            ((currentImageIndex+1 === post.property.images.length) && post.property.video && !video) ?
                                <img className="next-icon-detail" src={next} onClick={handleSetVideo}/>
                            : 
                            <>
                            </>
                        }
                            </>

                        }
                        
                    </div>
                    <div className='big-cont-detail'>
                        <div className='left-side'>
                            <div className='pricing-detail-post'>
                                <div className='cont-span-detail'>
                                    <span className='span-detail'>{operationTraslate(post.property.operation)}</span>
                                    <span className='span-detail'>{stateTraslate(post.property.state)}</span>
                                    {
                                        post.property.financing? 
                                        <span className='span-detail'>Financiamiento disponible</span>
                                        :
                                        <></>
                                    }
                                </div>
                                
                                <h2 className='price-detail'>{`${post.property.price } ${post.property.currency_price}`}</h2>
                                {
                                    post.property.expenses ? 
                                        <p className='expenses-detail'>{`Expensas: ${post.property.expenses } ${post.property.currency_expenses}`}</p>
                                    :
                                        <></>
                                }
                                <div className='icons-detail'>

                                    {
                                        post.property.cover_sup ? 
                                        <Icon type='surface' value={post.property.cover_sup}/>
                                        :
                                        <></>
                                    }   
                                    {
                                        post.property.features.map((feature, index) => (
                                            <div key={index}>
                                                <Icon type={feature.name} value={feature.value}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='description-detail-post'>
                                <h3>Descripcion</h3>
                                <p className='description-detail' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.property.description)}}/>
                            </div>
                        
                            <div className='description-detail-post'>
                                <h4>Servicios</h4>
                                
                                <div className='services-cont-detail'>
                                    {
                                        post.property.services.map((services, index) => (
                                            <p key={index} className='service-detail'>{servicesTraslate(services)}</p>
                                            ))
                                    }
                                </div>
                                <h4>Caracteristicas</h4>
                                <div className='services-cont-detail'>
                                    {
                                        post.property.features.map((feature, index) => (
                                            <p key={index} className='service-detail'>{featuresTraslate(feature.name, feature.value)}</p>
                                        ))
                                    }
                                    {
                                        post.property.antiquity ?
                                        <p className='service-detail'>{`Antiguedad: ${post.property.antiquity} años`}</p>:<></>
                                    }
                                    
                                </div>
                                <h4>Dimensiones</h4>
                                <div className='services-cont-detail'>
                                    {
                                        post.property.terrain_sup ? 
                                        <p className='service-detail' >{`Terreno: ${post.property.terrain_sup} m²`}</p>:<></>
                                    }
                                    {
                                        post.property.cover_sup ? 
                                        <p className='service-detail' >{`Supercifie cubierta: ${post.property.cover_sup} m²`}</p>:<></>
                                    }
                                    {
                                        post.property.total_sup ? 
                                        <p className='service-detail' >{`Supercifie total: ${post.property.cover_sup} m²`}</p>:<></>
                                    }
                                </div>
                            </div>

                            <div className='description-detail-post'>
                                <h3>Ubicacion</h3>
                                <p className='service-detail'>{`
                                ${post.property.province}, 
                                ${post.property.city}, 
                                ${post.property.street}
                                ${post.property.street_number},
                                ${post.property.num_flat ? post.property.num_flat:''}
                                ${post.property.id_department ? post.property.id_department:''}
                                `}</p>


                                {
                                    lat && lng ?
                                    (
                                    <Map id={post.property.id} lat={lat} lng={lng}/>
                                    )
                                    :
                                    (
                                    <></>
                                    )
                                }
                            </div>
                        </div>
                        <div className='right-side'>
                            
                            <div className='description-detail-post rig'>
                                <div className='top-right'>
                                    <p>Contacto: </p>
                                    <div className='cont-icons'>
                                        <p className='email-adress'>{post.property.author.email}</p>
                                        <img onClick={handleWhatsAppClick} className='icons-contact' src={wppIcon} />
                                    </div>
                                </div>
                                <div className='author-detail'>
                                    <div className="profile-imageprofile">
                                        <img className='img-profile' alt='profile picture' src={`${post.property.author.profile_picture}`} />
                                    </div>
                                    <p className='name-author-detail'>{post.property.author.name}</p>
                                    {
                                        post.property.author.office ? 
                                        <p className='office-author-detail'>{post.property.author.office}</p>
                                        : <></>
                                    }
                                </div>
                                <label htmlFor='form-message' className='title-message'>
                                    Envianos un mensaje
                                </label>
                                <form id='form-message' className='form-message' onSubmit={(e)=>{onSubmit(e)}} method='POST'>
                                    <label htmlFor='name' className='sr-only'>
                                        Nombre y contacto
                                    </label>
                                    <input
                                    id='name'
                                    value={name}
                                    name='name'
                                    type='text'
                                    onChange={e=>onChange(e)}
                                    required
                                    className='input-message'
                                    placeholder='Nombre '
                                    />
                                    <label htmlFor='mensaje' className='sr-only'>
                                        Mensaje
                                    </label>
                                    <textarea
                                        id='mensaje'
                                        value={mensaje}
                                        name='mensaje'
                                        style={{ resize: 'none' }}
                                        onChange={e=>onChangeText(e)}
                                        required
                                        className='input-message text'
                                        placeholder='Mensaje '
                                    />
                                    <div className='button'>
                                    {
                                        loading ? (<StandarBotton type={"submit"} text={"Cargando"} loading_component={<Loading width={'15px'} height={'15px'} color={'#ffffff'}/>}/>):(<StandarBotton type={"submit"} text={"Enviar"}/>)
                                    }
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    
                </section>
                :
                <>
                </>
            }
        { openModalAuth ? <AuthenticationModal onNav={onNav} onClose={closeModalAuthentication}/> : <></>}
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    post: state.posts.post,
    loading:state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    favorites_posts_list: state.posts.favorites_posts_list?.results,
    isFavorite: state.posts.isFavorite,
    last_message: state.messages.last_message,
    user: state.auth.user
})

export default connect(mapStateToProps, {
    send_message,
    get_property,
    remove_fav_post,
    add_fav_post,
    get_favorites_posts,
    is_favorite
})(DetailPost)