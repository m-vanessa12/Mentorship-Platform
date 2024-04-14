
import './landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import registermockup_img from '../img/register-mockup.png'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    const navigate = useNavigate();
    const goTologin = useCallback( () => {
        navigate('/login')
    }, [navigate]);
    const navigates = useNavigate();
    const goToSignUp = useCallback( () => {
        navigate('/signup')
    }, [navigate]);

    const form = useRef();



    const sendEmail = (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, process.env.REACT_APP_USER_ID);

    
        emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            form.current,
            process.env.REACT_APP_USER_ID
        )
        
        .then(
            (result) => {
                toast.success('Email sent successfully!'); 
                form.current.reset(); 
                
            },
            (error) => {
                console.error('Email send failed:', error);
                toast.error('Failed to send email. Please try again later.');
            }
            
        );
    };
    
    
    
      




    return ( 
        <div className="homepage">
            <ToastContainer />
            <div className="heading">
                <div className="logo">Mentor.Me</div>
                <div className="links">
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="about-part">About</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="" onClick={goTologin}><button>Login</button></a></li>
                    </ul>
                </div>
            </div>

            <div className="hero-section">
                <div className="hero-content">
                    <div className="welcome-part">Mentor.Me,</div>
                    <div className="platform-name">A Women-to-Women Mentorship Platform</div>
                    <div className="hero-message">Begin your journey with us and discover a world where women uplift each other. 
                    Whether you're a professional eager to share your expertise or a newcomer carving out your path — you belong here. 
                    Together, let's create a legacy of mentorship and breakthroughs.</div>
                    <div className="get-started" onClick={goToSignUp}>
                        <span>Get Started</span>
                        <FontAwesomeIcon icon={faArrowRight} style={{ width: '28px', height: '26px', color: '#fff'}} /> 
                     </div>
                </div>
                <div className="hero-mockup">
                    <img src={registermockup_img } alt="" />
                </div>
            </div>

            <div className="about-part" id='About'>
                <div className="about-heading">
                    <div className='about-title'>Why<b> Mentor.Me </b> Platform ?</div>
                    <div className='about-inquiries'>Our mission is to create a community where every woman has access to the mentorship she needs to succeed. 
                        Whether it's breaking into a new industry, climbing the corporate ladder, or launching a business, 
                        we're here to provide the support and resources necessary to turn aspirations into achievements.</div>
                </div>

                <div className="impact-section">

                    <div className="our-impact">
                        <div className="impact-icon">
                        <FontAwesomeIcon icon={faChalkboardTeacher} style={{ width: '30px', height: '30px', color: '#111F4D'}} /> 
                        </div>
                        <div className="impact-title">Empowerment Through Connection</div>
                        <div className="impact-explaination">Connect with experienced mentors who can offer 
                        invaluable insights and guidance, unlocking new opportunities 
                        for professional growth and leadership.</div>
                    </div>
                    <div className="our-impact">
                        <div className="impact-icon">
                        <FontAwesomeIcon icon={faChalkboardTeacher} style={{ width: '30px', height: '30px', color: '#111F4D'}} /> 
                        </div>
                        <div className="impact-title">Career Advancement</div>
                        <div className="impact-explaination">Navigate your career path with confidence, utilizing personalized advice and support systems to 
                        advance in your chosen field.</div>
                    </div>
                    <div className="our-impact">
                        <div className="impact-icon">
                        <FontAwesomeIcon icon={faChalkboardTeacher} style={{ width: '30px', height: '30px', color: '#111F4D'}} /> 
                        </div>
                        <div className="impact-title">Networking Opportunities</div>
                        <div className="impact-explaination">Offering tailored guidance and support to help women achieve their 
                        professional and personal development goals, 
                        fostering a culture of growth and empowerment.</div>
                    </div>
                    <div className="our-impact">
                        <div className="impact-icon">
                        <FontAwesomeIcon icon={faChalkboardTeacher} style={{ width: '30px', height: '30px', color: '#111F4D'}} /> 
                        </div>
                        <div className="impact-title">All-Inclusive Support</div>
                        <div className="impact-explaination">Experience a mentoring approach that supports not only your career goals but also personal development, 
                        fostering a well-rounded journey to success.</div>
                    </div>
                    <div className="our-impact">
                        <div className="impact-icon">
                        <FontAwesomeIcon icon={faChalkboardTeacher} style={{ width: '30px', height: '30px', color: '#111F4D'}} /> 
                        </div>
                        <div className="impact-title">Cultural Engagement</div>
                        <div className="impact-explaination">Engage with a platform that understands and celebrates cultural diversity, offering mentorship that resonates with your 
                        unique background and experiences.</div>
                    </div>
                    <div className="our-impact">
                        <div className="impact-icon">
                        <FontAwesomeIcon icon={faChalkboardTeacher} style={{ width: '30px', height: '30px', color: '#111F4D'}} /> 
                        </div>
                        <div className="impact-title">Skill Development</div>
                        <div className="impact-explaination">Access a suite of resources and tools designed to enhance your skill set, from leadership to communication, tailored for the 
                        ambitious woman ready to ascend in her career.</div>
                    </div>

                </div>
            </div>

            <div className="contact-part">
                <div className="contact-content">
                    <div className="contact-title">Get In Touch</div>
                    <div className="contact-inquires">
                        <span>For questions about our platform, services, or how we can support your journey, please don't hesitate to reach out</span>
                        <p>If you're inspired to mentor and shape the future of aspiring women professionals, we'd love to hear from you. Create your 
                            account and reach out directly via the 'Send Message' feature or email us 
                            to express your interest in becoming a mentor. Let's empower together!</p>
                    </div>

                    <div className="contact-address">

                      <div className="contact-address-phone">
                        <FontAwesomeIcon icon={faEnvelope} style={{ width: '30px', height: '35px', padding: '10px'}} />  
                        <div className='address-email'>mukavanessa8@gmail</div>
                        </div>
                      <div className="contact-address-phone">
                        <FontAwesomeIcon icon={faPhone} style={{ width: '30px', height: '35px', padding: '10px'}} />  
                        <div className='address-email'>
                            <span>+250780705984</span></div>
                        </div>                       
                    </div>

                </div>
                <form className="contact-form" ref={form} onSubmit={sendEmail}>
                    <div className="persona-name">
                        <input type="text" placeholder='Personal Names' name="user_name"/>
                    </div>
                    <div className="persona-name">
                        <input type="email" placeholder='Personal Email' name="user_email" />
                    </div>
                    {/* <div className="persona-name">
                        <input type="text" placeholder='Personal Phone Number' />
                    </div> */}
                    <div className="persona-name">
                        <textarea name="message" id="" cols="30" rows="10" placeholder='Type message'></textarea>
                    </div>
                    <div className="contact-send">
                        <input type="submit" value={'Send'} />
                    </div>
                </form>
            </div>
            <div className="footer">copyright@2024 vanessa mukamanzi</div>


        </div>
     );
}
 
export default HomePage;