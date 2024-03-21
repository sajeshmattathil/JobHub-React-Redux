import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { axiosHRInstance } from "../../Utils/axios/axios";

interface RouteProps {
  component: React.FC;
}
// interface HRState {
//   isLoggedIn: boolean;
//   hrEmail: string;
// }
// interface RootState {
//   HR: HRState;
// }
const HRPrivatedRoute: React.FC<RouteProps> = ({ component: Component }) => {
  // const HR = useSelector((state: RootState) => state.HR.isLoggedIn);
  // const HREmail = localStorage.getItem('HREmail')
  const [HREmail, setHREmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHRInstance.get("/hr/getHR");
        console.log(response, "res private");

        if (response.data.status === 201) setHREmail(response.data.HR.email);
        console.log(response.data.HR.email);
      } catch (error) {
        console.log(error, "error in protected route");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(HREmail);
  if (!HREmail) {
    return <Navigate to="/hr/login" />;
  }
  return <Component />;
};

export default HRPrivatedRoute;
