import HRManagementTable from '../../components/Admin/HRManagementTable'
import AdminNavbar from '../../components/Admin/AdminsNavbar'
import AdminSidebar from '../../components/Dashboard/AdminSidebar'

const HRManagement = () => {
  return (
     <div>
     <AdminNavbar />
     <div className="flex" style={{ display: "flex",height:'100vh' }}>
       <AdminSidebar />
       <HRManagementTable/>
     </div>
   </div>
  )
}

export default HRManagement