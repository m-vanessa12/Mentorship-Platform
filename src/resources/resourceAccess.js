import './resourcestyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const ReAccess = ({closeModel}) => {
    const navigate = useNavigate();
    const goToResources = useCallback( () => {
        navigate('/resources-content')
    }, [navigate]);

    return ( 

        <div className="modalBachground">
            <div className="access">
                <button onClick={() => closeModel(false)}>
                <FontAwesomeIcon icon={faClose} style={{ width: '20px', height: '20px', color: '#fff'}}  />   
                </button>
                <div className="access-items">
                    <div className="access-title">Access our Free Resources</div>
                    <div className="access-subtitle">Get empowered by reliable resources that will help grow professionally</div>
                    <div className="email">
                        <input type="text" placeholder='Your Email'/>               
                    </div>
                    <div className="privacy">
                        <input type="checkbox"/>
                        <span>I agree to your <a href="">privacy terms</a></span>
                    </div>
                    <div className="access-signup" onClick={goToResources}>
                        <input type="submit" value={'Sign-Up'}/>
                    </div>
                    <div className="cancel"><a href="" onClick={() => closeModel(false)}>No Thanks</a></div>
                </div>
            </div>
        </div>
     );
}
 
export default ReAccess;