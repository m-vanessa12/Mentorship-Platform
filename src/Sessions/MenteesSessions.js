import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode';
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './bookedsession.css';
import { format, formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenteeMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const goToMeetings = useCallback(() => {
        navigate('/mentee-meetings');
    }, [navigate]);

    const goToInterests = useCallback(() => {
        navigate('/recieved-interest');
    }, [navigate]);

    const decoded = jwtDecode(localStorage.getItem('token'));
    const menteeId = decoded?.id;

    useEffect(() => {
        const fetchMenteeMeetings = async () => {
            try {
                // Replace the URL with your actual endpoint to fetch mentee's meetings
                const response = await axios.get(`https://capstone-project-2-aaem.onrender.com/api/mentee-sessions/${menteeId}`);
                if (response.data.success) {
                    setMeetings(response.data.sessions);
                    console.log("Fetched Meetings:", response.data.sessions);
                } else {
                    setMeetings([]);
                }
            } catch (error) {
                console.error('Error fetching mentee meetings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (menteeId) {
            fetchMenteeMeetings();
        }
    }, [menteeId]);

    // Helper functions for formatting
    const formatSessionDateTime = (dateTime) => format(new Date(dateTime), 'yyyy-MM-dd hh:mm a');
    const timeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });

    return (
        <div className="booked-sessions">
            <ToastContainer />
            <Topbar />
            <Sidebar />

            <div className="displayed-session">
                <div className="sessions-interests">
                    {/* <div className="sessions-title">My Meetings</div> */}
                    <div className="meetings" onClick={goToMeetings} >Meetings</div>
                    <div className="meetings" onClick={goToInterests}>Interests</div>
                </div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : meetings.length === 0 ? (
                    <div>No meetings booked yet.</div>
                ) : (
                    meetings.map((meeting) => (
                        <div className="booking-owner" key={meeting._id}>
                            <div className="booking-owner-profile">
                                <img src={meeting.mentorPhoto || 'defaultImagePath.jpg'} alt="" />
                            </div>
                            <div className="sessions-details">
                                <div className="who-booked">
                                    <div className="who-names">{meeting.mentorName}</div>
                                    <div className="who-dot"></div>
                                    <div className="who-time">{timeAgo(meeting.createdAt)}</div>
                                    <div className={`session-status session-status-${meeting.status}`}>
                                        {meeting.status}
                                    </div>
                                </div>
                                <div className="suggested-time">Suggested Time: <span>{formatSessionDateTime(meeting.dateTime)}</span></div>
                                <div className="session-about">{meeting.sessionInfo}</div>
                                <div className="session-link">
                                  Meeting Link: <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">{meeting.meetingLink}</a>
                                </div>
                                {/* Add any buttons or actions here */}     
                                {
                                meeting.status === 'rejected' && (
                                    <div className="session-about">
                                    <span className="rejection-reason" style={{ color: 'red', fontWeight: 'bold' }}>
                                        Rejected Reason: 
                                    </span>
                                    {meeting.rejectionReason || 'No reason provided'}
                                    </div>
                                )
                                }
                            </div>
                            
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MenteeMeetings;
