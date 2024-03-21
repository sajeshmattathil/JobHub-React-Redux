import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosAdminInstance } from '../../Utils/axios/axios';

interface RouteProps{
    component: React.FC;
}
// interface adminState {
//     isLoggedIn : boolean;
//     adminEmail : string;
//    }
  //  interface RootState {
  //   admin: adminState;
  // }
const AdminPrivatedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const [adminEmail ,setAdminEmail] = useState<string >('')
    const [loading, setLoading] = useState<boolean>(true);

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const response = await axiosAdminInstance.get("/admin/getAdmin");
            console.log(response,'resss');
            
            if (response.data.status === 201)
            setAdminEmail(response.data.admin.email);
    console.log(response.data.admin.email)
    console.log(adminEmail)

          } catch (error) {
            console.log(error, "error");
          }
          finally{
            setLoading(false)
          }
        };
        fetchData();
      }, []);
      if (loading) {
        return <div>Loading...</div>; 
    }
    console.log(adminEmail)
    if (!adminEmail.trim()) {

        return <Navigate to="/admin/login" />;
    }
    return <Component />;
};

export default AdminPrivatedRoute;