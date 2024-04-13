import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './bookedsession.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AcceptInvite = ({ closeModal, sessionId, mentorId, onAcceptSuccess }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const confirmInvite = async (e) => {
        e.preventDefault(); // Prevent form submission
        setIsLoading(true); // Start loading

        // Assuming you store the token in localStorage
        const token = localStorage.getItem('token');

        try {
            await axios.post(`http://localhost:3000/api/${sessionId}/accept`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Session accepted successfully');
            closeModal();
            onAcceptSuccess?.();
            navigate('/mentor-sessions', { state: { mentorId: mentorId, refreshed: true } });

        } catch (error) {
            console.error('Error accepting session:', error);
            setIsLoading(false); // Stop loading
            toast.error('Failed to accept the session');
        }
    };
    
    return ( 
        <div className="invite-accept">
            <ToastContainer />
            <div className="invite-access">
            <button onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} />
            </button>

                <form className="accept-items" onSubmit={confirmInvite}>
                    <div className="accept-title">You're accepting an invite</div>
                    <div className="accept-subtitle">Confirming will let the mentee know you're available for the session. 
                    Proceed with acceptance?</div>
                    <div className="accept-submission" disabled={isLoading}>
                        <input type="submit" value={'Confirm Invite'}/>
                    </div>
                </form>
            </div>

        </div>
     );
}
 
export default AcceptInvite;