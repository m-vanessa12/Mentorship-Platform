import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile_img from '../img/img-profile.png'
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './mentee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import NotifyInterests from '../Sessions/Interest';


const Mentee = ({ }) => { 
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [isNotifyInterestsOpen, setIsNotifyInterestsOpen] = useState(false);
    const { menteeId } = useParams();
    const [menteeData, setMenteeData] = useState(null);

    const goToMentors = useCallback(() => {
        navigate('/mentees');
    }, [navigate]);

    useEffect(() => {
        const fetchMenteeData = async () => {
            try {
                const response = await axios.get(`https://capstone-project-2-aaem.onrender.com/api/mentees/${menteeId}`);
                setMenteeData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch mentee data:', error);
                setIsLoading(false);
            }
        };

        fetchMenteeData();
    }, [menteeId]);

    if (isLoading) return <div>Loading...</div>;
    if (!menteeData) return <div>Mentee information not available</div>;
    
    const handleBack = () => navigate('/mentees');

    // Combine skills and otherSkills, as well as interests and otherInterests
    const combinedSkills = [...(menteeData.skills || []), ...(menteeData.otherSkills ? [menteeData.otherSkills] : [])];
    const combinedInterests = [...(menteeData.interests || []), ...(menteeData.otherInterests ? [menteeData.otherInterests] : [])];

    return ( 
        <div className="mentee-profiles">
            <Topbar />
            <Sidebar />
            <div className="mentee-personal-profile">

            {menteeData && (
                    <>


                 <div className="profile-title">
                <FontAwesomeIcon icon={faArrowLeft} style={{ width: '18px', height: '22px', padding: '5px', cursor: 'pointer'}}  onClick={goToMentors}/> 
                <span>Profile</span>
                </div>

                <div className="personal-information">
                    <div className="mentee-profile-picture">
                        {/* <img src={menteeInfo.photo} alt="" /> */}
                        <img src={menteeData.photo}alt="" />
                    </div>

                    <div className="mentee-details">
                        <div className="mentee-info">
                            <div className="mentee-name">{menteeData.firstName}</div>
                            <div className="mentee-status">{menteeData.role}</div>

                        </div>
                        <div className="notify-interest">

                        <button onClick={() => setIsNotifyInterestsOpen(true)}>Notify Interests</button>
                        {isNotifyInterestsOpen && (
                            <NotifyInterests
                                menteeId={menteeId}
                                closeModal={() => setIsNotifyInterestsOpen(false)}
                            />
                        )}

                        </div>


                    </div>
                </div>
              
                <div className="mentee-personal-details">
                    <div className="title">Personal Information</div>
                    <div className="personal-names">
                        
                        <div className="names-details">
                            <div className="firstname-heading"> First Name</div>
                            <div className="firstname-name"> {menteeData.firstName}</div>
                        </div>
                        <div className="names-details">
                            <div className="firstname-heading"> Last Name</div>
                            <div className="firstname-name"> {menteeData.lastName}</div>
                        </div>
                        <div className="names-details">
                            <div className="firstname-heading"> Current Status</div>
                            <div className="firstname-name"> Student</div>
                        </div>
                        <div className="names-details">
                            <div className="firstname-heading"> Nationality</div>
                            <div className="firstname-name"> {menteeData.country}</div>
                        </div>
                        <div className="names-details">
                            <div className="firstname-heading"> City</div>
                            <div className="firstname-name"> {menteeData.city}</div>
                        </div>
                    </div>
                </div>
                <div className="mentee-personal-details">
                    <div className="title">Education</div>
                    <div className="personal-names">
                        
                        <div className="names-details">
                            <div className="firstname-heading"> University</div>
                            <div className="firstname-name"> {menteeData.universityName}</div>
                        </div>
                        <div className="names-details">
                            <div className="firstname-heading"> Degree Type</div>
                            <div className="firstname-name">{menteeData.degreeType}</div>
                        </div>
                        <div className="names-details">
                            <div className="firstname-heading"> Field</div>
                            <div className="firstname-name">{menteeData.fieldOfStudy}</div>
                        </div>
                    </div>
                </div>

                <div className="skills-expertise">
                    <div className="title">Skills & Expertise</div>
                    <div className="skills-expertise-details">
                        {combinedSkills.map((skill, index) => (
                            <div className="mentee-skills" key={index}>
                                <div className="skill-list"></div>
                                <div className="acquired-skill">{skill}</div>
                            </div>
                        ))}
                    </div>
                </div>


                        <div className="personal-interest">
                            <div className="title">Personal Interests</div>
                            <div className="interests-details">
                                {combinedInterests.map((interest, index) => (
                                    <div className="mentee-interests" key={index}>
                                        <div className="interests-list"></div>
                                        <div className="interested-field">{interest}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mentor-personal-details">
                    <div className="title">Biography</div>
                    <div className="mentor-personal-names">
                        
                        <div className="mentor-bio">
                            <div className="bio-details">{menteeData.bio}</div>
                        </div>
                    </div>
                </div>
                </>
                )}              
            </div>

        </div>
     );
}
 
export default Mentee;