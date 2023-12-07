import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Logo from './../../assets/images/logo/logo.png';
import SignUpModal from './../SignUpModal/SignUpModal';
import './Header.scss';



const Header = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    return(
        <>
        <div className="header">
            <div className="header__nav">
                <div className="header__logo">
                    <Link to='/'>
                        <img className='header__logo-img' src={Logo} alt="logo" />
                    </Link>
                    
                </div>
                <div className="headr__container">
                    <ul className='header__nav-list'>
                        <Link className='header__link' to='/'>
                            <li className='header__nav-item'>Homepage</li>
                        </Link>
                        <button className='header__nav-item header__nav-item--sign-in'>Sign In</button>
                        <button className='header__nav-item header__nav-item--sign-up' onClick={openModal}>Sign Up</button>
                    </ul>
                </div>
            </div>
        </div> 
        <SignUpModal isOpen={isModalOpen} onClose={closeModal} />    
        </>
    );
}
export default Header;