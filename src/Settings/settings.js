import './settingstyling.css';
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import password_icon from '../icons/password.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';


const Settings = () => {
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(window.atob(base64));
            setIsAdmin(payload.role && payload.role === 'Admin'); // Set isAdmin based on the role in the token
        }
    }, []);

    const goToAddingUsers = useCallback(() => {
        navigate('/add-users');
    }, [navigate]);


    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;
    
        if (newPassword !== confirmPassword) {
            return toast.error('New password and confirm new password must match');
        }
    
        try {
            // Get the token from localStorage or wherever you store it after login
            const token = localStorage.getItem('token');
    
            // Check if the token exists
            if (!token) {
                return toast.error('User is not authenticated');
            }
    
            // Include the token in the request headers
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
    
            const response = await axios.post('http://localhost:3000/api/change-password', {
                currentPassword,
                newPassword,
                confirmNewPassword: confirmPassword
            }, config);
    
            console.log(response.data); // Log the response
            toast.success('Password changed successfully');
            // Redirect or display a success message
        } catch (error) {
            console.error('Error changing password:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error changing password. Please try again.');
            }
        }
    };
    

    return ( 
        <div className="settings">
            <ToastContainer />
            <Topbar />
            <Sidebar />
            
            <div className="setting-container">
                <div className="settings-heading">
                    <div className="settings-links">

                        {isAdmin && ( // Conditionally render the Admin button
                            <div className="nav-button">
                                <button onClick={goToAddingUsers}>Admin</button>
                            </div>
                        )}
                        </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="texts">
                            <h1>Change Password</h1>      
                        </div>
                        <div className="inputs">
                            <div className="inputfield">
                                <img src={password_icon} alt="" />
                                <input type="password" name="currentPassword" placeholder='Current Password' value={formData.currentPassword} onChange={handleChange} />
                            </div>
                            <div className="inputfield">
                                <img src={password_icon} alt="" />
                                <input type="password" name="newPassword" placeholder='New Password' value={formData.newPassword} onChange={handleChange} />
                            </div>
                            <div className="inputfield">
                                <img src={password_icon} alt="" />
                                <input type="password" name="confirmPassword" placeholder='Confirm New Password' value={formData.confirmPassword} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="submit-container">
                            <input type="submit" value='Change My Password'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Settings;