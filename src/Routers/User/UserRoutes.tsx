import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/User/UserHomePage";
import LoginNew from "../../Pages/User/Login";
import SignUp from "../../Pages/User/SignUp";
import UserProtectedRoute from "./UserPrivateRoutes";
import profileManagement from "../../Pages/User/profileManagement";
import UserPublicRoutes from "./UserPublicRoutes";
import UserForgotPassword from "../../components/User/UserForgotPassword";
import ViewJob from "../../Pages/User/ViewJob";
import SearchBar from "../../components/User/Timer";
import ChatPageUser from "../../components/User/Chat/ChatPageUser";
import Subscriptions from "../../Pages/User/Subscriptions";
import UserSessionRoute from "./UserSessionRoute";
UserSessionRoute

function UserRoutes() {
  return (
   
          <Routes>
            <Route
              path="/signup"
              element={<UserPublicRoutes component={SignUp} />}
            />
            <Route path="/login" element={<LoginNew />} />
            <Route path="/forgotPassword" element={<UserForgotPassword />} />
            <Route path="/" element={<Home/>} />
            <Route
              path="/login"
              element={<UserSessionRoute component={Home} />}
            />
            <Route
              path="/profilemanagement"
              element={<UserProtectedRoute component={profileManagement} />}
            />
            <Route path="/search" element={<SearchBar />} />

            <Route
              path="/jobPost/:id"
              element={<ViewJob/>}
            />
           
             <Route
               path="/chatPage/:recipient"
              element={<UserProtectedRoute component={ChatPageUser} />}
            />
            <Route
              path="/subscriptionPlans"
              element={<UserProtectedRoute component={Subscriptions} />}
            />
            <Route
              path="/payment/:id"
              element={<UserProtectedRoute component={Subscriptions} />}
            />
          </Routes>
      
  );
}

export default UserRoutes;
