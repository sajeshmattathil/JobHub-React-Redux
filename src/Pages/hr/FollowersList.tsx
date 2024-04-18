import Followers from "../../components/HR/Followers"
import HRSidebar from "../../components/HR/HRSidebar"
import HRNavbar from "../../components/HR/Navbar/HRNavbar"

const FollowersList = () => {
  return (
    <div>
    <HRNavbar/>
    <div className="flex" style={{ display: "flex",height:'100vh' }}>
      <HRSidebar />
      <Followers/>
    </div>
  </div>
  )
}

export default FollowersList