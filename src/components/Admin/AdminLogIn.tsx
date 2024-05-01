import  { useState } from "react";
import { axiosAdminInstance } from "../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminLogin } from "../../Services/Redux/Slices/AdminSlices";
import { useDispatch } from "react-redux";
import logo2  from '../../../public/logo2.jpg'

function AdminLogIn() {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()

  const onSubmit = async (data: unknown) => {
    try {
      if (error !== "") return;

      const response = await axiosAdminInstance.post(
        "/admin/login_submit",
        data
      );      
      if (response?.data?.status === 201) {
        localStorage.setItem("adminToken", response?.data?.token);

        dispatch(adminLogin({adminEmail:email}))

        localStorage.setItem('adminEmail',email)

        navigate("/admin");

      } else {
        setError("Something went wrong ,try again");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {      
        if(error?.response?.data?.status === 401 || error?.response?.data?.status === 401 ) {
          setError(error?.response?.data?.message);
    }
  }
  }
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
          fontFamily: 'sans-serif'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p style={{ fontFamily: "", fontSize: "30px", marginLeft: "25%" }}>
        <img src={logo2} alt="" style={{width:'30%',height:'30%'}}/>  Admin Login
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
            ) =>{ 
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
                setPassword(event.target.value)
                setError('')
            }}
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
          <button style={{marginTop : '20px',color : 'white',backgroundColor : 'black'}} type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogIn;


