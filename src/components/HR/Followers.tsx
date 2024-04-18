import { useEffect, useState } from "react";
import { axiosHRInstance } from "../../Utils/axios/axios";

interface followerInterface {
  users:{
    resume: string ;
    _id : string;
  fname : string;
  lname : string;
  }
}

const Followers = () => {
  const [followers,setFollowers] = useState <followerInterface[] | null>(null)

  useEffect(() => {
    fetchFollowers();
  }, []);
  const fetchFollowers = async () => {
    try {
      const getFollowers = await axiosHRInstance.get('/hr/getFollowers')
      console.log(getFollowers,'res');
      
      if(getFollowers.status === 201){
        setFollowers(getFollowers?.data?.followersData)
      }
    } catch (error) {
      console.log(error);
      
    }
  };
console.log(followers,'followers');

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', width: 'calc(100% - 200px)' }}>

    <div style={{border:'2px solid grey',margin:'5%',borderRadius:'20px'}}>
    <h2 style={{marginLeft:'3%',marginTop :'3%'}}>Followers</h2>
      <table className=" table-hover" style={{marginBottom:'5%'}}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Resume</th>
          </tr>
        </thead>
        <tbody>
          {followers?.length && followers.map((user)=>{
            return(
            <tr key={user.users._id}>
              <th scope="row">1</th>
              <td>{`${user.users.fname} ${user?.users?.lname} `}</td>
              <td > <a
                      href={user?.users?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-resume-link"
                    >
                      View Resume
                    </a></td>
            </tr>)
          })}
          
         
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Followers;
