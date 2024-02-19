import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const admin = useSelector((state: RootState) => state.admin.isLoggedIn);
    const adminEmail = localStorage.getItem('adminEmail')

    console.log(adminEmail)
    if (!adminEmail) {

        return <Navigate to="/admin/login" />;
    }
    return <Component />;
};

export default AdminPrivatedRoute;