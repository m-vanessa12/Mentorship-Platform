import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import '../platform users/mentor.css';

const MentorProfile = () => {
    const [mentorData, setMentorData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchMentorProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://capstone-project-2-aaem.onrender.com/api/mentor-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMentorData(response.data);
            } catch (error) {
                console.error('Error fetching mentor profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentorProfile();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!mentorData) {
        return <div>Mentor information not available</div>;
    }




    return ( 
        <div className="mentor-profile">
            < Topbar />
            < Sidebar />
            <div className="mentor-profile-container">

            {mentorData && (
                    <>
    
              <div className="profile-title">Profile</div>
              <div className="mentor-information">
                    <div className="mentor-profile-picture">
                        <img src={mentorData.photo}alt="" />
                    </div>

                    <div className="mentor-details">
                        <div className="mentor-info">
                            <div className="mentor-name">{mentorData.firstName}</div>
                            <div className="mentor-status">{mentorData.role}</div>
                            <div className="mentor-category">Category: {mentorData.industry}</div>
                        </div>
                        <div className="book-session">
                            <input type="button" value={'Update Profile'} />
                        </div>
                    </div>
                </div>

                <div className="mentor-personal-details">
                    <div className="title">Personal Information</div>
                     <div className="mentor-personal-names">
                        
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> First Name</div>
                            <div className="mentor-firstname-name"> {mentorData.firstName}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Last Name</div>
                            <div className="mentor-firstname-name"> {mentorData.lastName}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Nationality</div>
                            <div className="mentor-firstname-name"> {mentorData.country}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> City</div>
                            <div className="mentor-firstname-name">{mentorData.city}</div>
                        </div>
                    </div>
                </div>


                <div className="mentor-personal-details">
                    <div className="title">Career Profile</div>
                    <div className="mentor-personal-names">
                        
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Position Held</div>
                            <div className="mentor-firstname-name">{mentorData.position}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Company Name</div>
                            <div className="mentor-firstname-name">{mentorData.company}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Field of Study </div>
                            <div className="mentor-firstname-name"> {mentorData.fieldOfStudy}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Indunstry</div>
                            <div className="mentor-firstname-name">{mentorData.industry}</div>
                        </div>
                        <div className="mentor-names-details">
                            <div className="mentor-firstname-heading"> Years of Experience</div>
                            <div className="mentor-firstname-name"> {mentorData.yearsExperience}</div>
                        </div>
                    </div>

                </div>

                <div className="qualifications-expertise">
                <div className="title">Qualification, Expertise & Other</div>
                <div className="qualifications-expertise-details">
                    {/* Safely check if mentorData and mentorData.qualifications exist */}
                    {mentorData && mentorData.qualifications && mentorData.qualifications.map((qualification, index) => (
                        <div className="mentor-qualifications" key={index}>
                            <div className="qualification-list"></div>
                            <div className="qualification">{qualification}</div>
                        </div>
                    ))}
                </div>
            </div>

                <div className="mentor-personal-details">
                    <div className="title">Biography</div>
                    <div className="mentor-personal-names">
                        
                        <div className="mentor-bio">
                            <div className="bio-details">{mentorData.bio}</div>
                        </div>
                    </div>
                </div>
                </>

)}
            </div>
        </div>
     );
}

export default MentorProfile;
