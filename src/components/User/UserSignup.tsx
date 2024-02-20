import React, { useState } from "react";

import { axiosInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import generateOtp from "../../Utils/OtpGenerator/otpGenerator";
import { useForm } from "react-hook-form";

function UserSignup() {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPsw, setConfirm] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [resendClicked, setClicked] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number | string>('00');

  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_data: unknown) {
    try {
      if (password !== confirmPsw) {
        setError("Password must match each other");
        return;
      }

      if (email.trim() === "" || password.trim() == "") {
        setError("Complete all the fields");
        return;
      }
      const otp = generateOtp();
      const createdAt = Date.now();

      const response = await axiosInstance.post("/signup_submit", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        confirm: confirmPsw,
        otp: otp,
        createdAt: createdAt,
      });
      console.log(response, "<<<<<<<<<");
      if (response.data.status === 500) setError(response?.data?.message);
      if (response.data.status === 400) setError(response?.data?.message);
      if (response.data.status === 409) setError(response?.data?.message);

      if (response?.data?.status === 201) {
        setError("");
        if (otp) setOtp(otp);
      }
      // navigate('/login')
    } catch (error) {
      console.log("error found in signup submit", error);
      setError("User already exists");
    }
  }
  const handleOtp = async () => {
    try {
      if (enteredOtp.trim().length === 6) {
        const response = await axiosInstance.patch("/verifyOtp", {
          otp: enteredOtp,
          userId: email,
        });
        console.log(response, "response");

        if (response.data.status === 201) navigate("/login");
        if (response.data.status === 401) setError(response.data.message);
        if (response.data.status === 500) setError(response.data.message);
        if (response.data.status === 404) setError(response.data.message);

        setOtp("");
      } else {
        setError("Enter correct OTP");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong try again");
      setOtp("");
    }
  };
  let timer: number
  let interval: NodeJS.Timeout;
  const handleResendOTP = async () => {
    console.log(1111);

    try {
      setClicked(true);
      const otp = generateOtp();
      const createdAt = Date.now();
      if (interval) {
        console.log('intervallll');
        
        clearInterval(interval);
        // interval = 0;
      } 
      timer = 600
      startTimer();
      const resendOTP = await axiosInstance.post('/resendOTP',{
        userId : email,
        otp : otp,
        createdAt :createdAt
      })
      if(resendOTP.data.status === 400) setError('Something went wrong ,try again')

      console.log(resendOTP,'result ----resendotp');
    } catch (error) {
      console.log("error in resend otp ", error);
    }
  };

 
 
  //  timer = 600;
  const updateTimer = () => {
    try {
      const minutes = Math.floor(timer / 60);
      let seconds: string | number = timer % 60;
      if (seconds < 10) seconds = "0" + seconds;
      setMinutes(minutes);
      setSeconds(seconds);
    } catch (error) {
      console.log("error in otp timer", error);
    }
  };
  function startTimer() {
    console.log("settimer");

    interval = setInterval(() => {
      timer--;
      updateTimer();

      if (timer === 0) {
        clearInterval(interval);
        setClicked(false)
      }
    }, 1000);
  }

  const handleExistingUser = (): void => {
    navigate("/login");
  };
  const handleExisitinHr = () => {
    navigate("/hr/login");
  };
  if (otp.trim() === "") {
    return (
      <div>

        <div
          className="signup"
          style={{
            marginTop: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgb(240, 220, 220)",
            width :'45%',
            marginLeft : "30%"
          }}
          
        >
          <form
            className="signupForm items-center justify-center"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <p
              style={{
                fontFamily: "",
                fontSize: "30px",
                marginLeft: "25%",
                fontWeight: "bold",
              }}
            >
              User Sign Up
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
              <label htmlFor="">First Name</label>
              <input
                type="text"
                {...register("fname", {
                  required: true,
                  pattern: /^[A-Za-z]+$/,
                })}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setFname(e.target.value);
                  setError("");
                }}
                value={fname}
              />
              {errors.fname && errors.fname.type === "required" && (
                <p className="errorMsg">First Name is required.</p>
              )}
              {errors.fname && errors.fname.type === "pattern" && (
                <p className="errorMsg">First Name is not valid.</p>
              )}
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                {...register("lname", {
                  required: true,
                  pattern: /^[A-Za-z]+$/,
                })}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setLname(e.target.value);
                  setError("");
                }}
                value={lname}
              />
              {errors.lname && errors.lname.type === "required" && (
                <p className="errorMsg">Last Name is required.</p>
              )}
              {errors.lname && errors.lname.type === "pattern" && (
                <p className="errorMsg">Last Name is not valid.</p>
              )}

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
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
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
                  Password should contain at least one uppercase letter,
                  lowercase letter, digit, and special symbol.
                </p>
              )}

              <label>Confirm</label>
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
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setConfirm(event.target.value)}
                value={confirmPsw}
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
                  Password should contain at least one uppercase letter,
                  lowercase letter, digit, and special symbol.
                </p>
              )}
              <button type="submit">Sign up</button>

              <p style={{ cursor: "pointer" }} onClick={handleExistingUser}>
                Already have a account?
              </p>
              <p style={{ cursor: "pointer" }} onClick={handleExisitinHr}>
                Hiring Manager?
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
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
    );
  }
}

export default UserSignup;
