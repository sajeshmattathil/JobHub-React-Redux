import  { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosAdminInstance } from '../../Utils/axios/axios';

interface RouteProps{
    component: React.FC;
}

const AdminPrivatedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const adminRef = useRef<string | null>(null);

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            if(localStorage.getItem('adminEmail')?.trim()){
              const response = await axiosAdminInstance.get("/admin/getAdmin");
            console.log(response,'resssss>>>>>');
            
            if (response.data.status === 201)
            adminRef.current = response.data.admin.email;
            }else{
              adminRef.current = null
            }

          } catch (error) {
            console.log("error happened try again");
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
    console.log(adminRef.current,'currrrr');
    
    if (!adminRef.current && !adminRef.current?.trim()) {

        return <Navigate to="/admin/login" />;
    }
    return <Component />;
};

export default AdminPrivatedRoute;