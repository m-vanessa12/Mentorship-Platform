import React from 'react';
import './navigationbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPeopleGroup, faPerson, faFile, faComment, faSignOut, faClock } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const getUserRoleFromToken = () => {
        const token = localStorage.getItem('token'); 
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            return payload.role ? payload.role.toLowerCase() : null; // Normalize to lowercase
        } catch (error) {
            console.error('Error decoding token', error);
            return null;
        }
    };

    const userRole = getUserRoleFromToken();
    console.log("User role:", userRole);

    const goToProfile = useCallback(() => {
        navigate(userRole === 'mentor' ? '/mentor-profile' : '/mentee-profile');
    }, [navigate, userRole]);

    const goToUsers = useCallback(() => navigate('/Mentees'), [navigate]);
    const goToCommunity = useCallback(() => navigate('/community'), [navigate]);
    const goToResources = useCallback(() => navigate('/resources'), [navigate]);
    const goToSessions = useCallback(() => navigate('/mentor-sessions'), [navigate]);
    const goToIntroductory = useCallback(() => navigate('/introductory'), [navigate]);
    const goToMeetings = useCallback(() => navigate('/mentee-meetings'), [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return ( 
        <div className="sidemenu">
            <div className="sides">
                <div className="sidebar-items" onClick={goToIntroductory}>
                   <FontAwesomeIcon icon={faHome} style={{ width: '18px', height: '22px', padding: '15px'}}  />           
                    <span>Home</span>
                </div>

                {userRole === 'mentor' && (
                    <div className="sidebar-items" onClick={goToProfile}>
                        <FontAwesomeIcon icon={faPerson} style={{ width: '18px', height: '22px', padding: '15px'}} />
                        <span>Profile</span>
                    </div>
                )}
                {userRole === 'mentee' && (
                    <div className="sidebar-items" onClick={goToProfile}>
                        <FontAwesomeIcon icon={faPerson} style={{ width: '18px', height: '22px', padding: '15px'}} />
                        <span>Profile</span>
                    </div>
                )}
            </div>                 
            <div className="sides">
                <div className="sidebar-items" onClick={goToUsers}>
                <FontAwesomeIcon icon={faPeopleGroup} style={{ width: '18px', height: '22px', padding: '15px'}}  />           
                    <span>Mentorship</span>
                </div>
                <div className="sidebar-items" onClick={goToCommunity}>
                <FontAwesomeIcon icon={faComment} style={{ width: '18px', height: '22px', padding: '15px'}}  />           
                    <span>Community</span>
                </div>

        {/* Show Sessions only to mentors */}
                {userRole === 'mentor' && (
                    <div className="sidebar-items" onClick={goToSessions}>
                        <FontAwesomeIcon icon={faClock} style={{ width: '18px', height: '22px', padding: '15px'}} />
                        <span>Sessions</span>
                    </div>
                )}

                {userRole === 'mentee' && (
                    <div className="sidebar-items" onClick={() => navigate('/mentee-meetings')}>
                        <FontAwesomeIcon icon={faClock} style={{ width: '18px', height: '22px', padding: '15px'}} />
                        <span>Meetings</span>
                    </div>
                )}

                <div className="sidebar-items" onClick={goToResources}>
                <FontAwesomeIcon icon={faFile} style={{ width: '18px', height: '22px', padding: '15px'}}  />           
                    <span>Resources</span>
                </div>
                <div className="logout" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOut} style={{ width: '18px', height: '22px', padding: '15px'}}  />           
                    <span>Logout</span>
                </div>
            </div>                 
        </div>
     );
}
 
export default Sidebar;