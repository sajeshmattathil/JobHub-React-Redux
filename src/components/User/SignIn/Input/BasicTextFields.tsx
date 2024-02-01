import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "tailwindcss/tailwind.css";

interface Input {
  inputValue: string;
  setInput:  React.Dispatch<React.SetStateAction<string>>
  type: 'email' | 'password' | 'text';
  placeholder: string;
  className: string;
}
export default function BasicTextFields({type,inputValue,setInput,placeholder,className}:Input) {

  function validateEmail(email : string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePwd(email : string){
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pwdRegex.test(email)
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
       if(type == 'email') validateEmail(inputValue)
       if(type == 'password') validatePwd(inputValue)

      }} 
       value = {inputValue}
     
      /> 
    </Box>
  )
}