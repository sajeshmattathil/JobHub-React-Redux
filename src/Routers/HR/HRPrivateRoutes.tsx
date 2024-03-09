import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axiosHRInstance } from '../../Utils/axios/axios';

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
    // const HREmail = localStorage.getItem('HREmail')
    const [HREmail,setHREmail] = useState<string | null>(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosHRInstance.get("/getHR");
            if (response.data.status === 201)
            setHREmail(response.data.user.email);
          } catch (error) {
            console.log(error, "error");
          }
        };
        fetchData();
      }, []);
    console.log(HREmail)
    if (!HREmail) {

        return <Navigate to="/hr/login" />;
    }
    return <Component />;
};

export default HRPrivatedRoute;