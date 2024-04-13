import './profileform.css';
import Topbar from '../sidebar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import profile_img from '../img/img-profile.png';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const MentorProfileCreate = () => {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        photo: '',
        phoneNumber: '',
        country: '',
        city: '',
        position: '',
        company: '',
        fieldOfStudy: '',
        industry: '',
        yearsExperience: '',
        qualifications: [],
        otherQualification: '',
        bio: ''
    });

    console.log(formData);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'qualifications') {
            const selectedQualification = value;
            // Ensure selectedQualification is not already in the formData.qualifications array
            if (!formData.qualifications.includes(selectedQualification)) {
                // If it's not present, add it to the array
                setFormData(prevState => ({
                    ...prevState,
                    [name]: [...prevState.qualifications, selectedQualification]
                }));
            }
        } else {
            // For other fields, update the form data normally
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () =>{
        inputRef.current.click();
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Update image state
            setFormData(prevState => ({
                ...prevState,
                photo: file // Update photo field in form data
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'photo') {
                    // If it's a file, directly append it
                    formDataToSend.append(key, value);
                } else if (Array.isArray(value)) {
                    // If it's an array, append each item separately
                    value.forEach((item, index) => {
                        formDataToSend.append(`${key}[${index}]`, item);
                    });
                } else {
                    // Otherwise, append as is
                    formDataToSend.append(key, value);
                }
            });
            await axios.post('http://localhost:3000/api/mentor', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }

            });
            // After successful submission, navigate to '/Mentees'
            navigate('/Mentees');
        } catch (error) {
            if (error.response) {
                console.log(error.response.data); // Log response data
                console.log(error.response.status); // Log response status
                console.log(error.response.headers); // Log response headers
            } else if (error.request) {
                console.log(error.request); // Log request
            } else {
                console.log('Error', error.message); // Log error message
            }
            console.log(error.config); // Log request config
        }
    };

    


    return ( 
        <div className="profile-container">
            <Topbar />
            <Sidebar />

            <form className="create-profile" onSubmit={handleSubmit}>
                <div className="profiletitle">Create Your Profile (Mentor)</div>
                <div className="profile-picture">
                <div className="pro-img" onClick={handleImageClick}>
                        {formData.photo ? (
                            <img src={URL.createObjectURL(formData.photo)} alt="" />  
                        ) : (
                            <img src={profile_img} alt="" />  
                        )}
                    </div>
                    <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange}/>
                    <button>Upload Picture</button>
                </div>

                {/* Personal details */}
                <div className="personal-details">
                    <div className="details-title">1. Personal Details</div>
                    <div className="personal-info">
                    {/* <div className="first-name">
                        <span>First Name</span>
                        <input type="text" placeholder='e.g vanessa' name="firstName" />
                    </div> */}
                    {/* <div className="first-name">
                        <span>Last Name</span>
                        <input type="text" placeholder='e.g Mukamanzi' name="lastName" />
                    </div> */}
                    {/* <div className="first-name">
                        <span>Email</span>
                        <input type="email" placeholder='e.g vanessa@gmail.com' name="email"/>
                    </div> */}
                    <div className="first-name">
                        <span>Phone Number</span>
                        <input type="text" placeholder='e.g 078XX99XX1' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                    </div>
                    <div className="first-name">
                        <span>Country</span>
                        <input type="text" placeholder='e.g Rwanda' name="country" value={formData.country} onChange={handleChange}/>
                    </div>
                    <div className="first-name">
                        <span>City</span>
                        <input type="text" placeholder='e.g Kigali' name="city" value={formData.city} onChange={handleChange}/>
                    </div>
                    </div>
                </div>

                  {/* Career Profile Information */}
             <div className="background-education">
                
                <div className="education-title">2. Career Profile</div>               
                <div className="education-details">

                     <div className="education-info">
                        <span>Position Held</span>
                        <input type="text" placeholder='e.g Data Analyst' name="position" value={formData.position} onChange={handleChange} />
                    </div>
                     <div className="education-info">
                        <span>Company Name</span>
                        <input type="text" placeholder='e.g Bank of Kigali' name="company" value={formData.company} onChange={handleChange} />
                    </div>
                     <div className="education-info">
                        <span>Field of Study</span>
                        <input type="text" placeholder='e.g Computer Science' name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                    </div>
                     <div className="education-info">
                        <span>Industry</span>
                        <input type="text" placeholder='e.g Business & Entrepreneurship' name="industry" value={formData.industry} onChange={handleChange} />
                    </div>
                     <div className="education-info">
                        <span>Years of Experience</span>
                        <input type="text" placeholder='e.g 2' name="yearsExperience" value={formData.yearsExperience} onChange={handleChange}/>
                    </div>
              </div>
            </div>

        {/* ----------------- Qualifications and Expertise ----------------------*/}
             <div className="skills-expertise">

                <div className="skills-title">3. Qualitifaction, Expertise & Other</div>
                <div className="skills-details">
                     <div className="skills-info">
                        <select id="" name="qualifications" value={formData.qualifications} onChange={handleChange}>
                           <option value="" disabled selected>Choose...</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Financial Literacy">Financial Literacy</option>
                        </select>
                    </div>
                     <div className="skills-info" name="skills" >
                        <select name="qualifications" value={formData.qualifications} onChange={handleChange} id="">
                           <option value="" disabled selected>Choose...</option>
                            <option value="Communication">Communication</option>
                            <option value="Problem-solving">Problem-solving</option>
                            <option value="Teamwork">Teamwork</option>
                            <option value="Leadership">Leadership</option>
                        </select>
                    </div>
                     <div className="skills-info" name="skills" >
                        <select name="qualifications" value={formData.qualifications} onChange={handleChange} id="">
                            <option value="" disabled selected>Choose...</option>
                            <option value="Scientific Research Expertise">Scientific Research Expertise</option>
                            <option value="Educational Expertise">Educational Expertise</option>
                            <option value="Financial Expertise">Financial Expertise</option>
                            <option value="Art and Design Expertise">Art and Design Expertise</option>
                            <option value="Scientific Research Expertise">Scientific Research Expertise</option>
                        </select>
                    </div>
                </div>
                <div className="others">
                    <span>Others</span>
                    <input type="text" name='otherQualification' value={formData.otherQualification} onChange={handleChange} placeholder='Other qualification'/>
                </div>
            </div>

            <div className="short-bio">
                  <div className="message">5. Tell us about yourself</div>
                  <textarea name="bio" id="" cols="30" rows="10" placeholder='Share a short bio about your self plus the achievements'value={formData.bio} onChange={handleChange}></textarea>              

                </div>
 
 {/* -----------------SUBMIITNG PROFILE INFO BUTTONS------------------------------ */}

            <div className="submit-profile">
                <div className="buttons-space">
                    <input type="submit" value={'SKIP'} className='skip'/>
                    <input type="submit" value={'SAVE PROFILE'}/>
                </div>
            </div>

            </form>
        </div>
     );
}
 
export default MentorProfileCreate;