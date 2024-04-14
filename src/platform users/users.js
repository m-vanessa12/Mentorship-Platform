import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import profile_img from '../img/img-profile.png';
import './userstyle.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Users = () => {
    const navigate = useNavigate();

    const goToMentors = useCallback(() => {
        navigate('/mentors');
    }, [navigate]);

    const goToMentees = useCallback(() => {
        navigate('/Mentees');
    }, [navigate]);
    
    const goToMenteeProfile = useCallback((menteeId) => {
        if (menteeId) {
            // Append the menteeId to the URL when navigating
            navigate(`/mentees/${menteeId}`);
        } else {
            console.error('Mentee ID is undefined');
        }
    }, [navigate]);
    

    const [mentees, setMentees] = useState([]);

    useEffect(() => {
        const fetchMentees = async () => {
            try {
                const response = await axios.get('https://capstone-project-2-aaem.onrender.com/api/profiles');
                setMentees(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching mentees:', error);
            }
        };
        fetchMentees();
    }, []);
    console.log(mentees)

    return ( 
        <div className="platform-users">
            <Topbar />
            <Sidebar />
            <div className="users-container">
                <div className="platform-users">
                    <div className="sort-users">
                        <div className="userss-listt">
                        <span>Acess Users</span>
                        <span><FontAwesomeIcon icon={faArrowRight} style={{ width: '18px', height: '22px', cursor: 'pointer'}} /> </span>
                        </div>
                        <div className="userss" onClick={goToMentees}>Mentees</div>
                        <div className="userss" onClick={goToMentors}>Mentors</div>
                        
                    </div>
                </div>

                <div className="users-display">
                   {mentees.map(mentee => (                   
                        <div className="users-cards" key={mentee._id} >
                        
                            <div className="main-info">
                                <div className="users-info">
                                    <div className="user-profile">
                                        <img src={mentee.photo}alt="" />
                                    </div>
                                    <div className="user-names">{mentee.name}</div>
                                    <div className="user-category">{mentee.role}</div>
                                </div>
                                <div className="users-connect">
                                    <button onClick={() => goToMenteeProfile(mentee._id)}>View Profile</button>
                                    
                                </div>
                            </div>
                            <div className="users-bio">
                                <span>{mentee.interests} </span>
                            </div>
                        </div>
                    ))}
                </div>            
            </div>
        </div>
    );
}
 
export default Users;
