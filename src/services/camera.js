import WebSocket from 'ws'
import webRtc from './webRtc.js'

const { navigator: { mediaDevices } } = window

async function camera ({
    signalingServerUrl = 'ws://localhost/camera',
    onOpenSignalingServer,
    onCloseSignalingServer
}) {
    try {
        const stream = await mediaDevices.getUserMedia({ audio: true, video: true })
        const wsClient = new WebSocket(signalingServerUrl)
        const webRtc = webRtc({
            stream,
            onIceCandidate: (candidate) => wsClient.send({ type: 'candidate', data: { candidate } }),
            onAnswer: (answer) => wsClient.send({ type: 'candidate', data: { answer } })
        })

        const handleWebSocketData = (data) => {
            switch (data.type) {
                case 'OFFER': return webRtc.createOffer(data)
                case 'ANSWER': return webRtc.setRemoteDescription(data)
                case 'CANDIDATE': return  webRtc.addIceCandidate(data)
                default: throw Error(`Unkdnow data: ${JSON.stringify(data, true, 2)}`)
            }
        }

        const handleWebSocketOpen = () => onOpenSignalingServer()
        const handleWebSocketClose = () => onCloseSignalingServer()

        wsClient.on('data', handleWebSocketData)
        wsClient.on('open', handleWebSocketOpen)
        wsClient.on('close', handleWebSocketClose)
    } catch (error) {
        console.error('Stream not found: ', error)
    }
}

export default camera