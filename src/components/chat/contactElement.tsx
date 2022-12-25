
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import React, { useEffect, useState, useRef } from 'react'
import { Spinner } from '../tools/spinner'
import Fade from 'react-bootstrap/Fade'

import { useTranslation } from "react-i18next";
import user from "../../images/auth/profile.svg";

import {chatData} from '../tools/context/chat-context/chat-provider'
interface elemntProps {
    ele: chatData,
    activeChat: number | null ,
    setActiveChat: Function,
    setInActiveChat:Function,
}


const ContactElement = ({ ele, activeChat, setActiveChat,setInActiveChat }: elemntProps) => {

    const { t } = useTranslation();
  
    return (
        <div className={`d-flex contctElement ${activeChat === ele.id ? "activeChat" : ""} `} onClick={() => setActiveChat()}>
            <div className='d-flex contactTextParent'>
                <div className='contactImgCont'>
                    <img src={ele.img || user} className="contactImg" />
                    <div className={`statusCircle ${ele.online ? "online" : "offline"}`}></div>
                </div>
                <div className="textDetails">
                    <div className='contactName'>{ele.name}</div>
                    <div className='contactLAstMSG'>{ele.lastMsg || ""}</div>
                </div>
            </div>
            <div className="timeAndMSG">
                <div className="msgsNumber" style={{ opacity: ele.unreadMsgs ? "1" : "0" }}>{ele.unreadMsgs || ""}</div>
                <div className="timeCont">{ele.time || ""}</div>

            </div>
        </div>
    )

}
export default ContactElement;