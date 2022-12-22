import chatContext from "./chat-context";
import {useState,useEffect} from 'react'
import io from 'socket.io-client'
import { getLocalStorage } from "../../getLocalstorage";
import user from "../../../../images/auth/profile.svg";
export interface chatData {
    name: string,
    id: number,
    img?: any,
    lastMsg?: string,
    time?: string,
    online: boolean | number,
    unreadMsgs?: number | null,
    chat_id:string
}
interface iNotication_per_user {unread_messages:number,chat_id:string}
interface iChatData {
    error:string
    ,contacts:chatData[]
    ,chats:any[]
    ,active_chat:any[]
    ,notification:{total_number:number,messages_per_user:iNotication_per_user[]}
}
const ChatContextProvider=(props:any)=> {
    const socket = io('https://chat.instaaqar.com/')
    const [chatData,setChatData]=useState<iChatData>({error:''
    ,chats:[]
    ,contacts:[]
    ,active_chat:[]
    ,notification:{total_number:0,messages_per_user:[{unread_messages:0,chat_id:'0'}]}
})
  
   

    return (
        <chatContext.Provider value={{chatData,socket,setChatData}}>
            {props.children}
        </chatContext.Provider>
    )
}
export default ChatContextProvider;