import UserManagementTable from '../../components/Admin/userManagement'
import AdminNavbar from '../../components/Admin/adminNavbar'

const UserManagement = () => {
  return (
    <div>
        <AdminNavbar/>
        <UserManagementTable/>
    </div>
  )
}

export default UserManagement