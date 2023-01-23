import io from 'socket.io-client'

export const getSocket=()=>{

    const socket = io('https://chat.instaaqar.com/')
    return socket
}
