import './signup-login.css';
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

const SignUp = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://localhost:3000/api/register', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Data created:', response.data);
          // Optionally, you can clear the form after successful submission
          setFormData({ firstName: '', lastName:'', email: '', password: ''});
          toast.success("Account created successfully!");
        } catch (error) {
            // Checking for the specific error message from the backend
            if (error.response && error.response.data.message === 'Email already in use.') {
              toast.error("Email already in use. Please try another one.");
            } else {
              toast.error("Failed to create account. Please try again.");
            }
          }
    };

    const navigate = useNavigate();
    const goToLogin = useCallback( () =>{
        navigate('/login')
    }, [navigate]);

    return ( 
        <div className="container" id='radius'>
            <ToastContainer />
            <div className="content"> 
            <div className="background-overlay">
            <h1>Welcome to Mentor.Me</h1>
                <p>Women-to-Women Mentorship platform. This a place to be empowered and mentored and exapnd your network.</p>
                {/* <a href="#">Read More</a> */}
                <button>Read More</button>
            </div>
            </div>  

            <form className="form" onSubmit={handleSubmit}>
                
                <div className="texts">
                    <h1>Create Account</h1>
                    <div className="subtitle">Let's get you connected & mentored</div>
            
                    {/* <div className="google">
                        <img src={google_icon} alt="" />
                        <input type="button" value="Sign in with Google" />
                    </div>   */}
                    {/* <div className="underline">
                        <div className="line"></div> 
                        <div className="or">Or</div> 
                        <div className="line"></div>        
                     </div>        */}
                          
                </div>
                <div className="inputs">
                    <div className="inputfield">
                        <img src={profile_icon} alt="" />
                        <input type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange}/>
                    </div>
                    <div className="inputfield">
                        <img src={profile_icon} alt="" />
                        <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange}/>
                    </div>
                    <div className="inputfield">
                        <img src={email_icon} alt="" />
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="inputfield">
                        <img src={password_icon} alt="" />
                        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange}/>
                    </div>
                </div>
                <div className="submit-container">
                    <input type="submit" value='Sign Up' onSubmit={goToLogin}/>
                    {/* <div className="submit">Sign Up</div> */}
                    <div className="account">Already have an account? <span onClick={goToLogin}>Login</span></div>
                </div>
            </form>

        </div>

     );
} 
export default SignUp;

