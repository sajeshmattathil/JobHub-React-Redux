import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginHr = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data: unknown) => {
        console.log(data);
      };

  return (
    <div className="App">
      <p style={{ fontFamily: "", fontSize: "30px", marginLeft: "25%" }}>
          Hiring Manager Login
        </p>
      <form onSubmit={handleSubmit(onSubmit)} >

        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            onChange={(e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setEmail(e.target.value)}
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
            onChange={(event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setPassword(event.target.value)}
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
          <button type="submit">Login</button>
        </div>
        </form>
    </div>
  
  )
}

export default LoginHr