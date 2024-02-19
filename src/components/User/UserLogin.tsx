import React, { useState } from "react";
import { axiosInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../../Services/Redux/Slices/UserSlices";
import { useDispatch, useSelector } from "react-redux";
import generateOtp from "../../Utils/OtpGenerator/otpGenerator";

function UserLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [otp,setOtp] =useState('')
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: unknown) => {
    try {
      if (error !== "") return;

      const response = await axiosInstance.post("/login_submit", data);

      if (response?.data?.status === 201) {
        console.log(email, "email");

        dispatch(userLogin({ userEmail: email }));

        localStorage.setItem("userEmail", email);

        localStorage.setItem("userToken", response.data.token);

        navigate("/");
      } else if (response?.data?.status === 400)
        setError(response?.data?.message);
    } catch (err) {
      console.log("Error happenend in login submit", err);
    }
  };
  interface UserState {
    isLoggedIn: boolean;
    userEmail: string;
  }
  interface RootState {
    user: UserState;
  }
  const userEmail = useSelector((state: RootState) => state.user.userEmail);
  console.log(userEmail, "userEmail");

  const navigate = useNavigate();

  const handleCreateNewUser = () => {
    navigate("/signup");
  };

  const handleHiringManager = () => {
    navigate("/hr/login");
  };

 const handleForgotOtp = async ()=>{
  setOtp('otp sended')
  const otp = generateOtp()

  const sendForgotOtp = await axiosInstance.post('/forgot_otp',{
    otp : otp,
    createdAt : Date.now()
  })
  console.log(sendForgotOtp);
  
  }

if(otp.trim() === '')
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
          User Login
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
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg">Email is not valid.</p>
          )}

          <label>Password</label>
          <input
            type="password"
            // name="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setPassword(event.target.value)}
            value={password}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}

          <label></label>
          <button style={{marginTop : '3%',color : "white",backgroundColor : 'black'}} type="submit">Login</button>
        </div>
        <p style={{ cursor: "pointer" }} onClick={handleCreateNewUser}>
          Create a new account
        </p>
      <div style={{display : 'flex',justifyContent :'space-between' }}>
        <p style={{ cursor: "pointer"}} onClick={handleHiringManager}>
          Hiring Manager ?
        </p>
      <span onClick={handleForgotOtp}>Forgot password?</span>

      </div>
      </form>
    </div>
  );
  else {
    return (
      <div>
        <div
          className="otp"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <div
            className="otpInner items-center justify-center "
            style={{
              backgroundColor: "white",
              padding: "40px",

              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <p style={{ fontWeight: "bolder",fontFamily:'sans-serif',fontSize:"17px" }}>Enter your OTP</p>
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
            {resendClicked && (
              <p style={{fontWeight:'bold'}}>{`Time Remaining : ${minutes}:${seconds}`}</p>
            )}

            <span>
              <input
                type="text"
                style={{
                  border: "solid black 2px",
                  borderRadius: ".5rem",
                  margin: ".5rem",
                }}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                  setError("");
                }}
              />

              <button
                style={{
                  borderRadius: ".5rem",
                  color: "white",
                  backgroundColor: "black",
                  border: "none",
                }}
                onClick={handleOtp}
              >
                Submit
              </button>
            </span>
            <p style={{ cursor: "pointer" }} onClick={handleResendOTP}>
              Resend OTP
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserLogin;
