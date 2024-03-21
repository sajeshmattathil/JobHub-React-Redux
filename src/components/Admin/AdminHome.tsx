import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontWeight: "bolder",
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          fontFamily: "sans-serif",
          height: "30vh",
          width: "300px",
          margin: "0 20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin/usermanagement")}
      >
        <h2>User Management</h2>
        <p>Manage each users here.</p>
      </div>
      <div
        className="card"
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          fontFamily: "sans-serif",
          height: "30vh",
          width: "300px",
          margin: "0 20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin/hrmanagement")}
      >
        <h2>HR Management</h2>
        <p>Manage HR details.</p>
      </div>
      <div
        className="card"
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          fontFamily: "sans-serif",
          height: "30vh",
          width: "300px",
          margin: "0 20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin/subscriptionManagement")}
      >
        <h2>Subscription Management</h2>
        <p>Manage your subscriptions here.</p>
      </div>
    </div>
  );
};

export default AdminHome;
