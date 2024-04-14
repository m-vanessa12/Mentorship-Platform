import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './content.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Content = () => {

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        // contentCoverPicture:'',
        createdBy:''
      });
    console.log(formData);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://capstone-project-2-aaem.onrender.com/api/discussion', formData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        });
        console.log('Inserted created:', response.data);
        // Optionally, you can clear the form after successful submission
        setFormData({ title:'',category:'', content:''});
        toast.success("Discussion created successfully!");
        navigate('/community'); 
      } catch (error) {
        console.error('Error creating discusion:', error);
        toast.error("Failed to create account. Please try again.");
      }
  };

  const navigate = useNavigate();
  const goToLogin = useCallback( () =>{
      navigate('/login')
  }, [navigate]);

    return ( 
        <div className="content-share" >
            <ToastContainer />
            < Topbar />
            < Sidebar />
            <form className="formm" onSubmit={handleSubmit}>    
                <div className="content-title">
                    {/* <FontAwesomeIcon icon={faArrowLeft} style={{ width: '18px', height: '18px', color: '#000'}}  /> */}
                    <span>Create a new discusion</span>
                </div>  

                <div className="content-headline">
                    <span>Title *</span>
                    <input type="text" name="title" id=""  placeholder="Type content title" value={formData.title} onChange={handleChange}/>
                </div>   
                <div className="content-category">
                    <span>Content Category *</span>
                    <select name="category" id="" value={formData.category} onChange={handleChange}>
                        <option value="">Choose content Category</option>
                        <option value="">Choose content Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Science">Science</option>
                        <option value="Politics">Politics</option>
                        <option value="Women Empowerment">Women Empowerment</option>
                        <option value="Mental Health">Mental Health</option>
                        <option value="Gender Equality">Gender Equality</option>
                        <option value="Other">Other</option>
                    </select>
                </div>   
                
                <div className="content-content">
                    <span>Share content*</span>
                    <textarea name="content" id="" cols="30" rows="10" placeholder="Share a discusion" value={formData.content} onChange={handleChange}></textarea>                    
                </div>  

                {/* <div className="content-cover-picture">
                    <span>Attach Content Cover *</span>
                    <input type="file" name="" id=""/>
                </div>   */}

                <div className="publish-content">
                    <input type="submit" value={'Cancel'} className='skip'/>
                    <input type="submit" value={'Publish Content'} />
                </div> 
            
            </form>
        </div>
     );
}
 
export default Content;