import React, { ReactNode, createContext, useContext, useMemo } from "react";

interface PeerContextValue {
  peer: RTCPeerConnection;
  createOffer: () => Promise<RTCSessionDescriptionInit | null>;
  createAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit | null>;
  setRemoteAns : (
    ans: RTCSessionDescriptionInit
  ) => Promise<void>;
}

const PeerContext = createContext<PeerContextValue | null>(null);

interface PeerProviderProps {
  peer?: RTCPeerConnection;
  children: ReactNode;
}

export const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
      console.log("usePeer must be used within a PeerProvider");
    }
    return context;
}

const PeerProvider = (props: PeerProviderProps) => {
  const { peer } = props;

  const memoizedPeer = useMemo(() => {
    return new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }, []);

  const createOffer = async (): Promise<RTCSessionDescriptionInit | null> => {
    try {
      const offer = await memoizedPeer.createOffer();
      await memoizedPeer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      return null;
    }
  };

  const createAnswer = async (offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | null>  => {
    if (peer) {
      await peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      return answer;
    }
    return null;
  };
  const setRemoteAns = async (ans : RTCSessionDescriptionInit) : Promise<void>  =>{
    await peer?.setRemoteDescription(ans)

  }
  return (
    <PeerContext.Provider
      value={{ peer: memoizedPeer, createOffer, createAnswer ,setRemoteAns}}
    >
      {props.children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
