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
import { Socket, io } from "socket.io-client";
import ChatHomeUser from "../../components/User/Chat/ChatHomeUser";
import ChatPageUser from "../../components/User/Chat/ChatPageUser";
import VideoCall from "../../components/VideoCall.tsx/VideoCall";
import { SocketProvider } from "../../Providers/Socket";
import RoomPage from "../../components/VideoCall.tsx/RoomPage";
import PeerProvider from "../../Providers/Peer";
import Subscriptions from "../../Pages/User/Subscriptions";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";


function UserRoutes({socket}:{socket:Socket}) {
  return (
    <SocketProvider>
      <PeerProvider>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/signup"
              element={<UserPublicRoutes component={SignUp} />}
            />
            <Route path="/login" element={<LoginNew />} />
            <Route path="/forgotPassword" element={<UserForgotPassword />} />
            <Route path="/" element={<Home socket={socket}  />} />
            <Route
              path="/profilemanagement"
              element={<UserProtectedRoute component={profileManagement} />}
            />
            <Route path="/search" element={<SearchBar />} />
            <Route
              path="/jobPost/:id"
              element={<UserPublicRoutes component={ViewJob} />}
            />
            <Route path="/chatSignin" element={<ChatHomeUser />} />
            <Route
              path="/chatPage"
              element={<ChatPageUser socket={socket} />}
            />
            <Route path="/vdo" element={<VideoCall />} />
            <Route path="/chat/:roomId" element={<RoomPage />} />
            <Route
              path="/subscriptionPlans"
              element={<UserProtectedRoute component={Subscriptions} />}
            />
            <Route
              path="/payment/:id"
              element={<UserProtectedRoute component={Subscriptions} />}
            />
          </Routes>
        </ErrorBoundary>
      </PeerProvider>
    </SocketProvider>
  );
}

export default UserRoutes;
