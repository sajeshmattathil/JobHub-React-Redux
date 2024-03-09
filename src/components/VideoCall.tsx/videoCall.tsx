import React from 'react';
import {Button, Typography, Input} from 'antd';

const {Title, Paragraph} = Typography;
const {TextArea} = Input;
function VideoCall() {
    let localStream : any;

const setupDevice = () => {
    console.log('setupDevice invoked');
    const navigatorWithMedia = navigator as Navigator & { getUserMedia: any };

    navigatorWithMedia.getUserMedia({ audio: true, video: true }, (stream) => {
        // render local stream on DOM
        const localPlayer = document.getElementById('localPlayer');
        localPlayer.srcObject = stream;
        localStream = stream;
    }, (error) => {
        console.error('getUserMedia error:', error);
    });
};
const constraints = {
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      frameRate: { ideal: 30 },
    },
    audio: true,
  };
  
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      // Handle the media stream as needed.
    })
    .catch((error) => {
      // Handle the error if constraints cannot be satisfied.
    });
    let servers = null; // Assign a value to servers if necessary, or leave it as null if not needed

const pcConstraints = {
    'optional': [
        {'DtlsSrtpKeyAgreement': true},
    ],
};

let localPeerConnection; // Define localPeerConnection variable

// When user clicks call button, create the p2p connection with RTCPeerConnection
const callOnClick = async () => {
    console.log('callOnClick invoked');
    if (localStream.getVideoTracks().length > 0) {
        console.log(`Using video device: ${localStream.getVideoTracks()[0].label}`);
    }
    if (localStream.getAudioTracks().length > 0) {
        console.log(`Using audio device: ${localStream.getAudioTracks()[0].label}`);
    }
    localPeerConnection = new RTCPeerConnection(servers, pcConstraints);
    localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
    localPeerConnection.ontrack = gotRemoteStream; // Use ontrack instead of onaddstream
    localStream.getTracks().forEach(track => localPeerConnection.addTrack(track, localStream)); // Add tracks to the connection
    const offer = await localPeerConnection.createOffer();
    await gotLocalDescription(offer); // Call gotLocalDescription with the offer
};

// async function to handle offer sdp
const gotLocalDescription = async (offer) => {
    console.log('gotLocalDescription invoked:', offer);
    await localPeerConnection.setLocalDescription(offer);
};

// async function to handle received remote stream 
const gotRemoteStream = (event) => {
    console.log('gotRemoteStream invoked');
    const remotePlayer = document.getElementById('peerPlayer');
    remotePlayer.srcObject = event.streams[0]; // Use event.streams[0] to get the stream
};

// async function to handle ice candidates
const gotLocalIceCandidateOffer = (event) => {
    console.log('gotLocalIceCandidateOffer invoked', event.candidate, localPeerConnection.localDescription);
    // when gathering candidate finished, send complete sdp
    if (!event.candidate) {
        const offer = localPeerConnection.localDescription;
        // send offer sdp to signaling server via websocket
        sendWsMessage('send_offer', {
            channelName,
            userId,
            sdp: offer,
        });
    }
};

    const renderHelper = () => {
        return (
            <div className="wrapper">
                <Input
                    placeholder="User ID"
                    style={{width: 240, marginTop: 16}}
                />
                <Input
                    placeholder="Channel Name"
                    style={{width: 240, marginTop: 16}}
                />
                <Button
                    style={{width: 240, marginTop: 16}}
                    type="primary"
                >
                    Call
                </Button>
                <Button
                    danger
                    style={{width: 240, marginTop: 16}}
                    type="primary"
                >
                    Hangup
                </Button>
            </div>
        );
    };

    const renderTextarea = () => {
        return (
            <div className="wrapper">
                <TextArea
                    style={{width: 240, marginTop: 16}}
                    placeholder='Send message'
                />
                <TextArea
                    style={{width: 240, marginTop: 16}}
                    placeholder='Receive message'
                    disabled
                />
                <Button
                    style={{width: 240, marginTop: 16}}
                    type="primary"
                    // disabled={sendButtonDisabled}
                >
                    Send Message
                </Button>
            </div>
        );
    };

    return (
        <div className="App">
            <div className="App-header">
                <Title>WebRTC</Title>
                <Paragraph>This is a simple demo app that demonstrates how to build a WebRTC application from scratch, including a signaling server. It serves as a step-by-step guide to help you understand the process of implementing WebRTC in your own projects.</Paragraph>
                <div className='wrapper-row' style={{justifyContent: 'space-evenly', width: '50%'}}>
                    {renderHelper()}
                    {renderTextarea()}
                </div>
                <div
                    className='playerContainer'
                    id="playerContainer"
                >
                    <video
                        id="peerPlayer"
                        autoPlay
                        style={{width: 640, height: 480}}
                    />
                    <video
                        id="localPlayer"
                        autoPlay
                        style={{width: 640, height: 480}}
                    />
                </div>
            </div>
        </div>
    );
}
export default VideoCall;