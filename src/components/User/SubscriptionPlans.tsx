import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance, axiosUserInstance } from "../../Utils/axios/axios";
import Modal from "../HR/modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionPlans = () => {
  const [Razorpay] = useRazorpay();

  const userEmail  = localStorage.getItem('userEmail')

  interface SubscriptioInterface {
    duration: string;
    amount: string;
    planName: string;
    _id: string;
    isActive: boolean;
    users: [string];
  }

  const [plans, setPlans] = useState<SubscriptioInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const planRef = useRef<SubscriptioInterface | null>(null);

  useEffect(() => {
    fetchPlanDatas();
  }, [isOpen]);

  const fetchPlanDatas = async () => {
    const planDatas = await axiosUserInstance.get("/getPlans");
    if (planDatas.data.status === 201) {
      setPlans(planDatas.data.planDatas);
      
    }
  };
  const rupeeSymbol = "\u20B9";

  const handleToggleManageModal = async (id: string) => {
  

    setIsOpen(!isOpen);
    const filteredPlan = plans.filter((plan) => id === plan._id);
    planRef.current = filteredPlan[0];
  };
  const [paymentError, setPaymentError] = useState("");
  console.log(paymentError, "");

  const createOrder = useCallback(async () => {
    try {
      console.log(planRef.current, "refff");
      if (planRef.current) {
        setLoading(false);

        const response = await axiosInstance.post("/create-order", {
          amount: Number(planRef.current.amount) * 100,
        });
        console.log(response, "resss");

        const options: RazorpayOptions = {
          key: import.meta.env.RAZORPAY_ID_KEY,
          amount: response.data.order.amount + ".00",
          currency: "INR",
          name: "JobHub",
          notes: {},
          description: "Payment for services",
          order_id: response.data.order.id,
          handler: async function (response) {
            const savePayment = await axiosUserInstance.post("/savePayment", {
              razorpayId: response.razorpay_order_id,
              subscribedAt: Date.now(),
              amount: planRef.current?.amount,
              duration: planRef.current?.duration,
              planName: planRef.current?.planName,
              planId : planRef.current?._id
            });
            if (savePayment.status === 200) setIsOpen(!isOpen);
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
        const rzpay = new Razorpay(options);
        rzpay.open();
      }
    } catch (error) {
      setPaymentError("Failed to create payment order");
      console.error("Error:", error);
    }
  }, [Razorpay]);
  if (loading) return <div>loading</div>;
  if (isOpen)
    return (
      <div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <div
            className=""
            style={{
              width: "80%",
              height: "auto",

              textAlign: "center",
            }}
          >
            <AiOutlineCloseCircle
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                fontSize: "24px",
              }}
              onClick={() => setIsOpen(!isOpen)}
            />

            <h1>{planRef.current?.planName} </h1>
            <h1>{planRef.current?.duration} Month</h1>
            <h1>
              {rupeeSymbol} {planRef.current?.amount}/- Only
            </h1>
            <button onClick={createOrder}>Confirm Payment</button>
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
            flexDirection: "row",
            padding: "20px",
          }}
        >
          {plans.map((plan) => {
            return (
              <div
                key={plan._id}
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
              onClick={() =>{
                if( userEmail && !plan.users.includes(userEmail)) handleToggleManageModal(plan._id)
              } }
              >
                <h2>{plan.planName}</h2>
                <p style={{ fontSize: "3vw" }}>
                  {rupeeSymbol}
                  {plan.amount} /-
                </p>
                <p>{plan.duration} Month</p>
                { userEmail && plan.users.includes(userEmail) &&   <h3 style={{font : 'green',border:'2px green solid',padding : '1rem',borderRadius : '2rem'}}>Active Plan</h3>}
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
    height: "auto", // Change height to auto
    maxWidth: "500px", // Set maximum width for responsiveness
    margin: "0 auto", // Center horizontally using margin
    display: "flex", // Use Flexbox
    flexDirection: "column", // Stack children vertically
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
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
