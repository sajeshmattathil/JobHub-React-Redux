import React from 'react'

const userNavbar = () => {
  return (
    <nav
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#fff",
      color: "#333",
      borderBottom: '2px solid #333'
    }}
  >
    <div>
      <h1 style={{ margin: 0 }}>JobHub</h1>
    </div>
    <div>
      {/* <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={()=>navigate('/hr/job')}
      >
        Create Jobs
      </button> */}
    </div>
  </nav>
  )
}

export default userNavbar