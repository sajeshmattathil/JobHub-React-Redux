import React, { useState } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { HRLogout } from "../../../Services/Redux/Slices/HRSlices";

const HRNavbar = () => {
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
  interface HRState {
    isLoggedIn : boolean;
    HREmail : string;
   }
   interface RootState {
    HR: HRState;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const HRLoggedIn = useSelector((state :RootState)=>state.HR.isLoggedIn)
  console.log(HRLoggedIn,'HRLoggedIn');

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        color: "#333",
        borderBottom: "2px solid #333",
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>JobHub</h1>
      </div>
      {
        HRLoggedIn &&
        <div>
           <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <HiMiniUserCircle
            style={{ width: "250%", height: "250%", cursor: "pointer" }}
            
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
              dispatch(HRLogout())
              localStorage.removeItem('HREmail')
              localStorage.removeItem('HRToken')
              navigate('/hr')
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

export default HRNavbar;


