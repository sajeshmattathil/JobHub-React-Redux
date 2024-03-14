import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import Modal from "../HR/modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Razorpay from "razorpay";

const SubscriptionPlans = () => {
  declare global {
    interface Window {
      Razorpay: any;
    }
  }

  interface SubscriptioInterface {
    duration: string;
    amount: string;
    planName: string;
    _id: string;
  }
  const [plans, setPlans] = useState<SubscriptioInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptioInterface | null>(
    null
  );

  useEffect(() => {
    fetchPlanDatas();
  }, []);
  const fetchPlanDatas = async () => {
    const planDatas = await axiosUserInstance.get("/getPlans");
    console.log(planDatas, "planDatas");
    if (planDatas.data.status === 201) {
      setPlans(planDatas.data.planDatas);
    }
  };
  const rupeeSymbol = "\u20B9";

  const navigate = useNavigate();

  const handleToggleManageModal = async (id) => {
    setIsOpen(!isOpen);
    const filteredPlan = plans.filter((plan) => id == plan._id);
    setSelectedPlan(filteredPlan[0]);
  };
  const [paymentError, setPaymentError] = useState("");

  const createOrder = async () => {
    try {
      let price: number | string = selectedPlan?.amount + ".00";
      price = Number(price);
      console.log(price, "price");

      const response = await axiosInstance.post("/create-order", {
        amount: price,
      });
      console.log(response, "resss");

      const options = {
        key: import.meta.env.RAZORPAY_ID_KEY,
        amount: response.data.order.amount + ".00",
        currency: "INR",
        name: "JobHub",
        description: "Payment for services",
        order_id: response.data.order.id,
        handler: async function (response) {
          console.log(response);
          await axiosUserInstance.post('/savePayment',response)
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setPaymentError("Failed to create payment order");
      console.error("Error:", error);
    }
  };
  if (isOpen)
    return (
      <div>
        <Modal isOpen={isOpen} onClose={handleToggleManageModal}>
          <div
            className=""
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <AiOutlineCloseCircle
              style={{ marginLeft: "99%", cursor: "pointer", fontSize: "200%" }}
              onClick={handleToggleManageModal}
            />

            <div
              className=""
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <h1>{selectedPlan?.planName} </h1>
              <h1>{selectedPlan?.duration} Month</h1>
              <h1>
                {rupeeSymbol} {selectedPlan?.amount}/- Only
              </h1>
              <button onClick={createOrder}>Confirm Payment</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  else
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row", // Adjust the layout to be a column
            padding: "20px",
          }}
        >
          {plans.map((plan) => {
            return (
              <div
                className="card"
               
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  fontFamily: "sans-serif",
                  margin: "10px",
                  cursor: "pointer",
                  width: "70%",
                  maxWidth: "500px",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => handleToggleManageModal(plan._id)}
              >
                <h2>{plan.planName}</h2>
                <p style={{ fontSize: "3vw" }}>
                  {rupeeSymbol}
                  {plan.amount} /-
                </p>
                <p>{plan.duration} Month</p>
              </div>
            );
          })}
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
            height: "25vh",
            marginLeft: "27%",
            width: "50%",
            margin: "0 20px",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            <h3 style={{ margin: "2vw" }}>How subscription helps you </h3>
            <ul style={{ fontSize: "1.7vw" }}>
              <li>Chat with Hiring Managers</li>
              <li>Time Line of your applied job </li>
              <li>Apply numerous number of jobs</li>
              <li>connect with company and hiring managers</li>
            </ul>
          </p>
        </div>
      </>
    );
};
export default SubscriptionPlans;
