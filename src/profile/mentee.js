import './profileform.css';
import Topbar from '../sidebar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import profile_img from '../img/img-profile.png';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const MenteeProfileCreate = () => {

    // integration space
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        photo: '',
        phoneNumber: '',
        country: '',
        city: '',
        universityName: '',
        degreeType: '',
        fieldOfStudy: '',
        skills: [],
        otherSkills: '',
        interests: [],
        otherInterests: '',
        bio: ''
    });
    
    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'skills') {
            const selectedSkill = value;
            // Ensure selectedSkill is not already in the formData.skills array
            if (!formData.skills.includes(selectedSkill)) {
                // If it's not present, add it to the array
                setFormData(prevState => ({
                    ...prevState,
                    [name]: [...prevState.skills, selectedSkill]
                }));
            }
        } else if (name === 'interests') {
            const selectedInterest = value;
            // Ensure selectedInterest is not already in the formData.interests array
            if (!formData.interests.includes(selectedInterest)) {
                // If it's not present, add it to the array
                setFormData(prevState => ({
                    ...prevState,
                    [name]: [...prevState.interests, selectedInterest]
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
    
    

    const signUpData = JSON.parse(localStorage.getItem('signUpData'));

    // Set default values for first name, last name, and email based on sign-up data
    useEffect(() => {
        if (signUpData) {
            setFormData(prevState => ({
                ...prevState,
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                email: signUpData.email
            }));
        }
    }, [signUpData]);

    const handleSkillChange = (selectedSkill) => {
        // Add the selected skill if it's not already included
        if (!formData.skills.includes(selectedSkill)) {
            setFormData(prevState => ({
                ...prevState,
                skills: [...prevState.skills, selectedSkill]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
    
            // Append each field to the formDataToSend object
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
    
            // Send formDataToSend to the backend
            await axios.post('https://capstone-project-2-aaem.onrender.com/api/mentee', formDataToSend, {
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
    

    
    // it ends here
    // const goToUsers = useCallback( () =>{
    //     navigate('/Mentees')
    // }, [navigate]);
    const navigates = useNavigate();
    const goToCommunity = useCallback( () =>{
        navigate('/community')
    }, [navigate]);

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

    // Function to resize image
const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg');
            };
            img.onerror = reject;
            img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

    return ( 
        <div className="profile-container">
            <Topbar />
            <Sidebar />

            <form className="create-profile" onSubmit={handleSubmit}>
                <div className="profiletitle">Create Your Profile(Mentee)</div>
                <div className="profile-picture">
                <div className="pro-img" onClick={handleImageClick}>
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="" />  
                    ) : (
                        <img src={profile_img} alt="" />  
                    )}
                </div>
                <input type="file"  ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange}/>
                <button >Upload Picture</button>
            </div>

                {/* Personal details */}
                <div className="personal-details">
                    <div className="details-title">1. Personal Details</div>
                    <div className="personal-info">
                    {/* <div className="first-name">
                        <span>First Name</span>
                        <input type="text" placeholder='e.g vanessa' name="firstName" value={formData.firstName} onChange={handleChange}/>
                    </div>
                    <div className="first-name">
                        <span>Last Name</span>
                        <input type="text" placeholder='e.g Mukamanzi' name="lastName" value={formData.lastName} onChange={handleChange}/>
                    </div>
                    <div className="first-name">
                        <span>Email</span>
                        <input type="email" placeholder='e.g vanessa@gmail.com' name="email" value={formData.email} onChange={handleChange}/>
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

                  {/* Background Education */}
             <div className="background-education">
                
                <div className="education-title">2. Background Education</div>
                
                <div className="education-details">

                     <div className="education-info">
                        <span>University Name</span>
                        <input type="text" placeholder='e.g African Leadership University' name="universityName" value={formData.universityName} onChange={handleChange}/>
                    </div>
                     <div className="education-info">
                        <span>Degree Type</span>
                        <input type="text" placeholder='e.g B.A' name="degreeType" value={formData.degreeType} onChange={handleChange}/>
                    </div>
                     <div className="education-info">
                        <span>Field of Study</span>
                        <input type="text" placeholder='e.g Computer Science' name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange}/>
                    </div>
              </div>
            </div>

        {/* ----------------- Skills and Expertise ----------------------*/}
             <div className="skills-expertise">

                <div className="skills-title">3. Skills and Expertise</div>
                <div className="skills-details">
                     <div className="skills-info">
                        <select id="" name="skills" value={formData.skills} onChange={handleChange}>
                           <option value="" disabled selected>Choose from Hard Skills</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Financial Literacy">Financial Literacy</option>
                        </select>
                    </div>
                     <div className="skills-info" >
                        <select name="skills" value={formData.skills} onChange={handleChange}id="">
                           <option value="" disabled selected>Choose from Soft Skills</option>
                            <option value="Communication">Communication</option>
                            <option value="Problem-solving">Problem-solving</option>
                            <option value="Teamwork">Teamwork</option>
                            <option value="Leadership">Leadership</option>
                        </select>
                    </div>
                     <div className="skills-info">
                        <select name="skills" value={formData.skills} onChange={handleChange} id="">
                            <option value="" disabled selected>Choose your Expertise</option>
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
                        <input type="text" name='otherSkills' placeholder='Other skills or expertise'  value={formData.otherSkills} onChange={handleChange}/>
                    </div>

            </div>
 {/*------------------------- INTEREST -------------------------------------*/}
             <div className="skills-expertise">

                <div className="skills-title">4. Interests</div>
                <div className="skills-details">
                     <div className="skills-info">
                        <select id="" name="interests" value={formData.interests} onChange={handleChange}>
                           <option value="" disabled selected>Choose...</option>
                            <option value="Reading">Reading</option>
                            <option value="Learning Languages">Learning Languages</option>
                            <option value="History">History</option>
                            <option value="Chess">Chess</option>
                        </select>
                    </div>
                     <div className="skills-info" >
                        <select id="" name="interests" value={formData.interests} onChange={handleChange}>
                            <option value="" disabled selected>Choose...</option>
                            <option value="Writing">Writing</option>
                            <option value="Photography">Photography</option>
                            <option value="Music">Music</option>
                            <option value="Drawing">Drawing</option>
                        </select>
                    </div>
                     <div className="skills-info">
                        <select id="" name="interests" value={formData.interests} onChange={handleChange}>
                            <option value="" disabled selected>Choose...</option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Travelling">Travelling</option>
                            <option value="Cooking and Baking">Cooking and Baking</option>
                            <option value="Film and Theater">Film and Theater</option>
                        </select>
                    </div>
                </div>

                <div className="others">
                        <span>Others</span>
                        <input type="text" name='otherInterests' placeholder='Other interests' value={formData.otherInterests} onChange={handleChange}/>
                    </div>
                
            </div>

 {/*-------------------------- WPROFILE SHORT BIO SPACE ----------------------*/}

                <div className="short-bio">
                  <div className="message">5. Tell us about yourself(Optional)</div>
                  <textarea name="bio" id="" cols="30" rows="10" placeholder='Tell Mentors about yourself' value={formData.bio} onChange={handleChange}></textarea>              

                </div>

 {/* -----------------SUBMIITNG PROFILE INFO BUTTONS------------------------------ */}

            <div className="submit-profile">
                <div className="buttons-space">
                    <input type="submit" value={'SKIP'} className='skip' onClick={goToCommunity}/>
                    <input type="submit" value={'SAVE PROFILE'}/>
                </div>
            </div>

            </form>
        </div>
     );
}
 
export default MenteeProfileCreate;