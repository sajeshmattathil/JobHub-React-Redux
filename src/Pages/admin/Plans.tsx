import AdminNavbar from "../../components/Admin/AdminsNavbar";
import SubscriptionManagement from "../../components/Admin/SubscriptionManagement";
import AdminSidebar from "../../components/Dashboard/AdminSidebar";

const Plans = () => {
  return (
    <div>
    <AdminNavbar />
    <div className="flex" style={{ display: "flex",height:'100vh' }}>
      <AdminSidebar />
      <SubscriptionManagement/>
    </div>
  </div>
  );
};

export default Plans;
