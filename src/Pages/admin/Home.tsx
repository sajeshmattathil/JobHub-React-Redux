import AdminHome from "../../components/Admin/AdminHome";
import AdminNavbar from "../../components/Admin/AdminsNavbar";
import AdminSidebar from "../../components/Dashboard/AdminSidebar";

const Home = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex" style={{ display: "flex",height:'100vh' }}>
        <AdminSidebar />
        <AdminHome/>
      </div>
    </div>
  );
};

export default Home;
