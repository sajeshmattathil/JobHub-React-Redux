import { useEffect, useRef, useState } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import messageImage from "../../../public/message.gif";
import { useSocket } from "../../../Providers/Socket";
import { LuMessagesSquare } from "react-icons/lu";

interface ChatMessage {
  recipient1: string;
  text: string;
  file: File | null;
  name: string | null;
  recipient2: string;
  id: string;
  socketID: string;
}

const HRNavbar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [name, setName] = useState("");
  const notificationRef = useRef<boolean>(false);
  const recipientRef = useRef<string>();

  useEffect(() => {
    if (socket) {
      const handleMessageResponse = (data: ChatMessage) => {
        if (data.recipient1 === localStorage.getItem("HREmail")) {
          if (data.name) setName(data?.name?.split("@")[0]);
          notificationRef.current = true;
          recipientRef.current = data.recipient1;
          console.log(notificationRef, recipientRef, ">>>>>>");
        }
      };
      socket.on("messageResponse", handleMessageResponse);
      return () => {
        socket.off("messageResponse", handleMessageResponse);
      };
    }
  }, [socket]);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);

  const handleClick1 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl2(event.currentTarget);
  };
  
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const HRLoggedIn = localStorage.getItem("HREmail");

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
        <h1
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/hr")}
        >
          JobHub
        </h1>
      </div>

      {HRLoggedIn && (
        <div>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/hr/job")}
          >
            Create Jobs
          </button>
        </div>
      )}
      {HRLoggedIn && (
        <div style={{display:'flex'}}>
          {notificationRef.current && (
            <div
              className="inside"
              style={{ width: "10%", marginRight: "40%", cursor: "pointer" }}
            >
              <Button
                aria-controls="chat-menu"
                aria-haspopup="true"
                onClick={handleClick1}
              >
                <img src={messageImage} style={{ width: "150%" }} />
              </Button>
              <Menu
                id="chat-menu"
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={handleClose1}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl1(null);
                    navigate(`/hr/chatPage/${recipientRef.current}`);
                  }}
                >
                  {name}
                </MenuItem>
              </Menu>
            </div>
          )}
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick2}
          >
            <HiMiniUserCircle
              style={{ width: "250%", height: "250%", cursor: "pointer" }}
            />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl2(null);
                navigate("/hr/profilemanagement");
              }}
            >
              Profile Management
            </MenuItem>
            <MenuItem
                onClick={() => {
                  setAnchorEl2(null);
                  navigate("/hr/chatPage/showMessages");
                }}
              >
<LuMessagesSquare style={{paddingRight : '10%',fontSize:'200%'}} />  Messages
              </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl2(null);
                localStorage.removeItem("HREmail");
                localStorage.removeItem("HRToken");
                navigate("/hr/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  );
};

export default HRNavbar;
