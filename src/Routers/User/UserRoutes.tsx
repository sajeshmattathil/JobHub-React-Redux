import { Routes, Route } from "react-router-dom"; 
import Home from "../../Pages/User/Home";
import LoginNew from "../../Pages/User/Login";
import SignUp from "../../Pages/User/SignUp";
import UserProtectedRoute from "./UserPrivateRoutes";
import profileManagement from "../../Pages/User/ProfileManagement";
import UserPublicRoutes from "./UserPublicRoutes";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<UserPublicRoutes component={SignUp} />} />
      <Route path="/login" element={<LoginNew/>} />
      <Route path="/" element={<UserProtectedRoute component={Home} />} />
      <Route path="/profilemanagement" element={<UserProtectedRoute component={profileManagement} />}
      />
    </Routes>
  );
}

export default UserRoutes;
