import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './bookedsession.css';
import { format, formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AcceptInvite from './acceptInvite';
import RejectInvite from './inviteReject'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MentorSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(false);

    const decoded = jwtDecode(localStorage.getItem('token'));
    const mentorId = decoded?.id;

    const handleViewProfileClick = useCallback((menteeId) => {
        if (menteeId) {
            navigate(`/mentees/${menteeId}`);
            console.log('menteeIDDDDDD', menteeId);
        } else {
            console.error('Mentee ID is undefined');
        }
    }, [navigate]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.role === "Mentor") {
                fetchSessions(decoded.id); 
            }
        }
    }, []);


    const fetchSessions = async (mentorId) => {
        try {
            const response = await fetch(`https://capstone-project-2-aaem.onrender.com/api/mentor-sessions/${mentorId}`);
            const data = await response.json();
    
            if (data.success) {
                setSessions(data.sessions);
                let sessions1= data.sessions
                console.log("Fetched Sessions:", sessions1);
            } else {
                setSessions([]);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(`Accept Modal Open State: ${showAcceptModal}`);
        console.log(`Reject Modal Open State: ${showRejectModal}`);
    }, [showAcceptModal, showRejectModal]);

    const refetchSessions = () => {
        setFetchTrigger(prev => !prev); 
    };

    useEffect(() => {
        fetchSessions(mentorId);
    }, [fetchTrigger]);
    

    const formatSessionDateTime = (dateTime) => format(new Date(dateTime), 'yyyy-MM-dd hh:mm a');

    const timeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });


    return ( 
        <div className="booked-sessions">
            <ToastContainer />
            <Topbar />
            <Sidebar/>

            <div className="displayed-session">
                <div className="sessions-title">Booking Behavior</div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : sessions.length === 0 ? (
                    <div>You haven't booked Yet</div>
                ) : (
                    sessions.map((session) => (
                        <div className="booking-owner" key={session._id}> 
                            <div className="booking-owner-profile">
                                <img src={session.menteePhoto} alt="" />
                            </div>
                            <div className="sessions-details">
                                <div className="who-booked">
                                    <div className="who-names">{session.menteeName}</div>
                                    <div className="who-dot"></div>
                                    <div className="who-time">{timeAgo(session.createdAt)}</div>
                                    <div className={`session-status session-status-${session.status}`}>
                                        {session.status}
                                    </div>
                                </div>
                                <div className="suggested-time">Suggested Time: <span>{formatSessionDateTime(session.dateTime)}</span></div>
                                <div className="session-about">{session.sessionInfo}</div>
                                {/* <div className="session-link">Meeting Link: <span>{session.meetingLink}</span></div> */}
                                <div className="session-link">
                                  Meeting Link: <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">{session.meetingLink}</a>
                                </div>

                                
                                <div className="meetings">

                                    <div className="metting-decision">
                                    <button type="button" onClick={() => {
                                            setShowAcceptModal(true);
                                            setSelectedSessionId(session._id);
                                        }}>Accept</button>
                                            {showAcceptModal && selectedSessionId === session._id && (
                                            <AcceptInvite
                                                sessionId={selectedSessionId}
                                                closeModal={() => setShowAcceptModal(false)}
                                                mentorId={mentorId}
                                                onAcceptSuccess={refetchSessions} // Passing refetchSessions as a callback
                                            />
                                        )}
                                </div>

                                    <div className="metting-decision">
                                    <button type="button" onClick={() => {
                                        setShowRejectModal(true);
                                        setSelectedSessionId(session._id);
                                    }}>Decline</button>
                                        {showRejectModal && selectedSessionId === session._id && (
                                            <RejectInvite sessionId={selectedSessionId} closeModal={() => setShowRejectModal(false)} />
                                        )}
                                    </div>

                                    <div className="metting-decision">
                                     <button onClick={() => handleViewProfileClick(session.menteeId)}>Check Profile</button>

                                   </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
 
export default MentorSessions;
