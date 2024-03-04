import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface RouteProps{
    component: React.FC;
}
interface UserState {
    isLoggedIn : boolean;
    userEmail : string;
   }
   interface RootState {
    user: UserState;
  }
const UserProtectedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const user = useSelector((state: RootState) => state.user.isLoggedIn);
const userEmail = localStorage.getItem('userEmail')
    console.log(userEmail,'protected route--->')
    if (!userEmail) {

        return <Navigate to="/login" />;
    }
    return <Component />;
};

export default UserProtectedRoute;