import {io} from 'socket.io-client'
// 链接 服务端
const socket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
    query: {},
    transports: ['websocket']
})
export default socket