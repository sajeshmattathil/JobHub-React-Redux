import { useEffect, useState } from "react";
import { axiosAdminInstance } from "../../Utils/axios/axios";

interface dashboardInterface {
  totalUsers: number;
  totalHR: number;
  totalActiveSubscribers: number;
  totalRevenue: number;
}
const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState<dashboardInterface | null>(
    null
  );
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const getDashboardData = await axiosAdminInstance.get(
        "/admin/getDashboardData"
      );
      console.log(getDashboardData, "dashboard");
      if (getDashboardData.status === 202)
        setDashboardData({
          totalUsers: getDashboardData.data.dashboardData.totalUsers,
          totalHR: getDashboardData.data.dashboardData.totalHR,
          totalActiveSubscribers:
            getDashboardData.data.dashboardData.activeSubscribers,
          totalRevenue: getDashboardData.data.dashboardData.totalRevenue,
        });
    } catch (error) {
      console.log(error);
    }

  };
  const rupeeSymbol = "\u20B9";

  return (
    <div className="row" style={{ padding: "5%" }}>
      <div className="col-sm-6" style={{borderRadius:'20px'}}>
        <div className="card" style={{ height: "70%" }}>
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <p className="card-text">Total number of users joined Job Hub</p>
            <a href="" className="btn btn-primary" style={{fontSize:'2rem'}}>{dashboardData?.totalUsers}</a>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card" style={{ height: "70%" }}>
          <div className="card-body">
            <h5 className="card-title">Hiring Managers</h5>
            <p className="card-text">
              Total number of recruiters
            </p>
            <a href="" className="btn btn-primary" style={{fontSize:'2rem'}}>
              {dashboardData?.totalHR}
            </a>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card" style={{ height: "70%" }}>
          <div className="card-body">
            <h5 className="card-title">Active Subscribers</h5>
            <p className="card-text">
             Total active subscribers
            </p>
            <a href="" className="btn btn-primary" style={{fontSize:'2rem'}}>
             {dashboardData?.totalActiveSubscribers}
            </a>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card" style={{ height: "70%" }}>
          <div className="card-body">
            <h5 className="card-title">Revenue</h5>
            <p className="card-text">
             Total revenue generated from subscription.
            </p>
            <a href="" className="btn btn-primary" style={{fontSize:'2rem'}}>
            {rupeeSymbol} {dashboardData?.totalRevenue} /-
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
