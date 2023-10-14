import React, { useEffect, useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();

    const transitionNavBar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () =>window.removeEventListener('scroll', transitionNavBar)
    }, [])

    
  return (
<div className={`nav ${show && 'nav__black'}`}>
        <div className='nav__contents'>
     <img 
     onClick={() => navigate("/")}
       className='nav__logo'
        src='https://th.bing.com/th/id/R.a1f673e7df715f16dae49f4874009082?rik=1oW0xBGxcarNqw&pid=ImgRaw&r=0' 
        alt=''
    />

    <img 
    onClick={() => navigate("/profile")}
       className='nav__avatar'
       src='https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg'
       alt=''
    />
</div>
    
        
    </div>
  )
}

export default Nav