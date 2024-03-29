import  { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { axiosUserInstance } from "../../Utils/axios/axios";

interface RouteProps {
  component: React.FC;
}
// interface UserState {
//   isLoggedIn: boolean;
//   userEmail: string;
// }
// interface RootState {
//   user: UserState;
// }
const UserProtectedRoute: React.FC<RouteProps> = ({ component: Component }) => {
 
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // const user = useSelector((state: RootState) => state.user.isLoggedIn);

  // const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axiosUserInstance.get("/getUser");
        if (response.data.status === 201)
          setUserEmail(response.data.user.email);
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
  if (!userEmail) {
    return <Navigate to="/login" />;
  }
  return <Component />;
};

export default UserProtectedRoute;
