import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface RouteProps{
    component: React.FC;
}
interface HRState {
    isLoggedIn : boolean;
    hrEmail : string;
   }
   interface RootState {
    HR: HRState;
  }
const HRPrivatedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const HR = useSelector((state: RootState) => state.HR.isLoggedIn);
    const HREmail = localStorage.getItem('HREmail')

    console.log(HREmail)
    if (!HREmail) {

        return <Navigate to="/hr/login" />;
    }
    return <Component />;
};

export default HRPrivatedRoute;