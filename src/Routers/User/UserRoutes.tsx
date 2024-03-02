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

function UserRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<UserPublicRoutes component={SignUp} />} />
      <Route path="/login" element={<LoginNew />} />
      <Route path="/forgotPassword" element={<UserForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/profilemanagement"
        element={<UserProtectedRoute component={profileManagement} />}
      />
      <Route path="/search" element={<SearchBar />} />
      <Route path="/jobPost/:id" element={<UserProtectedRoute component={ViewJob} />} />


    </Routes>
  );
}

export default UserRoutes;
