import React, { useState } from 'react'; 
import './Loginscreen.css';
import Signupscreen from './Signupscreen';

function Loginscreen() {
    const [signin, setSignIn] = useState(false);



  return <div className='loginScreen'>
    <div className='loginScreen__background'>
       <img
        className='loginScreen__logo'
         src='https://th.bing.com/th/id/R.a1f673e7df715f16dae49f4874009082?rik=1oW0xBGxcarNqw&pid=ImgRaw&r=0'
         alt='' 
         />

        <button onClick={() => setSignIn(true)} className='loginScreen__button' >
            Sign In
        </button>

        <div className='loginScreen__gradient' />

    </div>

    <div className='loginScreen__body'>
        {signin ? (
            <Signupscreen/>

        ) : (
        <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

            <div className='loginScreen__input'>
                <form>
                    <input type='email'
                    placeholder='Email Address'
                    />

                    <button onClick={() => setSignIn(true)} className='loginScreen__getStarted'>GET STARTED</button>
                </form>
            </div>
        </>
        )}
    </div>
    </div>
}

export default Loginscreen;