import { useState } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../Services/Redux/Slices/AdminSlices";

const AdminsNavbar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // interface AdminState {
  //   isLoggedIn : boolean;
  //   adminEmail : string;
  //  }
  //  interface RootState {
  //   admin: AdminState;
  // }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const userLoggenIn = useSelector((state :RootState)=>state.admin.isLoggedIn)
// const adminLoggedIn = localStorage.getItem('adminEmail')
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        color: "#333",
      }}
    >
      <div>
        <h1 style={{ margin: 0 ,cursor :'pointer',border:'2px solid black',borderRadius:'10px',padding:'10px' }} onClick={()=>navigate('/admin')}>JobHub</h1>
      </div>
      {
        
        <div>
           <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <HiMiniUserCircle
            style={{ width: "250%", height: "250%", cursor: "pointer",color:'black' }}
            
          />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              dispatch(adminLogout())
              localStorage.removeItem('adminEmail')
              localStorage.removeItem('adminToken')
              navigate('/admin/login')
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        </div>

      }
    </nav>
  );
};

export default AdminsNavbar
;


