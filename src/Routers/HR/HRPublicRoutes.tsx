import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
const HRPublicRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const HR = useSelector((state: RootState) => state.HR.isLoggedIn);

    if (HR) {

      return <Navigate to="/hr/login" />;
    }
    return <Component />;
};

export default HRPublicRoute;