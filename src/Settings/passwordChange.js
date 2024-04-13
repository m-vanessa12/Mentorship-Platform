import '../signup-login/signup-login.css';
import email_icon from '../icons/mail.png';
import google_icon from '../icons/google.png';
import profile_icon from '../icons/profile.png';
import password_icon from '../icons/password.png';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
//import mentorship_img from '../img/mentorship.avif'

import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const passwordChange = () => {

    return ( 
        <div className="container" id='radius'>
            <ToastContainer />
            <div className="content"> 
            <div className="background-overlay">
            <h1>Welcome to WomenT</h1>
                <p>Women-to-Women Mentorship platform. This a place to get empowered and mentored </p>
                {/* <a href="#">Read More</a> */}
                <button>Read More</button>
            </div>
            </div>  

            <form className="form" onSubmit={handleSubmit}>
                
                <div className="texts">
                    <h1>Create Account</h1>
                    <div className="subtitle">Let's get you connected & mentored</div>
            
                    <div className="google">
                        <img src={google_icon} alt="" />
                        <input type="button" value="Sign in with Google" />
                    </div>  
                    <div className="underline">
                        <div className="line"></div> 
                        <div className="or">Or</div> 
                        <div className="line"></div>        
                     </div>       
                          
                </div>
                <div className="inputs">
                    <div className="inputfield">
                        <img src={profile_icon} alt="" />
                        <input type="text" name="firstName" placeholder='First Name' />
                    </div>
                    <div className="inputfield">
                        <img src={profile_icon} alt="" />
                        <input type="text" name="lastName" placeholder='Last Name'/>
                    </div>
                    <div className="inputfield">
                        <img src={email_icon} alt="" />
                        <input type="email" name="email" placeholder='Email' />
                    </div>
                    <div className="inputfield">
                        <img src={password_icon} alt="" />
                        <input type="password" name="password" placeholder='Password'/>
                    </div>
                </div>
                <div className="submit-container">
                    <input type="submit" value='Sign Up' />
                    {/* <div className="submit">Sign Up</div> */}
                    <div className="account">Already have an account? <span onClick={goToLogin}>Login</span></div>
                </div>
            </form>

        </div>

     );
}
 
export default passwordChange;