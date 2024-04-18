import "bootstrap-icons/font/bootstrap-icons.css";
import "../Dashboard/style.css";
import { useNavigate } from "react-router-dom";

const HRSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white sidebar p-3">
      <div className="list-group list-group-flush">
       
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-user fs-4 me-2"></i>

          <span onClick={() =>navigate("/hr/profilemanagement")}>
            Profile Management
          </span>
        </a>
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-people fs-4 me-2"></i>
          <span onClick={() => navigate("/hr/followers")}>
            Followers
          </span>
        </a>{" "}
       
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-power fs-4 me-2"></i>
          <span
            onClick={() => {
              localStorage.removeItem("adminEmail");
              localStorage.removeItem("adminToken");
              navigate("/admin/login");
            }}
          >
            Logout
          </span>
        </a>
      </div>
    </div>
  );
};

export default HRSidebar;
