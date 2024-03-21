import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosAdminInstance } from "../../Utils/axios/axios";
import { useNavigate, useParams } from "react-router-dom";
const EditPlans = () => {
  const [planName, setPlanName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [planData, setPlanData] = useState<planData | null>(null);

  const navigate = useNavigate();
  const { planId } = useParams();
  console.log(planId, "iddd---");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  interface planData {
    _id ?: string;
    planName ?: string;
    amount ?: string;
    duration ?:  string;
  }

  useEffect(() => {
    fetchPlanData();
  }, []);
  const fetchPlanData = async () => {
    try {
      const getPlanData = await axiosAdminInstance.get(
        `/admin/getPlanData/${planId}`
      );
      console.log(getPlanData, "planDataaa");
      if (getPlanData.data.status === 201)
        setPlanData(getPlanData.data.planData);
    } catch (error) {
      console.log("something went wrong during get selected plan");
    }
  };
  const onSubmit = async (data: planData) => {
    console.log(data, "dataaaa");
    try {
      if (!data.amount) data.amount = planData?.amount;
      if (!data.planName) data.planName = planData?.planName;
      if (!data.duration) data.duration = planData?.duration;
if(planData){
  const saveNewPlan = await axiosAdminInstance.post(
    `/admin/updatePlan/${planData._id}`,
    data
  );
  if (saveNewPlan.data.status === 201)
    toast.success("Plan updated succesfully.");

  setTimeout(() => {
    navigate("/admin/subscriptionManagement");
  }, 2000);
}
     
    } catch (error) {
      toast.success("Something went wrong");
    }
  };
  return (
    <>
      {planData && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <ToastContainer />

          <form
            className="items-center justify-center"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <p style={{ fontFamily: "", fontSize: "30px", marginLeft: "25%" }}>
              Edit Subscription Plan
            </p>
            <p
              style={{
                color: "red",
                fontSize: "15px",
                alignItems: "center",
                justifyItems: "center",
                marginLeft: "27%",
              }}
            >
              {error}
            </p>
            <div className="form-control">
              <label>Name of plan</label>
              <input
                type="text"
                {...register("planName", {
                  required: false,
                  pattern: /^[a-zA-Z\s]*$/,
                })}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setError("");
                  setPlanName(e.target.value);
                }}
                value={!planName.trim() ? planData.planName : planName}
              />
              {errors.planName && errors.planName.type === "required" && (
                <p className="errorMsg">Name is required.</p>
              )}
              {errors.planName && errors.planName.type === "pattern" && (
                <p className="errorMsg">Name is not valid.</p>
              )}
              <label>Duration of plan</label>
              <input
                type="text"
                {...register("duration", {
                  required: false,
                  pattern: /^(?:0?[1-9]|1[02])$/,
                })}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setError("");
                  setDuration(e.target.value);
                }}
                value={!duration.trim() ? planData.duration : duration}
              />
              {errors.duration && errors.duration.type === "required" && (
                <p className="errorMsg">Duration is required.</p>
              )}
              {errors.duration && errors.duration.type === "pattern" && (
                <p className="errorMsg">Duration is not valid.</p>
              )}
              <label>Amount of plan</label>
              <input
                type="text"
                {...register("amount", {
                  required: false,
                  pattern: /^(?:0?[1-9]|1[01])$/,
                })}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setError("");
                  setAmount(e.target.value);
                }}
                value={!amount.trim() ? planData.amount : amount}
              />
              {errors.amount && errors.amount.type === "required" && (
                <p className="errorMsg">Amount is required.</p>
              )}
              {errors.amount && errors.amount.type === "pattern" && (
                <p className="errorMsg">Amount is not valid.</p>
              )}
              <button type="submit" style={{ width: "100%", marginTop: "2%" }}>
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPlans;
