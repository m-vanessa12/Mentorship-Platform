import './commentstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const AddCommentComponent = ({ discussionId, closeModel, userId }) => {
    const [commentContent, setCommentContent] = useState(''); // State for comment content
    const navigate = useNavigate(); // Initialize useNavigate


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Props in AddCommentComponent:', { discussionId, closeModel, userId });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://capstone-project-2-aaem.onrender.com/api/comment-to-discussion', {
                discussionId: discussionId, // Make sure this is named 'discussionId' as per backend
                content: commentContent, // This is correct
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                console.log('Comment added successfully:', response.data);
                closeModel(false); // Close the modal
                refreshDiscussions(); // Call this function to refresh discussions
            }
            navigate('/community'); // Use navigate instead of history.push
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comments-space">
            <div className="comments">
                <button onClick={() => closeModel(false)}>
                    <FontAwesomeIcon icon={faClose} style={{ width: '20px', height: '20px', color: '#fff' }} />
                </button>
                <div className="comments-items">
                    <div className="comment-title">Discussion Replies</div>
                    <div className="comment-subtitle">This is where I will fetch the posted discussion</div>
                    <div className="add-comment">
                        <textarea 
                            name="discussion"
                            cols="30"
                            rows="10"
                            placeholder='Add your comment here'
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="send-comment">
                        <input type="submit" value={'Add Comment'} onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCommentComponent;
