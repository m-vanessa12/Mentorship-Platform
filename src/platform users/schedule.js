import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './session.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Schedule = () => {
    const { mentorId } = useParams();
    const navigateMentor = useNavigate();
    const [dateTime, setDateTime] = useState(new Date());
    const [sessionInfo, setSessionInfo] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [menteeId, setMenteeId] = useState('');

    useEffect(() => {
        // Decode the UserID from the token and set it as menteeId
        const decodedToken = localStorage.getItem('token');
        if (decodedToken) {
            const { id } = JSON.parse(atob(decodedToken.split('.')[1]));
            console.log('Decoded User ID:', id); // Logging for debugging
            setMenteeId(id);
        }
    }, []);
    

    const handleDateTimeChange = (date) => {
        setDateTime(date);
    };

    const minDateTime = new Date();
    
    const goBackToMentor = useCallback(() => {
        navigateMentor(`/mentors/${mentorId}`);
    }, [navigateMentor, mentorId]);

    const sendInvitation = async () => {
        try {
            // Check if the mentee's profile is complete
            if (!menteeId) {
                toast.error('Mentee not found. Please complete your profile before scheduling a session.');
                return;
            }
    
            // Proceed with sending the booking request
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    mentorModelId: mentorId, // Ensure this variable is defined and holds the correct value
                    dateTime,
                    sessionInfo,
                    meetingLink,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Error booking session: ${errorData.message}`);
                // Handle the error based on the errorData
            } else {
                toast.success('Session booked successfully');
                // Redirect or display a success message as needed
            }
        } catch (error) {
            toast.error(`Error booking session: ${error.message}`);
        }
    };
    
    return ( 
        <div className="schedule-session">
            <ToastContainer />
            <Topbar />
            <Sidebar />
            <div className="shedule-container">
                <div className="book-meeting">
                    <div className="session-title">
                        <FontAwesomeIcon icon={faArrowLeft} style={{ width: '18px', height: '22px', padding: '5px', cursor: 'pointer'}}  onClick={goBackToMentor}/> 
                        <span>Schedule a Session</span>
                    </div>                   
                </div>

                <form className="book-time">
                    <div className="book-from">
                        <div className="start-from">Day and Time: </div>
                        <div className="choose-date" name="dateTime">
                            <DateTimePicker
                                onChange={handleDateTimeChange}
                                value={dateTime}
                                minDate={minDateTime}
                            />
                        </div>
                    </div>

                    <div className="session-about">
                        <div className="session-titlee">What session about?</div>
                        <div className="session-text">
                            <textarea 
                                name="sessionInfo" 
                                id="" 
                                cols="30" 
                                rows="10" 
                                placeholder="What do you want to discuss about?"
                                value={sessionInfo}
                                onChange={(e) => setSessionInfo(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="meeting-link">
                        <span>Meeting Link</span>
                        <input 
                            type="text" 
                            name="meetingLink" 
                            id="" 
                            placeholder="Provide Meeting Link"
                            value={meetingLink} 
                            onChange={(e) => setMeetingLink(e.target.value)} 
                        />
                    </div>

                    <div className="send-invite">
                        <input 
                            type="button" 
                            name="" 
                            id="" 
                            value={'Send Invitation'} 
                            onClick={sendInvitation} 
                        />
                    </div>

                </form>
            </div>
        </div>
     );
}

export default Schedule;
