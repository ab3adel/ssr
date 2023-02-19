import chatContext from "./chat-context";
import {useState,useEffect} from 'react'
import {getSocket} from '../../socket'
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
export interface iNotication_per_user {unread_messages:number,chat_id:string}
export interface iChatData {
    error:string
    ,contacts:chatData[]
    ,chats:any[]
    ,active_chat:{messages:any[],active_user:any,chat_id:number}
    ,notification:{total_number:number,messages_per_user:iNotication_per_user[]}
}
const socket= getSocket()
const ChatContextProvider=(props:any)=> {
   
    const [chatData,setChatData]=useState<iChatData>({error:''
    ,chats:[]
    ,contacts:[]
    ,active_chat:{messages:[],active_user:{},chat_id:0}
    ,notification:{total_number:0,messages_per_user:[{unread_messages:0,chat_id:'0'}]}
})

   


    return (
        <chatContext.Provider value={{chatData,socket,setChatData}}>
            {props.children}
        </chatContext.Provider>
    )
}
export default ChatContextProvider;