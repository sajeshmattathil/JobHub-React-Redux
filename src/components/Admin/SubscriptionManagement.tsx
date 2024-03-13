import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdminInstance } from "../../Utils/axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const SubscriptionManagement = () => {
  const navigate = useNavigate();

  interface SubscriptioInterface {
    duration: string;
    amount: string;
    planName: string;
    _id: string;
  }
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);
  const fetchPlans = async () => {
    try {
      const getSubscriptionPlans = await axiosAdminInstance.get(
        "/admin/getPlans"
      );
      console.log(getSubscriptionPlans, "result");
      if (getSubscriptionPlans.data.status === 201) {
        setSubscriptions(getSubscriptionPlans.data.planDatas);
      }
    } catch (error) {
      toast.success("Something went wrong");
    }
  };

  const handleDeletePlan = async (id : string)=>{
    try {
        const deletePlan = await axiosAdminInstance.delete(`/admin/deletePlan/${id}`)
        console.log(deletePlan,'delete plan');
        if(deletePlan.data.status === 200)   toast.success("Plan deleted succesfully");  
    } catch (error) {
        toast.success("Something went wrong");   
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="subscrition" style={{ display: "flex" }}>
        <button onClick={() => navigate("/admin/createNewPlan")}>
          Create New Plan
        </button>
      </div>
      <table>
        <thead className="userHead">
          <tr>
            <th> Plan Name</th>
            <th>Duration</th>
            <th>Amount</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody className="userTableBody">
          {subscriptions &&
            subscriptions.map((subscription: SubscriptioInterface) => (
              <tr key={subscription._id}>
                <td>{subscription.planName}</td>
                <td>{subscription.duration}</td>
                <td>{subscription.amount}</td>

                <td>
                  <GrEdit
                    onClick={() =>
                      navigate(`/admin/editPlan/${subscription._id}`)
                    }
                    style={{ marginRight: "10%", cursor: "pointer" }}
                  />

                  <RiDeleteBin6Line
                    onClick={() => handleDeletePlan(subscription._id)}
                    style={{ marginLeft: "10%", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default SubscriptionManagement;
