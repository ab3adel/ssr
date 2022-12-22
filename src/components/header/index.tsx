import './header.scss'
import {HeaderSm} from './header-sm'
import {HeaderLg} from './header-lg'
import authContext from '../tools/context/auth-context/auth-context'
import {useState, useEffect,useContext} from 'react'
import { getLocalStorage } from '../tools/getLocalstorage'
import { iToken } from '../tools/interface'
import chatContext from '../tools/context/chat-context/chat-context'
export interface iProps {
    token?: iToken;
    chat_notification:number
  }
const Header =()=>{
const [token,setToken]=useState<iToken>()
const {chatData} =useContext(chatContext)
useEffect(()=>{
   
if (getLocalStorage()) {
setToken(getLocalStorage())
}
},[])
console.log(chatData)
    return (
       <>
       <HeaderLg 
       token={token}
       chat_notification={chatData.notification.total_number}
       />
       <HeaderSm 
       token={token}
       chat_notification={chatData.notification.total_number}
       />
       </>
    )
}
export default Header;