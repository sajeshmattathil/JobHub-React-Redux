import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateJob from "../../Pages/hr/CreateJob";
import SignUp from "../../Pages/hr/SignUp";
import HrLogin from "../../Pages/hr/HrLogin";
import Home from "../../Pages/hr/Home";
import ProfileManagement from "../../Pages/hr/ProfileManagement";
import HRPrivatedRoute from "./HRPrivateRoutes";
import ViewJob from "../../Pages/hr/ViewJob";
import ChatPageUser from "../../components/HR/Chat/ChatPageUser";
import ChatHomeUser from "../../components/HR/Chat/ChatHomeUser";
import { Socket } from "socket.io-client";
import ShowShortListedUsers from "../../components/HR/ShowShortListedUsrers";
import VideoCall from "../../components/HR/VideoCall/VideoCall";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";



function HRRoutes({socket}:{socket:Socket}) {
  
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={"/login"} element={<HrLogin />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route
          path={"/job"}
          element={<HRPrivatedRoute component={CreateJob} />}
        />
        <Route path={"/"} element={<HRPrivatedRoute component={Home} />} />
        <Route
          path={"/profilemanagement"}
          element={<HRPrivatedRoute component={ProfileManagement} />}
        />
        <Route
          path={"/viewJob/:id"}
          element={<HRPrivatedRoute component={ViewJob} />}
        />
        <Route
          path={"/shortListedUsers/:jobId"}
          element={<HRPrivatedRoute component={ShowShortListedUsers} />}
        />
        <Route path="/chatSignin" element={<ChatHomeUser />} />
        <Route
          path="/chatPage/:recipient"
          element={<ChatPageUser socket={socket} />}
        />
        <Route
          path="/videoCall/:userId"
          element={<VideoCall socket={socket} />}
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default HRRoutes;
