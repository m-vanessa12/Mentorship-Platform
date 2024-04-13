import './resourcestyle.css';
import Topbar from '../sidebar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import ResourceTitle from '../resources/resourcetitle.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import content_img from '../img/content.jpg'

const ResourcesContent = () => {
    return (  
        <div className="content-part">
            <Topbar />
            <Sidebar />
            <ResourceTitle />

            <div className="content-container">
                <div className="returnbtn">
                <FontAwesomeIcon icon={faArrowLeft} style={{ width: '20px', height: '20px', color: '#fff'}}  />
                    <span>Go Back</span>
                </div>
                <div className="content-titles">Women In Today's Technology</div>
                <div className="content-profile">
                    <img src={content_img} alt="" />
                </div>
                <div className="content-description">
                    <span>From highlighting creative solutions to the Tech gender gap to identifying three women changing the IoT industry and even discussing the cause of the growing Tech talent gap and retention threat, we witness first-hand through staffing Tech-based roles the value women bring to Tech and the need for enhanced diversification in the industry.
                    Yet, with the barrage of negative accounts from women working in Tech-based roles in places like Silicon Valley and Google’s internal diversity manifesto controversy, it seems the irreplaceable benefits of having women in Tech remain unclear to some.</span>
                </div>
            </div>
        </div>
    );
} 
export default ResourcesContent;