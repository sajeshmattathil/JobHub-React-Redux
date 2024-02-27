import React, { useState } from "react";
import { axiosInstance } from "../../Utils/axios/axios";
import generateOtp from "../../Utils/OtpGenerator/otpGenerator";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserForgotPassword = () => {

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");
  const [resendClicked, setClicked] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number | string>('00');
  const [newPassword,setNewPassword] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [confirm,setConfirm ] = useState<string>('')

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  interface formData {
    email : string
  }
  const onSubmit = async (data : formData)=>{
    window.scrollTo(0, 0);

    try {
        const otp = generateOtp()
      
        const sendForgotOtp = await axiosInstance.post('/forgot_password',{
          otp : otp,
          createdAt : Date.now(),
          userId : data.email
        })

        console.log(sendForgotOtp,'sendForgotOtp');

        if(sendForgotOtp.data.status === 201){
           console.log(error,'error1');
           
            setOtp('otp mailed')
        } 
        // if(sendForgotOtp.data.status === 404) setError('User Not Found,Create new Account')
       
    
    } catch (error:unknown) {
        console.log('error happened in sending forgot otp in userpassword component');  
        console.log(error.response.data.status ,'errorss');
          if(error.response.data.status === 404) setError('User Not Found')
          if(error.response.data.status === 500) setError('Something went wrong ,try again')

    }
  }

  const handleOtp = async () => {
    try {
      if (enteredOtp.trim().length === 6) {
        const response = await axiosInstance.post("/verifyFortgotOtp", {
          otp: enteredOtp,
          userId: email,
          purpose : 'forgotOtp'
        });
        console.log(response, "response");

        if (response.data.status === 201) {
            setNewPassword('open new Password component');
            setOtp('')
        } 
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
  var interval: NodeJS.Timeout;

  const handleResendOTP = async () => {
    console.log(1111);

    try {
      setClicked(true);
     console.log(interval,'xxxx1');

     clearInterval(interval)
     console.log(interval,'xxxx2');
     
       timer = 600

      // startTimer();
      const otp = generateOtp();
      const createdAt = Date.now();
    
      // timer = 600
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
console.log(interval,'xxxx5');

  function startTimer() {
    console.log("settimer");

    interval = setInterval(() => {
      timer--;
      updateTimer();
console.log(interval,'xxxx3');

      if ( resendClicked || timer === 0) {
        clearInterval(interval);
        // setClicked(false)
      }
    }, 1000);
  }
interface Passwords {
    password : string;
    confirm : string;
}
console.log(interval,'xxxx4');

  const handleNewPasswords = async (data :Passwords)=>{
    try {

        console.log(data,'new passwords');
        if(password !== confirm) setError('Password must match')
        const saveNewPassword = await axiosInstance.put('/resetPassword',data)
    console.log(saveNewPassword,'savenewpassword');
        if(saveNewPassword.data.status === 201) navigate('/login')
    } catch (error) {
        console.log(error,'error in handling new passwords');    
        if(error.response.data.status == 404) setError('Something went wrong ,try again')  
        if(error.response.data.status == 500) setError('Something went wrong ,try again')  

    }
  }

  if (otp.trim() === "" && newPassword === '') {
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
            <form      onSubmit={handleSubmit(onSubmit)}>
            <p
              style={{
                fontWeight: "bolder",
                fontFamily: "sans-serif",
                fontSize: "17px",
              }}
            >

              Enter your Email
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
           

            <span>
            <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                setEmail(e.target.value)
                setError('')
            }}
            value={email}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg">Email is not valid.</p>
          )}

              <button
              type="submit"
                style={{
                  borderRadius: ".5rem",
                  color: "white",
                  backgroundColor: "black",
                  border: "none",
                  marginTop :'1rem'
                }}
            
              >
                Submit
              </button>
            </span>
           
            </form>
          </div>
        </div>
      </div>
    );
  }else if(newPassword !== ''){
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
              <form      onSubmit={handleSubmit(handleNewPasswords)}>
              <p
                style={{
                  fontWeight: "bolder",
                  fontFamily: "sans-serif",
                  fontSize: "17px",
                }}
              >
  
                Enter your new passwords
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
             
  
              <span>
            
         
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
            ) => {
                setError('')
                setPassword(event.target.value)}}
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
          
          <label>Confirm Password</label>
          <input
            type="password"
            // name="password"
            {...register("confirm", {
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
            ) => {
                setError('')
                setConfirm(event.target.value)}}
            value={confirm}
          />
          {errors.confirm?.type === "required" && (
            <p className="errorMsg">Confirm password is required.</p>
          )}
          {errors.confirm?.type === "checkLength" && (
            <p className="errorMsg">
              Confirm password should be at-least 6 characters.
            </p>
          )}
          {errors.confirm?.type === "matchPattern" && (
            <p className="errorMsg">
              Confirm password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
  
                <button
                type="submit"
                  style={{
                    borderRadius: ".5rem",
                    color: "white",
                    backgroundColor: "black",
                    border: "none",
                    marginTop :'1rem'
                  }}
              
                >
                  Submit
                </button>
              </span>
             
              </form>
            </div>
          </div>
        </div>
      );
  
  }
  
  
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
            <p
              style={{
                fontWeight: "bolder",
                fontFamily: "sans-serif",
                fontSize: "17px",
              }}
            >
              Enter your OTP
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
};

export default UserForgotPassword;
