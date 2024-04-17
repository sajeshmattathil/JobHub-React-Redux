import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Services/Redux/Slices/UserSlices";
import messageImage from "../../../public/message.gif";
import { FcVideoCall } from "react-icons/fc";
import { useSocket } from "../../../Providers/Socket";
import { Button, Menu, MenuItem } from "@mui/material";
import { HiMiniUserCircle } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { ImProfile } from "react-icons/im";

const UsersNavbar = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [name, setName] = useState("");

  interface ChatMessage {
    recipient1: string;
    text: string;
    file: File | null;
    name: string | null;
    recipient2: string;
    id: string;
    socketID: string;
  }
  interface VideoCallInterface {
    message: string;
    recipient2: string;
    recipient1: string;
  }
  const notificationRef = useRef<boolean>(false);
  const notificationVdoCallRef = useRef<boolean>(false);
  const recipientRef = useRef<string>();

  useEffect(() => {
    console.log(socket, "socket");
    if (socket) {
      const handleMessageResponse = (data: ChatMessage) => {
        if (data.recipient2 === localStorage.getItem("userEmail")) {
          if (data.name) setName(data?.name?.split("@")[0]);
          notificationRef.current = true;
          recipientRef.current = data.recipient1;
          console.log(notificationRef, recipientRef, ">>>>>>");
        }
      };

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
          style={{
            margin: 0,
            cursor: "pointer",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "10px",
          }}
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

                      navigate(`/chatPage/${recipientRef.current}`);
                    }}
                  >
                    {name}
                  </MenuItem>
                </Menu>
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
              onClick={handleClick2}
            >
              <HiMiniUserCircle
                style={{ width: "250%", height: "250%", cursor: "pointer" }}
              />
            </Button>
            <Menu
              // id="simple-menu"
              anchorEl={anchorEl2}
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl2(null);
                  navigate("/profilemanagement");
                }}
              >
                <ImProfile style={{ paddingRight: "10%", fontSize: "200%" }} />{" "}
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl2(null);
                  navigate("/chatPage/showMessages");
                }}
              >
                <LuMessagesSquare
                  style={{ paddingRight: "10%", fontSize: "200%" }}
                />{" "}
                Messages
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl2(null);
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
