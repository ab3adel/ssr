
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import React, { useEffect, useState, useRef } from 'react'


import { useTranslation } from "react-i18next";
import user from "../../images/auth/profile.svg";

import { activeUserData } from "./"
interface elemntProps {
    activeUser: activeUserData | null

}

const ChatHeader = ({ activeUser }: elemntProps) => {
    const { t } = useTranslation();
    
    return (
        <>
            {activeUser ?
                <div className={`d-flex contctElement  chatHeader`} >
                    <div className='d-flex contactTextParent'>
                        <div className='contactImgCont'>
                            <img src={activeUser.img || user} className="contactImg" />
                            <div className={`statusCircle ${activeUser.online ? "online" : "offline"}`}></div>
                        </div>
                        <div className="textDetails">
                            <div className='contactName'>{activeUser.name}</div>
                            <div className='contactLAstMSG'>{activeUser.online ? t("online") : t("Offline")}</div>
                        </div>
                    </div>
                    <div className="timeAndMSG">
                    </div>
                </div> :
                null}
        </>

    )

}
export default ChatHeader;