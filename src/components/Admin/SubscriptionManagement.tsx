import  { useEffect, useState } from "react";
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
  const [shouldRender,setShouldRender] = useState<boolean>(false)

  useEffect(() => {
    fetchPlans();
  }, [shouldRender]);
  const fetchPlans = async () => {
    try {
      const getSubscriptionPlans = await axiosAdminInstance.get(
        "/admin/getPlans"
      );
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
        if(deletePlan.data.status === 200)   toast.success("Plan deleted succesfully"); 
        setShouldRender(prev=>!prev) 
    } catch (error) {
        toast.success("Something went wrong");   
    }
  }

  return (
    <>
      <ToastContainer />

     
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', width: 'calc(100% - 200px)' }}>

<div style={{border:'2px solid grey',margin:'5%',borderRadius:'20px'}}>
<div className="subscrition" style={{ display: "flex" }}>
        <button onClick={() => navigate("/admin/createNewPlan")}>
          Create New Plan
        </button>
      </div>
<h2 style={{marginLeft:'3%',marginTop :'3%'}}>Manage subscription plans here</h2>

      <table className="" style={{marginBottom:'5%'}}>
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
      </div>
      </div>

    </>
  );
};

export default SubscriptionManagement;
