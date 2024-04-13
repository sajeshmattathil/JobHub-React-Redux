
const Sort = ({onSortChange}:{onSortChange:(value:string)=>void}) => {
  let sortValue
    const handleSort = (e: { target: { value: string } })=>{
 sortValue = e.target.value
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
                  marginLeft : '60%',
                  cursor:'pointer'
                }}
                value={sortValue}
                onChange={handleSort}
              > 
                <option value="old">Time (Older)</option>
                <option value="relevance" selected>Relevance</option>

              </select>
    </div>
  )
}

export default Sort