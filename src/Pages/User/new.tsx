import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
type input = {
    inputValue : string;
    setInput : React.Dispatch<React.SetStateAction<string>>;
    type: 'email' | 'password' | 'text';
    placeholder : string
    className : string
}

export default function BasicTextFields({type,inputValue,setInput,placeholder,className}:input) {

  
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={placeholder} variant="outlined"
       className={className}
       type={type} 
       onChange={(event)=>setInput(event.target.value)} 
       value = {inputValue}
       placeholder={placeholder}
      />
     
    </Box>
  );
}