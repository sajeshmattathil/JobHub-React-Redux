import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/User/Home";
import LoginNew from "../../Pages/User/Login";
import SignUp from "../../Pages/User/SignUp";
import UserProtectedRoute from "./UserPrivateRoutes";
import profileManagement from "../../Pages/User/ProfileManagement";
import UserPublicRoutes from "./UserPublicRoutes";
import UserForgotPassword from "../../components/User/UserForgotPassword";
import ViewJob from "../../Pages/User/ViewJob";
import SearchBar from "../../components/User/Timer";
import { io } from 'socket.io-client';
import ChatHomeUser from "../../components/User/Chat/ChatHomeUser";
import ChatPageUser from "../../components/User/Chat/ChatPageUser";
import VideoCall from "../../components/VideoCall.tsx/videoCall";

const socket = io('http://localhost:3000');

function UserRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<UserPublicRoutes component={SignUp} />} />
      <Route path="/login" element={<LoginNew />} />
      <Route path="/forgotPassword" element={<UserForgotPassword />} />
      <Route path="/" element={<Home   />} />
      <Route
        path="/profilemanagement"
        element={<UserProtectedRoute component={profileManagement} />}
      />
      <Route path="/search" element={<SearchBar />} />
      <Route path="/jobPost/:id" element={<UserProtectedRoute component={ViewJob} />} />
      <Route path="/chatSignin" element={<ChatHomeUser />} />
      <Route path="/chatPage" element={<ChatPageUser socket={socket} />} />
      <Route path="/vdo" element={<VideoCall />} />



    </Routes>
  );
}

export default UserRoutes;
