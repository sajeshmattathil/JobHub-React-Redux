import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface RouteProps{
    component: React.FC;
}
interface UserState {
    isLoggedIn : boolean;
    userEmail : string;
   }
   interface RootState {
    user: UserState;
  }
const UserPublicRoutes: React.FC<RouteProps> = ({ component: Component }) => {
    const user = useSelector((state: RootState) => state.user.isLoggedIn);

    if (user) {

        return <Navigate to="/login" />;
    }
    return <Component />;
};

export default UserPublicRoutes;