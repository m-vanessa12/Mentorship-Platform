import Topbar from "../sidebar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import './community.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import React, { Suspense, useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import AddCommentComponent from "./addComment";
// const AddCommentComponent = React.lazy(() => import('./addComment'));
import { useNavigate } from 'react-router-dom'; 
import personal_profile from '../img/img-profile.png';
import { jwtDecode } from 'jwt-decode'; 


const getToken = () => {
    // Replace this with your actual logic to retrieve the token
    return localStorage.getItem('token');
   };


   const Community = ({ currentUser }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
   
    const [openModal, setOpenModal] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const [userLikes, setUserLikes] = useState({});
    const [currentUserState, setCurrentUserState] = useState(null);
    const [currentDiscussionId, setCurrentDiscussionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModalForDiscussion = (discussionId) => {
        setCurrentDiscussionId(discussionId); // Set the current discussion ID
        setIsModalOpen(true); // Open the modal
    };
    
    
    

    // Define fetchDiscussions outside of useEffect
    const fetchDiscussions = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://capstone-project-2-aaem.onrender.com/api/forum');
            const processedDiscussions = response.data.discussions.map(discussion => ({
                // Process each discussion
                ...discussion,
                likes: discussion.likesCount || 0,
                name: discussion.createdBy.name,
                role: discussion.createdBy.role,
                photo: discussion.createdBy.photo,
                commentCount: discussion.commentCount || 0,
                
            }));
            setDiscussions(processedDiscussions);
        } catch (error) {
            console.error('Error fetching discussions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch of discussions
    useEffect(() => {
        fetchDiscussions();
    }, []);

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                console.log('User ID:', userId);
                setCurrentUserState({ id: userId });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.log('Token not found');
        }
    }, []);


    const handleCommentClick = (discussionId) => {
        console.log('Current User:', currentUserState);
        if (!currentUserState || !currentUserState.id) {
            console.log('User ID:', currentUserState ? currentUserState.id : 'Not available');
            // Handle the case when the user is not logged in
            return;
        }
        setCurrentDiscussionId(discussionId); // Assuming you have a state to track the current discussion ID
        setIsModalOpen(true); // Open the modal
    };
    
    

    const addCommentToDiscussion = async (discussionId, newComment) => {
        try {
            // Fetch updated discussion data to include new comments
            const response = await axios.get(`https://capstone-project-2-aaem.onrender.com/forum/${discussionId}`);
            const updatedDiscussion = response.data.discussion;
    
            // Update the discussions state with the updated discussion data
            setDiscussions(prevDiscussions => {
                return prevDiscussions.map(discussion => {
                    if (discussion._id === updatedDiscussion._id) {
                        return updatedDiscussion;
                    }
                    return discussion;
                });
            });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    
    const updateDiscussion = (updatedDiscussion) => {
        setDiscussions(prevDiscussions => {
            return prevDiscussions.map(discussion => {
                if (discussion._id === updatedDiscussion._id) {
                    return updatedDiscussion;
                }
                return discussion;
            });
        });
    };
    
    
     

    //Displaying commentes of discussions
    const getDiscussionsWithComments = async (req, res) => {
        try {
            const discussions = await Discussion.find().populate('comments'); // Assuming 'comments' is the field name in the Discussion model
            
            res.status(200).json({ discussions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    const refreshDiscussions = async () => {
        try {
            const response = await axios.get('https://capstone-project-2-aaem.onrender.com/api/forum');
            const processedDiscussions = response.data.discussions.map(discussion => ({
                ...discussion,
                // process the discussion as needed
            }));
            setDiscussions(processedDiscussions); // Update the state with the latest discussions
        } catch (error) {
            console.error('Error fetching discussions:', error);
        }
    };
    

    const handleLike = async (discussionId, userId) => {
          const token = getToken(); // Assume this function retrieves the auth token
  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    const endpoint = '/api/likes'; // or whatever your endpoint is
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const response = await axios.post(`https://capstone-project-2-aaem.onrender.com${endpoint}`, { discussionId }, { headers });

    if (response.data.success) {
      // Here's where you update the likes count in your state
      updateLikesCount(discussionId, response.data.totalLikes);
      // Possibly refresh the list of discussions or perform additional actions
    } else {
      console.error('Like/unlike action was not successful:', response.data.message);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

    const updateLikesCount = (discussionId, newLikesCount) => {
        setDiscussions(currentDiscussions =>
          currentDiscussions.map(discussion =>
            discussion._id === discussionId
              ? { ...discussion, likesCount: newLikesCount }
              : discussion
          )
        );
      };
      
    
    const handleUnlike = async (discussionId, userId) => {
        try {
            const isLiked = userLikes[discussionId];
            const response = await axios.delete('https://capstone-project-2-aaem.onrender.com/api/likes', { data: { discussionId, userId } }); // Pass userId along with discussionId
    
            setUserLikes(prevUserLikes => ({
                ...prevUserLikes,
                [discussionId]: false // Set liked to false
            }));
    
            setDiscussions(prevDiscussions => {
                return prevDiscussions.map(discussion => {
                    if (discussion._id === discussionId) {
                        return { ...discussion, likes: response.data.likes };
                    }
                    return discussion;
                });
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            fetchDiscussions();
        }
    }, [isLoading]);

    return ( 
        <div className="community">
            <Topbar />
            <Sidebar/>
            
            <div className="discution-forum">
                <div className="person-discusion">
                    {discussions.map(discussion => (
                        <div className="discusion-container" key={discussion._id}>
                            <div className="owner-information">
                                <div className="owner-profile-set">
                                    <div className="discusion-owner">
                                        {/* Display profile photo of the user */}
                                        <img src={discussion.photo || personal_profile} alt="" />
                                    </div>
                                    <div className="discusion-owner-details">
                                        <div className="discusion-owner-names">{discussion.name}</div>
                                        <div className="discusion-status-time">
                                            <div className="discucion-status">{discussion.role}</div>
                                            <div className="discucion-dot"></div>
                                            <div className="posted-time">
                                                {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                                            </div>
                                        </div>                          
                                    </div>
                                </div>
                                <div className="discusion-access">
                                    <FontAwesomeIcon icon={faEllipsisV} style={{ width: '18px', height: '22px', padding: '15px', marginLeft: '30px'}}  /> 
                                </div>
                            </div>
    
                            <div className="discusion-forum-content">
                                <div className="discusion-forum-title">{discussion.title}</div>
                                <div className="discusion-forum-contents">{discussion.content}</div>
                            </div>
    
                            <div className="discusion-replies">
                                {/* <div className="discusion-likes" onClick={() => handleLike(discussion._id, currentUser ? currentUser.id : null)}>
                                    <FontAwesomeIcon 
                                        icon={faThumbsUp} 
                                        style={{ 
                                            width: '22px', 
                                            height: '25px', 
                                            padding: '5px',
                                            color: userLikes[discussion._id] ? '#007bff' : '#5e5d5d' // Change color based on userLikes state
                                        }} 
                                    />
                                    <span>{discussion.likesCount}</span>
                                    <span> likes</span>
                                </div> */}
                                <div className="discusion-comments">
                                    <FontAwesomeIcon icon={faComment} style={{ width: '22px', height: '25px', padding: '5px', color:'#5e5d5d'}}  /> 
                                    <span onClick={() => handleCommentClick(discussion._id)}> {discussion.commentCount} comments </span>
                                    {isModalOpen && (
                                        <Suspense fallback={<div>Loading comments...</div>}>
                                    <AddCommentComponent
                                        discussionId={currentDiscussionId} 
                                        closeModel={() => setIsModalOpen(false)} 
                                        userId={currentUserState?.id} 
                                        refreshDiscussions={refreshDiscussions} 
                                    />
                                    </Suspense>
                                )}

                                </div>
                            </div>
                            {discussion.comments && discussion.comments.map(comment => (
                            <div className="comments-display" key={comment._id}>
                                <div className="comment-owner">
                                    {/* Display profile photo of the comment owner */}
                                    <img src={comment.createdBy.photo || personal_profile} alt="" />
                                </div>
                                <div className="comment-details">
                                    <div className="comment-owner-name">{comment.createdBy.name}</div>
                                    <div className="comment-detail">
                                        <div className="comment-owner-role">{comment.createdBy.role}</div> 
                                        <div className="comment-dot"></div> 
                                        <div className="comment-createdTime">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                            </div>                                   
                                        </div>                                    
                                                                       
                                    <div className="comment-message">{comment.content}</div>
                                </div>
                            </div>
                        ))}

                        </div>
                    ))}
                </div>          
            </div>
        </div>
    );
}

export default Community;