import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const NotifyInterests = ({ menteeId, closeModal }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Authentication error. Please log in.', { autoClose: 5000 });
            setIsLoading(false); // Stop loading
            return;
        }

        try {
            const response = await axios.post(`https://capstone-project-2-aaem.onrender.com/api/${menteeId}/notify-interest`, {
                message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                toast.success('Interest notification sent successfully!', { autoClose: 5000 });
                closeModal(); // Close the modal on success
            } else {
                toast.error('Failed to send interest.', { autoClose: 5000 });
            }
        } catch (error) {
            console.log(error); // For debugging
            toast.error('Failed to send interest: ' + (error.response?.data?.message || error.message), { autoClose: 5000 });
        } finally {
            setIsLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <div className="invite-rejection">
            <ToastContainer />
            <div className="reject-access">
                <button onClick={closeModal}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <form className="reject-items" onSubmit={handleSubmit}>
                    <div className="reject-title">Mentoring Interests</div>
                    <div className="reject-subtitle">
                        While expressing your interests, provide your availability.
                    </div>
                    <div className="rejection-description">
                        <textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Add your short note about notifying interests"
                            cols="30"
                            rows="10"
                            required
                            disabled={isLoading}
                        ></textarea>
                    </div>
                    <div className="rejection-submission">
                        <input type="submit" value={isLoading ? 'Sending...' : 'Submit Interest'} disabled={isLoading}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotifyInterests;
