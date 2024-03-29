import  { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Services/Redux/Slices/UserSlices";
import messageImage from "../../../public/message.gif";
import { FcVideoCall } from "react-icons/fc";
import { useSocket } from "../../../Providers/Socket";
import { Button, Menu, MenuItem } from "@mui/material";
import { HiMiniUserCircle } from "react-icons/hi2";

const UsersNavbar = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");


  interface ChatMessage {
    recipient1: string;
    text: string;
    file: File | null;
    name: string | null;
    recipient2: string;
    id: string;
    socketID: string;
  }
  const notificationRef = useRef<boolean>(false);
  const notificationVdoCallRef = useRef<boolean>(false);
  const recipientRef = useRef<string>()

  useEffect(() => {
    if (socket) {
      const handleMessageResponse = (data: ChatMessage) => {
        if (data.recipient2 === localStorage.getItem("userEmail")) {
          notificationRef.current = true;
      
          recipientRef.current =data.recipient1;
          
        }
      
      };
      interface VideoCallInterface {
        message: string;
        recipient2: string;
        recipient1: string;

      }
      const handleJoinVdoCall = (data: VideoCallInterface) => {
        if (data.recipient2 === localStorage.getItem("userEmail")) {
          notificationVdoCallRef.current = true;
          setLink(data.message);
        }
        
      };
      socket.on("join-vdo-call", handleJoinVdoCall);
      socket.on("messageResponse", handleMessageResponse);

      return () => {
        socket.off("messageResponse", handleMessageResponse);
        socket.off("join-vdo-call", handleJoinVdoCall);
      };
    }
  }, [socket]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const userLoggedIn = localStorage.getItem("userEmail"); 

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
      <div>
        {userLoggedIn ? (
          <div className="container" style={{ display: "flex" }}>
            {notificationRef.current && (
              <div
                className="inside"
                style={{ width: "10%", marginRight: "40%", cursor: "pointer" }}
              >
                <img
                  src={messageImage}
                  style={{ width: "300%" }}
                  onClick={() => {
                    navigate(`/chatPage/${recipientRef.current}`);
                  }}
                />
              </div>
            )}
            {notificationVdoCallRef.current && (
              <div
                className="inside"
                style={{ width: "100%", marginRight: "40%", cursor: "pointer" }}
              >
                <a href={link}>
                  <FcVideoCall
                    style={{ fontSize: "300%" }}
                    onClick={() => {
                      navigate("/chatPage");
                    }}
                  />
                </a>
              </div>
            )}

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

export default UsersNavbar;
