import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import profile_icon from '../img/profile.jpg'; 
import role_icon from '../img/role.png'; 
import './settingstyling.css';

const AdminSpace = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    // Function to fetch users
    const fetchUsers = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/api/platform-users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsers(response.data); // Ensure this matches your actual API response structure
        } catch (error) {
          console.error('Error fetching users:', error);
          toast.error('Failed to fetch users.');
        }
    };
      
      
    const updateUserRole = async (e) => {
        e.preventDefault();
    
        // Assuming you store the auth token in localStorage or manage auth state somehow
        const authToken = localStorage.getItem('token');
    
        try {
            const response = await axios.put(
                `http://localhost:3000/api/admin-dashboard/${selectedUserId}`, // Ensure this matches your backend URL pattern
                { role: selectedRole }, // Request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}` // Include the auth token if needed
                    }
                }
            );
    
            toast.success(response.data.message);
            fetchUsers(); // Refresh the users list if needed
        } catch (error) {
            console.error('Error updating user role:', error.response.data.message);
            toast.error(`Failed to update user role: ${error.response.data.message}`);
        }
    };
    
      

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container" id='radius'>
            <ToastContainer />
            <Topbar />
            <Sidebar />
            <form className="admin-form" onSubmit={updateUserRole}>
                <div className="texts">
                    <h1>Update User Roles</h1>
                </div>
                <div className="inputs">
                    <div className="inputfield">
                        <img src={profile_icon} alt="User Icon" />
                        <select
                            name="Email"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            >
                            <option value="" disabled selected>Choose a user's email</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.email}</option> // Make sure you're using user IDs
                            ))}
                            </select>
                    </div>
                    <div className="inputfield">
                        <img src={role_icon} alt="Role Icon" />
                        <select name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="" disabled selected>Choose a role</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Mentee">Mentee</option>
                        </select>
                    </div>
                </div>
                <div className="submit-role">
                    <input type="submit" value='Update User' />
                </div>
            </form>
        </div>
    );
};

export default AdminSpace;
