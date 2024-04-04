import { useEffect, useState } from "react";
import { axiosUserInstance } from "../../../Utils/axios/axios";
import { useNavigate } from "react-router-dom";

const ChatBar = () => {
  const [prevChatUsers, setPrevChatUsers] = useState<string[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousChatHRs = async () => {
      try {
        const prevChatUsers = await axiosUserInstance.get("/getPrevChatUsers");
        console.log(prevChatUsers);
        if (prevChatUsers.status === 201)
          setPrevChatUsers(prevChatUsers?.data?.chatData);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchPreviousChatHRs();
  }, []);
  return (
    <div className="chat__sidebar">
      <h2>All Chat</h2>

      <div>
        <h4 className="chat__header"></h4>
        <div className="chat__users">
          {prevChatUsers &&
            prevChatUsers.map((hr) => (
              <p
              key={hr}
                style={{ cursor: "pointer",fontSize:'2.5rem' }}
                onClick={() => navigate(`/chatPage/${hr}`)}
              >
                {hr.split("@")[0]}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
