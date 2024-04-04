import {  useState } from "react";

const SearchBar = ({ onSearchChange  } :{onSearchChange :(x: string,y: string)=>void}) => {
  const [option,setOption] = useState<string>('')
  const [value,setValue] = useState<string>('')

  const handleSearch = async () => {
    onSearchChange(option.trim() ? option : 'location',value.trim());
  };
  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter location / skill / job role..."
        onChange={((e)=>setValue(e.target.value))}
        value={value}
      />
       <select
                style={{
                  width: "20%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "16px",
                }}
                onChange={(e)=>setOption(e.target.value)}
              >             
                <option value="location">Location</option>
                <option value="jobRole">Job Role</option>
                <option value="jobType">Job Type</option>
                <option value="skills">Skill</option>
              </select>
      <button style={styles.button} onClick = {handleSearch}>Search</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    width: "70%",
    height:'20%',
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "5px 10px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    marginLeft:'17%'
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    padding: "8px",
    borderRadius: "20px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "15px 20px",
    marginLeft: "10px",
    cursor: "pointer",
    fontSize: "16px",
    outline: "none",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default SearchBar;
