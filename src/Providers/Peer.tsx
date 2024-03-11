import React, { ReactNode, createContext, useContext, useMemo } from "react";

interface PeerContextValue {
    peer: RTCPeerConnection;
    createOffer: () => Promise<RTCSessionDescriptionInit | null>;
}

const PeerContext = createContext<PeerContextValue | null>(null);

interface PeerProviderProps {
    peer?: RTCPeerConnection;
    children: ReactNode;
}

export const usePeer = () => useContext(PeerContext);

const PeerProvider = (props: PeerProviderProps) => {
    const { peer } = props;

    const memoizedPeer = useMemo(
        () => {
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
        },
        []
    );

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

    return (
        <PeerContext.Provider value={{ peer: memoizedPeer, createOffer }}>
            {props.children}
        </PeerContext.Provider>
    );
};

export default PeerProvider;
