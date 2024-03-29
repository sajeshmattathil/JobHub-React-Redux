import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "tailwindcss/tailwind.css";

interface Input {
  inputValue: string;
  setInput:  React.Dispatch<React.SetStateAction<string>>;
  setError:  React.Dispatch<React.SetStateAction<string>>;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  className: string;
}
export default function BasicTextFields({type,inputValue,setInput,placeholder,className,setError}:Input) {

  function validateEmail(email : string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePwd(password : string){
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pwdRegex.test(password)
  }
  
  function validateName(name : string){
    const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name)
  }
  
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '40ch'},
      }}
      noValidate
      autoComplete="off">
      <TextField id="outlined-basic"  label={placeholder} variant="outlined"
       className={className}
       type={type} 
       onChange={(event)=>{

        setInput(event.target.value) 

        setError('')

       if(type == 'email'){
       if(!validateEmail(inputValue)) setError('Enter a correct email')
       } 

       if(type == 'password'){
        if(!validatePwd(inputValue)) setError('Enter a correct password')
       } 
       if(type == 'text'){
        if(!validateName(inputValue)) setError('Enter a correct Name')
       } 

      }} 
       value = {inputValue}
     
      /> 
    </Box>
  )
}