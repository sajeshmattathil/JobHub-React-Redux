import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../Utils/axios/axios";
import { useDispatch } from "react-redux";
import { HRLogin } from "../../../Services/Redux/Slices/HRSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash } from "react-icons/fa";

const LoginHr = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')
const [hidePassword,setHidePassword] = useState<boolean>(true)
const dispatch = useDispatch()
const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(); 
    
      const onSubmit = async (data: unknown) => {
        try {
          const response   =  await axiosInstance.post('/hr/login_submit',data)
        console.log(response,'res');
        
          if(response?.data?.status === 201) {
            dispatch(HRLogin({HREmail : email}))
           localStorage.setItem('HRToken', response.data.token);
           localStorage.setItem('HREmail',email)
           navigate('/hr')

          }      
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          if(error.response?.data?.status === 400)  toast.success("User not found"); 
         

          if(error.response?.data?.status === 401)   toast.success("Passoword does not match ");  
          if(error.response?.data?.status === 500)   toast.success("Something went wrong ,Try again.");       

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
      Hiring Manager Login
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
      <ToastContainer />

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
          ) =>{ 
            setError('')
            setEmail(e.target.value)}}
          value={email}
        />
        {errors.email && errors.email.type === "required" && (
          <p className="errorMsg">Email is required.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="errorMsg">Email is not valid.</p>
        )}

        <label>Password</label>
        <div style={{display : 'flex',alignItems : 'center'}}>
        <input
          type= {hidePassword ? 'password' : 'text'}
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

value={password  }
          
        />
       <div className="hidePassword" onClick={()=>setHidePassword(prev=>!prev)}  style={{cursor : 'pointer'}}><FaRegEyeSlash /></div> 
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
            Password should contain at least one uppercase letter, lowercase
            letter, digit, and special symbol.
          </p>
        )}

        <label></label>
        <button style={{marginTop : '3%',color : "white",backgroundColor : 'black'}} type="submit">Login</button>
      </div>
      {/* <p style={{ cursor: "pointer" }} onClick={handleCreateNewUser}>
        Create a new account
      </p> */}
    <div style={{display : 'flex',justifyContent :'space-between' }}>
      <p style={{ cursor: "pointer"}}  onClick={()=>navigate('/hr/signup')}>
      Create a new account
      </p>
    <span style={{cursor : 'pointer'}} onClick={()=>navigate('/forgotPassword')}></span>

    </div>
    </form>
  </div>
  
  )
}

export default LoginHr