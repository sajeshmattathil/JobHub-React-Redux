import React from 'react'

const viewUserDetails = () => {
    return(
        <div>
                <div className='otp' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white',
          }}>
            <div className="otpInner items-center justify-center " style={{
              backgroundColor: "white",
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}>
              <p style={{fontWeight : 'bold'}}>Enter your OTP</p>
            <div className="contents" style={{border : " 2px solid black "}} ></div>  
              
              <p >Resend OTP</p>
  
            </div>
  
          </div>
        </div>
      )
  
}

export default viewUserDetails