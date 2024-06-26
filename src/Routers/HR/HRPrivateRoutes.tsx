import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { axiosHRInstance } from "../../Utils/axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RouteProps {
  component: React.FC;
}

const HRPrivatedRoute: React.FC<RouteProps> = ({ component: Component }) => {
  console.log("callingggg");
  const [loading, setLoading] = useState<boolean>(true);
  const HRRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("HREmail")?.trim()) {
          console.log(axiosHRInstance, "instance");
          const response = await axiosHRInstance.get("/hr/getHR");
          console.log(response, "hr -- private");
          if (response.data.status === 201)
            HRRef.current = response.data.HR.email;
          console.log(response?.data?.HR?.email, "private");
        } else {
          toast.success("Login for view you account");
          console.log("no hr found");
          HRRef.current = null;
        }
      } catch (error) {
        console.log("error in protected route", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <>
        <ToastContainer />

        <div>Loading...</div>
      </>
    );
  }
  console.log(HRRef.current, "hrEmail -- private");

  if (!HRRef.current?.trim()) {
    return <Navigate to="/hr/login" />;
  }
  return <Component />;
};

export default HRPrivatedRoute;
