import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axiosAdminInstance } from '../../Utils/axios/axios';

interface RouteProps{
    component: React.FC;
}
interface adminState {
    isLoggedIn : boolean;
    adminEmail : string;
   }
   interface RootState {
    admin: adminState;
  }
const AdminPrivatedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const [adminEmail ,setAdminEmail] = useState<string | null>(null)
    const admin = useSelector((state: RootState) => state.admin.isLoggedIn);
    // const adminEmail = localStorage.getItem('adminEmail')
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosAdminInstance.get("/getAdmin");
            if (response.data.status === 201)
            setAdminEmail(response.data.user.email);
          } catch (error) {
            console.log(error, "error");
          }
        };
        fetchData();
      }, []);

    console.log(adminEmail)
    if (!adminEmail) {

        return <Navigate to="/admin/login" />;
    }
    return <Component />;
};

export default AdminPrivatedRoute;