import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './bookedsession.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const NotifiedInterests = () => {
    const [interests, setInterests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

const fetchInterests = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
        toast.error('Authentication error. Please log in.');
        setIsLoading(false);
        return;
    }

    try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        const userId = decodedToken.id; // or the correct key for the user's ID
        console.log('User ID from token:', userId);

        const response = await axios.get(`https://capstone-project-2-aaem.onrender.com/api/mentee-notifications/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response from API:", response);
        setInterests(response.data.interests);
    } catch (error) {
        console.error('Failed to fetch interests:', error);
        toast.error('Failed to load interests.');
    } finally {
        setIsLoading(false);
    }
};


    useEffect(() => {
        fetchInterests();
    }, []);

    if (isLoading) {
        console.log('Component is loading...');
        return <div>Loading...</div>;
    }

    if (interests.length === 0) {
        console.log('No interests found.');
        return <div>No interests received yet.</div>;
    }

    return (
        <div className="booked-sessions">
            <Topbar />
            <Sidebar />
            <div className="displayed-session">
                <h2 className="sessions-title">My Interests</h2>
                {interests.map((interest) => (
                    <div key={interest._id} className="booking-owner">
                        <img src={interest.mentorPhoto || 'path/to/default/image'} alt="Mentor" />
                        <div className="sessions-details">
                            <div className="who-names">{interest.mentorName}</div>
                            <div className="who-time">{new Date(interest.createdAt).toLocaleString()}</div>
                            <div className="session-about">{interest.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotifiedInterests;
