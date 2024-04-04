
const Sort = ({onSortChange}:{onSortChange:(value:string)=>void}) => {
    const handleSort = (e: { target: { value: string } })=>{
const sortValue = e.target.value
        onSortChange(sortValue)
    }
  return (
    <div style={{display : 'flex'}}>
      
         <select
                style={{
                  width: "20%",
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
                <option value="old-new">Time (Old - New)</option>
                <option value="relevance">Relevance</option>

                {/* <option value="Relevance">Relevance</option> */}
              </select>
    </div>
  )
}

export default Sort