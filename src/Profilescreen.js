import React from 'react'
import Nav from './Nav'
import { auth } from './firebase'
import './Profilescreen.css'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice';
import Planscreen from './Planscreen';

function Profilescreen() {
    const user = useSelector(selectUser);


  return <div className='profileScreen'>
    <Nav />
    <div className='profileScreen__body'>
        <h1>Edit Profile</h1>

        <div className='profileScreen__info'>
            <img 
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg' 
            alt='' 
            />
            <div className='profileScreen__details'>
                <h2>{user.email}</h2>
                <div className='profileScreen__plans'>
                    <h3>Plans</h3>

                    <Planscreen />
                    <button
                     onClick={() => auth.signOut()}
                     className='profileScreen__signOut'>Sign Out</button>
                </div>
            </div>
        </div>
    </div>
  </div>
}

export default Profilescreen