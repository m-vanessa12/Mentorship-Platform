import './signup-login.css';
import email_icon from '../icons/mail.png';
import google_icon from '../icons/google.png';
import profile_icon from '../icons/profile.png';
import password_icon from '../icons/password.png';
import { useState} from 'react'; // Combine imports for useState and useContext
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    //const { login } = useContext(AuthContext); // Moved useContext call to the top level

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            const { message, token } = response.data;
            if (message === 'Login Successful') {
                // Save token to local storage
                localStorage.setItem('token', token);
    
                const decoded = jwtDecode(token);
                const { role } = decoded;
    
                // Using a switch statement can make this more readable
                switch (role) {
                    case 'Mentee':
                        navigate('/mentee-profile-create');
                        break;
                    case 'Mentor':
                        navigate('/mentor-profile-create');
                        break;
                    case 'Admin':
                        navigate('/update-users'); // Ensure this is the correct route for the admin page
                        break;
                    default:
                        toast.error('Role not recognized');
                }
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login.');
        }
    };
    
    

    const goToSignUp = () => {
        navigate('/signup');
    };

    return ( 
        <div className="container" id='radius'>
             <ToastContainer />
             
            <div className="content"> 
                <div className="background-overlay">
                    <h1>Welcome to Mentor.Me</h1>
                    <p>Women-to-Women Mentorship platform. This a place to be empowered and mentored and exapnd your network.</p>
                    <button>Read More</button>
                </div>
            </div>  

            <form className="form" onSubmit={handleSubmit}>
                <div className="texts">
                    <h1>Login</h1>
                    <div className="subtitle">Let's get you connected & mentored</div>
                
                </div>
                <div className="inputs">
                    <div className="inputfield">
                        <img src={email_icon} alt="" />
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="inputfield">
                        <img src={password_icon} alt="" />
                        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <div className="submit-container">
                    <input type="submit" value='Login'/>
                    <div className="account">Don't have an account? <span onClick={goToSignUp}>Sign-Up</span></div>
                </div>
            </form>
        </div>
    );
};

export default Login;