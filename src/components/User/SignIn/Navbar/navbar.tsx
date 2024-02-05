import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar() {
  
  return (
    <nav style={{backgroundColor:'white',color:'black'}} >
<div>
<p style={{margin:'20px',padding:'20px',fontSize:'30px',borderBottom:'2px solid black'}}>Job Hub</p>
</div>
<div><FaRegCircleUser />
</div>
    </nav>
 
  )
}

export default Navbar