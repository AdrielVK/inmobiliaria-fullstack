import React, { useEffect, useState, useRef } from 'react';
import {NavbarInterface} from '@/Interfaces/PagesInterfaces';
import './Navbar.css';
import logo from '../../assets/logo.svg'
import accountCircle from '../../assets/accountCircle.svg'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import { load_user, logout, refresh, check_authenticated} from '@/redux/actions/auth';
import Dropdown from './Dropdown';
import LogoutModal from '../Modals/LogoutModal';


const Navbar: React.FC<NavbarInterface> = ({
    isAuthenticated,
    load_user,
    user,
    logout,
    refresh,
    check_authenticated
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    
    const handleClickOutside = (event: MouseEvent) => {
        if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        
        {refresh()}
            {check_authenticated()}
            {load_user()}
        
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [openModal, setOpenModal] = useState(false)

    
    const handleModalLogout =()=> {
        setOpenModal(!openModal)
    }
    
    const handleLogout = () => {
        console.log("logout")
        logout();
        handleModalLogout()
    }

    
    
    const user_name = () => {
        return user? (user.name.length > 10 ? `${user.name.slice(0,10)}...` : user.name ): <>Ingresar</>
    }

    return (
        <nav className='navbar'>
            <span className='span'>
                
            </span>
            <Link to='/' className='div-logo'>
                <img className='logo' src={logo}/>

            </Link>
            
            <div className='central-navbar'>
                <NavLink className='link' to='/filter/rent'>Alquilar</NavLink>
                <NavLink className='link' to='/filter/sale'>Comprar</NavLink>
                <NavLink className='link' to='/search'>Buscar</NavLink>
                {
                    user?.type === 'publisher' ? 
                    (
                        <NavLink className='link' to='/post'>Publicar</NavLink>
                    ):(
                        <></>
                    )
                }
            </div>
            
                {
                    isAuthenticated? 
                    (
                        <div className='user-div' onClick={handleToggle} ref={dropdownRef}>
                            <div className='user-link' >
                                <img className='user-picture' src={accountCircle}/>
                                <p className='user-text'>{user_name()}</p>
                            </div>
                            { isOpen && <Dropdown handleModal={handleModalLogout}/>}
                            
                        </div>
                    )
                    :
                    (
                    <div className='user-div'>
                        <Link className='user-link' to='/login'>
                            <img className='user-picture' src={accountCircle}/>  
                            <p className='user-text'>Ingresar</p>
                        </Link>
                    </div>
                    )
                }
                {
                    openModal && <LogoutModal onClose={handleModalLogout} onLogout={handleLogout}/>
                }
            
            
        </nav>
        )
};

const mapStateToProps = (state:RootState) =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps,{
    load_user,
    logout,
    refresh,
    check_authenticated
}) (Navbar);