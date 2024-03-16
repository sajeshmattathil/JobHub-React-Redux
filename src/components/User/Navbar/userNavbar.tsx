import React, { useEffect, useRef, useState } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../Services/Redux/Slices/UserSlices";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Socket } from "socket.io-client";
import messageImage from '../../../../public/message.gif'
import { io } from 'socket.io-client';
import { FcVideoCall } from "react-icons/fc";


const UserNavbar = ({socket} :{socket : Socket}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const [notification,setNotification] = useState<boolean>(false)
  const [link,setLink] = useState<string>('')
  
  interface ChatMessage {
    text: string;
    file: File | null;
    name: string | null;
    recipient2 : string;
    id: string;
    socketID: string;
  }
  const notificationRef = useRef<boolean>(false)
  const notificationVdoCallRef = useRef<boolean>(false)


  useEffect(() => {
    console.log('message reached',socket);
  
    if (socket) {
      const handleMessageResponse = (data: ChatMessage) => {
        if (data.recipient2 === localStorage.getItem('userEmail')) {
          notificationRef.current = true;
          console.log(notificationRef.current, 'notification inside');
          setNotification(true);
        }
      };
  
      const handleJoinVdoCall = (data: any) => {
        console.log('message reached 222');
        console.log(data, 'data-vdo-user');

        if (data.recipient === localStorage.getItem('userEmail')) {
          notificationVdoCallRef.current = true;
          setLink(data.message)
        }
        console.log(notificationVdoCallRef,'video ref');
        
      };
      socket.on('join-vdo-call', handleJoinVdoCall);
      socket.on('messageResponse', handleMessageResponse);
  
      return () => {
        socket.off('messageResponse', handleMessageResponse);
        socket.off('join-vdo-call', handleJoinVdoCall);
      };
    }
  }, [socket]);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // interface UserState {
  //   isLoggedIn : boolean;
  //   userEmail : string;
  //  }
  //  interface RootState {
  //   user: UserState;
  // }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const userLoggenIn = useSelector((state :RootState)=>state.user.isLoggedIn)
  const userLoggenIn = localStorage.getItem("userEmail");
  console.log(userLoggenIn, "userLoggenIn");

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
        marginBottom: "4%",
      }}
    >
      <div>
        <h1
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          JobHub
        </h1>
      </div>
      <div  >
      {userLoggenIn ? (
        <div className="container" style={{display: 'flex'}}>
       
          {
         notificationRef.current &&  <div className="inside" style={{ width : '10%',marginRight : '40%',cursor : 'pointer'}} > <img src={messageImage} style={{width : '300%'}}  onClick={()=>{
          navigate('/chatPage')} 
        }
         /> </div>
         } 
          {
         notificationVdoCallRef.current &&  <div className="inside" style={{ width : '100%',marginRight : '40%',cursor : 'pointer'}} ><a href={link}> <FcVideoCall 
         style={{fontSize : '300%'}}  onClick={()=>{
          navigate('/chatPage')} 
        }
         /></a> </div>
         } 
        
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
                navigate("/profilemanagement");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                dispatch(userLogout());

                localStorage.removeItem("userEmail");
                localStorage.removeItem("userToken");
                navigate("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
          </div>

      ) : (
        <div style={{ display: "flex" }}>
          <button
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
          <button
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
        </div>

    </nav>
  );
};

export default UserNavbar;
