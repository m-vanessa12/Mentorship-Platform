import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';// Adjust the import path as necessary
import HomePage from './Landing Page/landing';
import SignUp from './signup-login/SignUp';
import Login from './signup-login/Login';
import MenteeProfileCreate from './profile/mentee';
import MentorProfileCreate from './profile/mentor';
import PlatformHome from './Platform overview/home';
import Content from './discusion board/content';
import Community from './community/community';
import Users from './platform users/users';
import MentorUsers from './platform users/MentorUsers';
import Mentee from './platform users/MenteeView';
import Mentor from './platform users/MentorView';
import Schedule from './platform users/schedule';
import Settings from './Settings/settings';
import AddComment from './community/addComment';
//import CalendlySetting from './platform users/schedule';
import Resources from './resources/resources';
import MentorSessions from './Sessions/MentorBookedSessions';
import MenteeMeetings from './Sessions/MenteesSessions';
import RejectInvite from './Sessions/inviteReject';
import AcceptInvite from './Sessions/acceptInvite';
import ResourcesContent from './resources/resourcesContent';
import AdminSpace from './Settings/Admin';
import MenteeProfile from './personalProfile/MenteeProfile';
import MentorProfile from './personalProfile/MentorProfile';
import NotifyInterests from './Sessions/Interest';
import NotifiedInterests from './Sessions/MenteeInterests';


function App() {


 return (
    <Router>
      {/* <AuthProvider>  */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mentee-profile-create" element={<MenteeProfileCreate />} />
          <Route path="/mentor-profile-create" element={<MentorProfileCreate />} />
          <Route path="/introductory" element={<PlatformHome />} />
          <Route path="/create-discusion" element={<Content />} />
          <Route path="/community" element={<Community />} />
          <Route path="/Mentees" element={<Users />} />
          <Route path="/mentors" element={<MentorUsers />} />
          {/* <Route path="/community">
          <Community currentUser={currentUser} />
         </Route> */}


          <Route path="/mentees/:menteeId" element={<Mentee />} />
          <Route path="/mentee-interest/:menteeId" element={<NotifyInterests />} />
          <Route path="/recieved-interest" element={<NotifiedInterests/>} />


          <Route path="/mentors/:mentorId" element={<Mentor />} />
          <Route path="/mentorprofile" element={<Mentor />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/mentors/:mentorId/booksession" element={<CalendlySetting />} />   */}
          <Route path="/mentors/:mentorId/booksession" element={<Schedule/>} />  

          <Route path="/discussion-comments/:discussionId" element={<AddComment />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources-content" element={<ResourcesContent />} />
          <Route path="/mentor-sessions" element={<MentorSessions/>} />
          <Route path="/mentee-meetings" element={<MenteeMeetings/>} />
          <Route path="/:sessionId/reject" element={<RejectInvite/>} />
          <Route path="/:sessionId/accept" element={<AcceptInvite/>} />
          <Route path="/update-users" element={<AdminSpace/>} />
          <Route path="/mentee-profile" element={<MenteeProfile/>} />
          <Route path="/mentor-profile" element={<MentorProfile/>} />

         


          {/* <Route path="/mentor-calendly" element={<CalendlySetting />} /> */}


          
          {/* Add other routes as needed */}
        </Routes>
      {/* </AuthProvider> */}
    </Router>
 );
}

export default App;
