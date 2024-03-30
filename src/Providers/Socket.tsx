import  { ReactNode, createContext, useContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};
type SocketProviderProps = {
  children: ReactNode;
};

export const SocketProvider = (props: SocketProviderProps) => {
  const socket = useMemo(() => io("https://job-hub.online"), []);
  
  const contextValue: SocketContextType = {
    socket: socket,
  };
  return (
    <SocketContext.Provider value={contextValue}>
      {props.children}
    </SocketContext.Provider>
  );
};
