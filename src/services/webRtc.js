const {
    RTCPeerConnection,
    RTCSessionDescription,
    RTCIceCandidate
} = window

function webRtc({
    stream,
    onIceCandidate = () => { },
    onAddStream = () => { },
    onAnswer = () => { },
    rtcpPeerConnectionOptions = {
        // iceServers: [
        //     {
        //         urls: 'turn:localhost:3478?transport=tcp',
        //         username: 'username',
        //         credential: 'credential'
        //     },
        //     {
        //         urls: 'turn:localhost:3478?transport=udp',
        //         username: 'username',
        //         credential: 'credential'
        //     }
        // ]
    }
}) {
    let peerConnection = null

    const createPeerConnection = () => {
        try {
            peerConnection = new RTCPeerConnection(rtcpPeerConnectionOptions)

            peerConnection.onicecandidate = (event) => event.candidate ? onIceCandidate(candidate) : null
            peerConnection.onaddstream = onAddStream

            peerConnection.addStream(stream)
        } catch (error) {
            throw Error(`Peer connection failed: ${error}`)
        }
    }

    const sendAnswer = async () => {
        try {
            const answer = await peerConnection.createAnswer()

            peerConnection.setLocalDescription(answer)

            onAnswer(answer)
        } catch (error) {
            console.error(`Error occures while creating answer: ${error}`)
        }
    }

    return {
        createPeerConnection,
        createOffer(data) {
            createPeerConnection()
            peerConnection.setRemoteDescription(new RTCSessionDescription(data))
            sendAnswer()
        },
        setRemoteDescription(data) {
            peerConnection.setRemoteDescription(new RTCSessionDescription(data))
        },
        addIceCandidate(data) {
            peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
        }
    }
}

export default webRtc