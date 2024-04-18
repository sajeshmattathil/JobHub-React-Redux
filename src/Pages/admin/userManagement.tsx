import UserManagementTable from '../../components/Admin/UsersManagementTable'
import AdminNavbar from '../../components/Admin/AdminsNavbar'
import AdminSidebar from '../../components/Dashboard/AdminSidebar'

const UserManagement = () => {
  return (
     <div>
    <AdminNavbar />
    <div className="flex" style={{ display: "flex",height:'100vh' }}>
      <AdminSidebar />
      <UserManagementTable/>
    </div>
  </div>
  )
}

export default UserManagement