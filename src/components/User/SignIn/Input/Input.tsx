import React from 'react'

type input = {
    inputValue : string;
    setInput : React.Dispatch<React.SetStateAction<string>>;
    type: 'email' | 'password' | 'text';
    placeholder : string
    className : string
}

const Input = ({type,inputValue,setInput,placeholder,className}:input)=> {

  return (
    <input
     className={className}
     type={type} 
     onChange={(event)=>setInput(event.target.value)} 
     value = {inputValue}
     placeholder={placeholder}
     ></input>
  )
}

export default  Input
