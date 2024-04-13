import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './bookedsession.css';


const RejectInvite = ({ closeModal, sessionId  }) => {
    const navigate = useNavigate();
    const goToSessions = useCallback(() => {
      navigate('/mentor-sessions');
    }, [navigate]);

    const [rejectionReason, setRejectionReason] = useState('');

    const submitRejection = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Get the token from localStorage
    
        try {
            // Include the Authorization header in your request
            const response = await axios.post(
                `http://localhost:3000/api/${sessionId}/reject`, 
                { rejectionReason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // console.log(response.data); 
            alert('Session rejected successfully');
            closeModal();
            navigate('/mentor-sessions', { state: { reload: true } });
        } catch (error) {
            console.error('Error rejecting session:', error);
            alert('Failed to reject the session');
        }
    };
    



    return ( 
        <div className="invite-rejection">
            <div className="reject-access">
            <button onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} />
            </button>

                <form className="reject-items" onSubmit={submitRejection}>
                    <div className="reject-title">You're about to reject an invite</div>
                    <div className="reject-subtitle">While rejecting an invite. If you wish to suggest different time, you can provide 
                    your availability time for a mentee to book you another time.</div>
                    <div className="rejection-description">
                    <textarea
                        name="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder='Add your short note about invite rejection'
                        cols="30"
                        rows="10"
                    ></textarea>
                    </div>
                    <div className="rejection-submission" onClick={goToSessions}>
                        <input type="submit" value={'Submit Rejection'}/>
                    </div>
                </form>
            </div>

            </div>
            
     );
}
 
export default RejectInvite;