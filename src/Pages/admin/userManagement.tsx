import UserManagementTable from '../../components/Admin/UsersManagementTable'
import AdminNavbar from '../../components/Admin/AdminsNavbar'

const UserManagement = () => {
  return (
    <div>
        <AdminNavbar/>
        <UserManagementTable/>
    </div>
  )
}

export default UserManagement