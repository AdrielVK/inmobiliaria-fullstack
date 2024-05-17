import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
//import { RootState } from "@/redux/reducers";
import { connect } from 'react-redux';
import { User } from "@/Interfaces";
import { RootState } from "@/redux/reducers";
import logoutIcon from "@/assets/logout.svg";

interface DropdownProps {
    handleModal: () => void;
    user: User | null
}

const Dropdown: React.FC<DropdownProps> = ({
    handleModal,
    user,
}) => {

    return (
        <div className="dropdown">
            <ul className={`dropdown-menu`}>
                <li>
                    <Link className="item-menu" to='/userprofile'>Ir a perfil</Link>
                    
                </li>
                {
                    user && user.type === "publisher" ?
                    <>
                        <li>
                            <Link className="item-menu" to='/userprofile/posts'>Ver publicaciones</Link>   
                        </li>
                    </>
                    :
                    <>
                    </>
                }
                <li>
                    <Link className="item-menu" to='/messages'>Mensajes</Link>
                </li>
                <li>
                    <Link className="item-menu" to='/favorites'>Favoritos</Link>
                </li>
                <li>
                    <div className="item-menu close" onClick={handleModal}>Cerrar sesion</div>
                    <img className="icon" src={logoutIcon}/>
                </li>
            </ul>
                
        </div>
    )
}

const mapStateToProps= (state:RootState) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {
    
})(Dropdown);