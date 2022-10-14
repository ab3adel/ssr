
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import React, { useEffect, useState, useRef } from 'react'
import { Spinner } from '../tools/spinner'
import Fade from 'react-bootstrap/Fade'
import { InputWithIcon } from "../tools/input/inputIcon";
import search from "../../images/input-search-icon.svg";
import { useTranslation } from "react-i18next";
import user from "../../images/auth/profile.svg";
import sendIMG from "../../images/send.svg";
import ContactElement from "./contactElement"
import ChatHeader from "./chatHeader"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './chat.scss'
export interface chatData {
    name: string,
    id: number,
    img?: any,
    lastMsg?: string,
    time?: string,
    online: boolean | number,
    unreadMsgs?: number | null
}
export interface activeUserData {
    name: string,
    id: number,
    img?: any,
    online: boolean | number,
}
// export interface chatMessages{
//     user:{img?:any,id:number},
//     messages ?:any[]
// }
const data: chatData[] | null = [
    { name: "Test Uesr", id: 1, lastMsg: "lorem test ipsum test", time: "1h", online: true, unreadMsgs: 3 },
    { name: "Test Uesr2", id: 2, lastMsg: "lorem test ipsum test", time: "10h", online: true, unreadMsgs: 12 },
    { name: "Test Uesr3", id: 3, online: false, },
    { name: "Test Uesr3", id: 4, online: false, },
    { name: "Test Uesr3", id: 5, online: false, },
    { name: "Test Uesr3", id: 6, online: false, },
    { name: "Test Uesr3", id: 7, online: false, },
    { name: "Test Uesr3", id: 8, online: false, },
    { name: "Test Uesr3", id: 9, online: false, }
]

const Chat = () => {
    const { t } = useTranslation();
    // 15 id is for test 
    const myId: number = 15
    const [activeChat, setActiveChat] = useState<number>(-1)
    const [activeUser, setActiveUser] = useState<activeUserData | null>(null)
    const bottomRef = useRef<any>(null);
    const [messages, setMessages] = useState<any>([
        { id: 1, sender: { id: 15, img: user }, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna" },
        { id: 2, sender: { id: 1, img: user, online: true }, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna" },
        { id: 3, sender: { id: 15, img: user }, msg: "Lorem ipsum dolor sit amet" },
        { id: 4, sender: { id: 15, img: user }, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut l" },
    ])
    // const [page, setPage] = useState(1)
    // const postsId = useRef<number[]>([])
    // const { getPosts, getPostsData, getPostsError, isGetPostsLoading } = useGetPosts()
    const setActive = React.useCallback((ele: chatData) => {
        setActiveChat(ele.id);
        setActiveUser({
            name: ele.name,
            id: ele.id,
            img: ele.img,
            online: ele.online
        })
    }, [])
    const active = React.useMemo<number>(() => { return activeChat }, [activeChat])
    const activeUserMem: activeUserData | null = React.useMemo(() => { return activeUser }, [activeUser])
    const formik = useFormik({
        initialValues: {
            msgInput: ''
        },
        validationSchema: Yup.object().shape({
            msgInput: Yup.string().required(),
        }),
        onSubmit: values => { },
    })
    const sendMSG = () => {
        const textmsg: string = formik.values.msgInput
        if (!textmsg) { formik.setErrors({ msgInput: "re" }) }
        else {
            messages.push({ id: (messages.length + 1), msg: textmsg, sender: { id: myId, img: user } })

            formik.resetForm()
        }

    }
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight
        }

        // bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, activeUser]);

    return (
        <Col xs={12} className="homeContainer"  >

            <Row className="p-1 chatRow">

                <Col xs={4} className='d-flex justify-content-center align-items-center contactsCol'>
                    <Row className="chatInnerContactRowSearch">
                        <Col md={12}>
                            <InputWithIcon
                                icon={search}
                                label={t("Search")}
                                id="searchChat"
                                name="search"
                                type="text"
                                className="searchChat"
                                required={false}
                            />
                        </Col>
                    </Row>

                    {data?.length > 0 ? <Row className="allContactsRow">
                        {data.map((ele: chatData) => (
                            <Col md={12} key={ele.id}>
                                <ContactElement ele={ele} activeChat={active}
                                    setActiveChat={() => setActive(ele)} />
                            </Col>
                        ))}
                    </Row>
                        : null}



                </Col>
                {/* d-flex justify-content-center align-items-center */}
                <Col xs={7} className=' chatCol'>
                    {activeUser ?
                        <>
                            <Row>
                                <Col col={12}>
                                    <ChatHeader activeUser={activeUserMem} />
                                </Col>
                            </Row>
                            <div className="divider "></div>
                            <Row className="p-2 my-2 chatMessages" ref={bottomRef} >
                                {messages?.map((ele: any, index: number) => (
                                    <Col md={12} key={ele.id}>
                                        <div className={`chatMSG ${myId !== ele.sender.id ? "formOtherUser" : ""}`}>
                                            <div className='chatimgCont'
                                                style={{ visibility: messages[(index + 1)] && ele.sender.id === messages[(index + 1)].sender.id ? "hidden" : "visible" }}>
                                                <img src={ele.img || user} className="chatIMG"></img>
                                                {myId !== ele.sender.id ?
                                                    <div className={`statusCircleChat ${activeUser.online ? "online" : "d-none"}`}></div>
                                                    : null}

                                            </div>
                                            <div className={`chatMSgText ${myId === ele.sender.id ? "iAmSender" : "otherUserSender"} 
                                            ${messages[(index + 1)] && ele.sender.id === messages[(index + 1)].sender.id ? "dublicateSender" : ""}
                                            `}>
                                                {ele.msg}
                                            </div>

                                        </div>
                                    </Col>
                                ))}
                                {/* <div ref={bottomRef} /> */}
                            </Row>
                            <div className="divider"></div>

                            <Row className="my-3 px-3 ">
                                <Col md={10}>
                                    <InputWithIcon
                                        label={t("Write a message ..")}
                                        id="msgInput"
                                        name="msgInput"
                                        type="text"
                                        className="msgInput"
                                        required={true}
                                        value={formik.values.msgInput}
                                        onChange={formik.setFieldValue}
                                        // handleBlur={formik.handleBlur}
                                        error={formik.errors.msgInput}
                                        touched={formik.touched.msgInput}

                                    />
                                </Col>
                                <Col className="px-0" >
                                    <button className="sendMSGBTN" onClick={() => { sendMSG() }} >
                                        <img src={sendIMG} />
                                        {t("Send")}</button>
                                </Col>

                            </Row>


                        </>
                        :
                        <div>
                            No User Selected
                        </div>
                    }
                </Col>

                <div className="spacer"></div>
            </Row>

        </Col>
    )

}
export default Chat;