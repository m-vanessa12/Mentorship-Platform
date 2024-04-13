import './resourcestyle.css'
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../sidebar/Topbar';
import ResourceTitle from './resourcetitle.js';
import tech_women from '../img/women-in-tech.jpg';
import team from '../img/team.jpg';
import woman from '../img/woman.jpg';
import ReAccess from './resourceAccess.js';
import {useState} from "react";

const Resources = () => {
     const [openModal, setOpenModal] = useState(false);

    return ( 

        <div className="resources">
            < Topbar />
            < Sidebar />
            <ResourceTitle />
            <div className="resources-link">
                <div className="sort-resources">
                    <span>Sort Resources</span>
                    <select name="" id="">
                        <option value="">Recent Post</option>
                        <option value="">Old Post</option>
                        <option value="">A - Z</option>
                        <option value="">Z - A</option>
                    </select>
                </div>

            <div className="resources-access">

                <div className="resource-content">
                    <div className="content-cover">
                        <img src={woman} alt="" />
                    </div>
                    <div className="resource-details">
                        <div className="resource-name">Learning Experience</div>
                        <div className="resource-time">2 days ago</div>
                    </div>
                    <button className='OpenModalBtn' onClick={()=> {
                        setOpenModal(true);
                    }}> open</button>

                    {openModal && <ReAccess closeModel={setOpenModal} />}
                </div>
                <div className="resource-content">
                    <div className="content-cover">
                        <img src={tech_women} alt="" />
                    </div>
                    <div className="resource-details">
                        <div className="resource-name">Networking</div>
                        <div className="resource-time">2 days ago</div>
                       
                    </div>
                    <button className='OpenModalBtn' onClick={()=> {
                        setOpenModal(true);
                    }}> open</button>

                    {openModal && <ReAccess closeModel={setOpenModal} />}
                </div>

                {/* I am Exploring pop-up thing here */}
                <div className="resource-content">
                    <div className="content-cover">
                        <img src={team} alt="" />
                    </div>
                    <div className="resource-details">
                        <div className="resource-name">Women in technology today</div>
                        <div className="resource-time">2 days ago</div>
                    </div>

                    <button className='OpenModalBtn' onClick={()=> {
                        setOpenModal(true);
                    }}> open</button>

                    {openModal && <ReAccess closeModel={setOpenModal} />}
                </div>  


{/* This where Our exploring journey ends */}


            </div>

            </div>
        </div>
     );
}
 
export default Resources;