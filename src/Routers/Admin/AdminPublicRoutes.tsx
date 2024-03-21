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
const AdminPublicRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const admin = useSelector((state: RootState) => state.admin.isLoggedIn);

    console.log(admin)
    if (admin) {

        return <Navigate to="/admin/login" />;
    }
    return <Component />;
};

export default AdminPublicRoute;