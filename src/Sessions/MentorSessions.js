import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import '../Sessions/meeting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { InlineWidget } from "react-calendly";
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import { useCallback } from 'react';

const CalendlySetting = () => {
    const { mentorId } = useParams();
    const navigateMentor = useNavigate();
    const location = useLocation();
    const calendlyLink = location.state?.calendlyLink; // Get Calendly link from props

    const goBackToMentor = useCallback(() => {
        navigateMentor(`/mentors/${mentorId}`);
    }, [navigateMentor, mentorId]);

    return ( 
        <div className="meeting-handling">
            <Topbar />
            <Sidebar />
            <div className="calendly-container">
                <div className="set-calendar">
                    <div className="session-title">
                        <FontAwesomeIcon icon={faArrowLeft} style={{ width: '18px', height: '22px', padding: '5px', cursor: 'pointer'}} onClick={goBackToMentor}/> 
                        <span>Scheduled Meetings</span>
                    </div>                                      
                </div>
                <div className="App">
                {calendlyLink ? (
                        <InlineWidget url={calendlyLink} />
                    ) : (
                        <span style={{ color: 'blue', fontSize: '25px', textAlign: 'center', marginTop: '20px' }}>Hasn't provided Calendly</span>
                    )}
                </div>
            </div>
        </div>
     );
}

 
export default CalendlySetting;