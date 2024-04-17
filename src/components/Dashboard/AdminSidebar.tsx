import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white sidebar p-3">
      <div className="list-group list-group-flush">
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-speedometer2 fs-4 me-2"></i>
          <span>Dashboard</span>
        </a>
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-person-badge-fill fs-4 me-2"></i>

          <span onClick={() => navigate("/admin/usermanagement")}>
            User Management
          </span>
        </a>
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-person-gear fs-4 me-2"></i>
          <span onClick={() => navigate("/admin/hrmanagement")}>
            HR Management
          </span>
        </a>{" "}
        <a href="" className="list-group-item list-group-item-action my-1">
          <i className="bi bi-ticket-detailed fs-4 me-2"></i>
          <span onClick={() => navigate("/admin/subscriptionManagement")}>
            Subscription Management
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

export default AdminSidebar;
