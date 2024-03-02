import React from 'react'

const Sort = ({onSortChange}) => {
    const handleSort = (e)=>{
const sortValue = e.target.value
        onSortChange(sortValue)
    }
  return (
    <div style={{display : 'flex'}}>
       
         <select
                style={{
                  width: "15%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "16px",
                  marginTop : '5%',
                  marginLeft : '60%'
                }}
                onChange={handleSort}
              > 
                <option value="Date">Time</option>
                <option value="Relevance">Relevance</option>
              </select>
    </div>
  )
}

export default Sort