import  { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { axiosUserInstance } from "../../Utils/axios/axios";

interface RouteProps {
  component: React.FC;
}

const UserProtectedRoute: React.FC<RouteProps> = ({ component: Component }) => {
 
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
  return <Component />;
};

export default UserProtectedRoute;
