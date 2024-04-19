import  { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { axiosUserInstance } from "../../Utils/axios/axios";
import Home from '../../Pages/User/UserHomePage'

interface RouteProps {
  component: React.FC;
}

const UserSessionRoute: React.FC<RouteProps> = () => {
 
  const userRef = useRef<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axiosUserInstance.get("/getUser");
        if (response.data.status === 201)
        userRef.current = response.data.user.email;
      } catch (error) {
        console.log("error happened try again");
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>; 
}
  if (!userRef.current) {

    return <Navigate to="/login" />;
  }
  return <Home />;
};

export default UserSessionRoute;
