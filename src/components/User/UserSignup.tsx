import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo2 from "../../../public/logo2.jpg";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

function UserSignup() {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPsw, setConfirm] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);


  const [otp, setOtp] = useState<string>("");
  const [resendClicked, setClicked] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number | string>("00");

  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState<number>(10);
  const navigate = useNavigate();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      const createdAt = Date.now();

      const response = await axiosInstance.post("/signup_submit", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        confirm: confirmPsw,
        createdAt: createdAt,
      });

     

      if (response?.data?.status === 201) {
        setError("");
        setOtp("Otp send succesfully");
        startTimer();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.success(error?.response?.data?.message);
      // setError("User already exists");
    }
  }
  const handleOtp = async () => {
    try {
      if (enteredOtp.trim().length === 6) {
        const response = await axiosInstance.patch("/verifyOtp", {
          otp: enteredOtp,
          userId: email,
        });

        if (response.data.status === 200) {
          toast.success(response.data.message)
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
        // setOtp("");
      } else {
        setError("Enter correct OTP");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.status === 401)
        setError(error.response.data.message);
      if (error.response.data.status === 401)
        setError(error.response.data.message);
      if (error.response.data.status === 401)
        setError(error.response.data.message);

      // setError("Something went wrong try again");
      // setOtp("");
    }
  };

  const handleResendOTP = async () => {
    try {
      setClicked(true);
      setError('')
      setEnteredOtp('')
      const createdAt = Date.now();
      if (intervalRef.current) clearTimer();
      startTimer();
      const resendOTP = await axiosInstance.post("/resendOTP", {
        userId: email,
        createdAt: createdAt,
      });
      if (resendOTP.data.status === 400)
        setError("Something went wrong ,try again");
    } catch (error) {
      console.log("error in resend otp ");
    }
  };

  useEffect(() => {
    const updateTimer = () => {
      try {
        const minutes = Math.floor(timer / 60);
        let seconds: string | number = timer % 60;
        if (seconds < 10) seconds = "0" + seconds;
        setMinutes(minutes);
        setSeconds(seconds);
      } catch (error) {
        console.log("error in otp timer");
      }
    };
    if (intervalRef.current && timer == 0) {
      clearInterval(intervalRef.current);
      setClicked(false);
    }
    updateTimer();
  }, [timer]);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          return prev - 1;
        });
        // updateTimer();
      }, 1000);
    }
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);

      intervalRef.current = null;
      setTimer(600);
    }
  };

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
            width: "45%",
            marginLeft: "30%",
          }}
        >
          <ToastContainer />

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
                fontSize: "2rem",
                marginLeft: "15%",
                fontWeight: "bold",
              }}
            >
              <img src={logo2} alt="" style={{ width: "30%", height: "30%" }} />{" "}
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
              <div
               style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #cccccc",
                borderRadius: "5px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'black';
              }}
              >
              <input
               type={hidePassword ? "password" : "text"}
               style={{ border: "none", outline: "none" }}
                {...register("password", {
                  required: true,
                  validate: {
                    checkLength: (value) => value.length >= 6,
                    matchPattern: (value) =>
                      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@%#$*])/.test(
                        value
                      ),
                  },
                })}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setPassword(event.target.value)}
                value={password !== '' ? password:'' }
              />
               <div
              className="hidePassword"
              onClick={() => setHidePassword((prev) => !prev)}
              style={{ cursor: "pointer", paddingRight: "3%" }}
            >
              <FaRegEyeSlash style={{ fontSize: "150%" }} />
            </div>
              </div>
              
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
              <div
               style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #cccccc",
                borderRadius: "5px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'black';
              }}
              >
              <input
               type={hideConfirmPassword ? "password" : "text"}
               style={{ border: "none", outline: "none" }}
               
                {...register("password", {
                  required: true,
                  validate: {
                    checkLength: (value) => value.length >= 6,
                    matchPattern: (value) =>
                      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@%#$*])/.test(
                        value
                      ),
                  },
                })}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setConfirm(event.target.value)}
                value={confirmPsw !== '' ? confirmPsw:''}
              />
               <div
              className="hidePassword"
              onClick={() => setHideConfirmPassword((prev) => !prev)}
              style={{ cursor: "pointer", paddingRight: "3%" }}
            >
              {hideConfirmPassword ? <FaRegEyeSlash style={{ fontSize: "150%" }} /> : <IoEyeOutline style={{ fontSize: "150%" }} />}

              
            </div>
              </div>
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
              <button
                type="submit"
                style={{ marginTop: "2%", backgroundColor: "black" }}
              >
                Sign up
              </button>

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
        <ToastContainer />
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
            <p
              style={{
                fontWeight: "bolder",
                fontFamily: "sans-serif",
                fontSize: "17px",
                alignContent:'center',
                placeItems:'center'
              }}
            >
              <img src={logo2} alt="" style={{ width: "30%", height: "30%",marginLeft:'35%' }} />{" "}
              <h2>Enter your OTP</h2>
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
            {resendClicked && (
              <p
                style={{ fontWeight: "bold" }}
              >{`Time Remaining : ${minutes}:${seconds}`}</p>
            )}

            <span>
              <input
                type="text"
                style={{
                  border: "solid black 2px",
                  borderRadius: ".5rem",
                  marginBottom: ".5rem",
                }}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                  setError("");
                }}
              />
            </span>
            <div style={{display:'flex',justifyContent:'space-between'}}>
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
               <p style={{ cursor: "pointer",fontWeight:'bold',fontSize:'.3rem' }} onClick={handleResendOTP}>
              <h4>Resend OTP</h4>
            </p>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default UserSignup;
