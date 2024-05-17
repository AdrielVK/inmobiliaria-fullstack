import { Post } from "@/Interfaces/PostsInterfaces";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListCards.css"
import Icon from "./Icon";
import favorite from "@/assets/favorite.svg";
import message from "@/assets/message.svg";
import { useState } from "react";
import next from'@/assets/next.svg';
import prev from "@/assets/prev.svg";
import { connect } from "react-redux";
import { RootState } from "@/redux/reducers";
import { add_fav_post, remove_fav_post, get_favorites_posts } from "@/redux/actions/posts";
import AuthenticationModal from "../Modals/AuthenticacionModal";



interface ListCardProps{
    index: number;
    data: Post ;
    add_fav_post: (id:number) => void;
    remove_fav_post: (id:number) => void;
    get_favorites_posts: () => void;
    isFavorite?: boolean;
    isAuthenticated: boolean;
}

const ListCard: React.FC<ListCardProps> = ({
    data,
    remove_fav_post,
    add_fav_post,
    get_favorites_posts,
    isFavorite,
    isAuthenticated
}) => { 

    const navigate = useNavigate();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (data.images.length > currentImageIndex){
            setCurrentImageIndex(currentImageIndex+1);
        } 

    };
    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if ( currentImageIndex >= 0 ){
            setCurrentImageIndex(currentImageIndex-1);
        } 

    };

    

    const actionHandleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isFavorite) {
            
            await remove_fav_post(data.id)
        } else {
            await add_fav_post(data.id)
        }
        await get_favorites_posts()
    }

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/detail/${data.uid}`);
    };
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
    

    return (
        <li className="card-list">
            

            { openModalAuth ? <AuthenticationModal onNav={onNav} onClose={closeModalAuthentication}/> : <></>}
            <div onClick={handleCardClick} className="link-card">
                <div className="img-card-content">
                    <img
                        className="img-card"
                        src={`${data.images[currentImageIndex].image}`}
                        alt={`Property Image ${currentImageIndex + 1}`}
                    />

                    {
                        currentImageIndex < data.images.length-1 ?
                        <>
                            <img className="next-icon" src={next} onClick={handleNextImage}/>
                        </>
                        :
                        <>
                        </>
                    }

                    {
                        currentImageIndex > 0 ?
                        <>
                            <img  className="prev-icon" src={prev} onClick={handlePrevImage}/>
                        </>
                        :
                        <>
                        </>
                    }
                    
                </div>
                    
                <div className="content-card">
                    <div className="top">
                        <p className="price">{data.price}</p>
                        <p className="price">{data.currency_price}</p>
                        {
                            data.expenses ? 
                            <p className="expenses">
                                {` + ${data.expenses}`}
                            </p>
                            :
                            <>
                            </>
                        }
                        {
                            data.currency_expenses ? 
                            <p className="expenses">
                                {`${data.currency_expenses} expensas`}
                            </p>
                            :
                            <>
                            </>
                        }
                         

                        <img onClick={isAuthenticated? actionHandleFavorite:openModalAuthentication} className={isFavorite ?"favorite-icon-active":"favorite-icon"} src={favorite} />

                                 
                        
                    </div>
                    <div className="mid">
                        <h3 className="title-card">{data.title}</h3>
                        <p className="direction">{`${data.street} ${data.street_number? data.street_number : <></>}`}</p>
                        <p className="add-direction">{`${data.province} , ${data.city}`}</p>
                    </div>
                    <div className="features-list">
                        {
                            data.cover_sup ? 
                            <>
                                <Icon type="surface" value={data.cover_sup}/>
                                
                            </>
                            :
                            <></>
                        }
                        {
                            
                            data.features.map((feature, index) => (
                                <div key={index}>
                                    
                                    <Icon type={feature.name} value={feature.value}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="bot">
                    
                        {
                            data.author.profile_picture?
                            <>
                                <div className="profile-imageprofile">
                                    {data.author.profile_picture && typeof data.author.profile_picture === 'string' ? (
                                        <img className="img-profile" src={data.author.profile_picture} alt="profile picture" />
                                    ) : null}
                                </div>
                                <p className="name-card-author">
                                    {data.author.name}
                                </p >
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}

const mapStateToProps = (state:RootState, ownProps: ListCardProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isFavorite: state.posts.favorites_posts_list?.results.some(
        (favPost) => favPost.id === ownProps.data.id
    ) || false,
})

export default connect(mapStateToProps, {
    add_fav_post,
    remove_fav_post,
    get_favorites_posts
})(ListCard);
