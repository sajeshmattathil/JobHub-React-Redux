import { duration } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosAdminInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
const CreateNewPlan = () => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  interface planData {
    name: string;
    amount: string;
    duration: string;
  }
  const onSubmit = async (data: planData) => {
    console.log(data, "dataaaa");
   try {
    const saveNewPlan = await axiosAdminInstance.post(
        "/admin/saveNewPlan",
        data
      );
      console.log(saveNewPlan, "savenew --- plan");
      if(saveNewPlan.data.status === 200) toast.success('New plan created.');  
setTimeout(() => {
    navigate('/admin/subscriptionManagement')
}, 2000);
   } catch (error) {
    toast.success('Something went wrong'); 
   }
  };
  return (
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
          Create New Subscription Plan
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
              required: true,
              pattern: /^[a-zA-Z\s]*$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setError("");
              setName(e.target.value);
            }}
            value={name}
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
              required: true,
              pattern: /^(?:0?[1-9]|1[02])$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setError("");
              setDuration(e.target.value);
            }}
            value={duration}
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
              required: true,
              pattern: /^(?:0?[1-9]|1[01])$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setError("");
              setAmount(e.target.value);
            }}
            value={amount}
          />
          {errors.amount && errors.amount.type === "required" && (
            <p className="errorMsg">Amount is required.</p>
          )}
          {errors.amount && errors.amount.type === "pattern" && (
            <p className="errorMsg">Amount is not valid.</p>
          )}
          <button type="submit" style={{ width: "100%", marginTop: "2%" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPlan;
