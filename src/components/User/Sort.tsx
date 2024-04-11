
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
                  marginLeft : '60%',
                  cursor:'pointer'
                }}
                onChange={handleSort}
                defaultValue={'relevance'}
              > 
                <option value="old-new">Time (Older)</option>
                <option value="relevance" selected>Relevance</option>

              </select>
    </div>
  )
}

export default Sort