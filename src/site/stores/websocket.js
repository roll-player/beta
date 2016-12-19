import io from 'socket.io'

let websocket

const newSocket = () => {
    // connect to a socket for this room
    const socket = io()
    socket.on('connect', () => console.log('Connected to Server'))
}

export const getSocket = () => {
    websocket = websocket || newSocket()
    return websocket
}

export const closeSocket = () => {
    websocket = null
}
